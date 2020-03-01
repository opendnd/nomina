// Originally written and released to the public domain by drow <drow@bin.sh>
// http://creativecommons.org/publicdomain/zero/1.0/

export interface IMarkovChain {
  [key: string]: {
    [token: string]: number;
  };
}

export interface IGeneratorOpts {
  nameSet?: any;
}

class Generator {
  public nameSet = {};
  public chainCache = {};

  // init
  constructor(opts: IGeneratorOpts = {}) {
    this.nameSet = opts.nameSet || {};
  }

  // generate multiple names
  public nameList(type, nOf) {
    const list = [];
    let i;

    for (i = 0; i < nOf; i++) {
      list.push(this.generateName(type));
    }

    return list;
  }

  // name generator function
  public generateName(type) {
    const chain = this.markovChain(type);

    if (chain) { return this.markovName(chain).replace(/\-/g, ""); }
    return "";
  }

  // get markov chain by type
  public markovChain(type): IMarkovChain {
    const chain = this.chainCache[type];

    if (chain) {
      return chain;
    } else {
      const list = this.nameSet[type];

      if (list) {
        const listChain = this.constructChain(list);

        if (listChain) {
          this.chainCache[type] = listChain;
          return listChain;
        }
      }
    }

    return;
  }

  // construct markov chain from list of names
  public constructChain(list) {
    let chain = {};
    let i;

    for (i = 0; i < list.length; i++) {
      const names = list[i].split(/\s+/);
      chain = this.incrChain(chain, "parts", names.length);
      let j;

      for (j = 0; j < names.length; j++) {
        const name = names[j];
        chain = this.incrChain(chain, "nameLen", name.length);

        const c = name.substr(0, 1);
        chain = this.incrChain(chain, "initial", c);

        let mystr = name.substr(1);
        let lastC = c;

        while (mystr.length > 0) {
          const myc = mystr.substr(0, 1);
          chain = this.incrChain(chain, lastC, myc);

          mystr = mystr.substr(1);
          lastC = myc;
        }
      }
    }

    return this.scaleChain(chain);
  }

  public incrChain(chain: IMarkovChain, key, token) {
    if (chain[key]) {
      if (chain[key][token]) {
        chain[key][token]++;
      } else {
        chain[key][token] = 1;
      }
    } else {
      chain[key] = {};
      chain[key][token] = 1;
    }

    return chain;
  }

  public scaleChain(chain: IMarkovChain) {
    const tableLen = {};

    Object.keys(chain).forEach((key) => {
      tableLen[key] = 0;

      Object.keys(chain[key]).forEach((token) => {
        const count = chain[key][token];
        const weighted = Math.floor(Math.pow(count, 1.3));

        chain[key][token] = weighted;
        tableLen[key] += weighted;
      });
    });

    chain.tableLen = tableLen;

    return chain;
  }

  // construct name from markov chain
  public markovName(chain: IMarkovChain) {
    const parts = parseInt(this.selectLink(chain, "parts"));
    const names = [];
    let i;

    for (i = 0; i < parts; i++) {
      const nameLen = parseInt(this.selectLink(chain, "nameLen"));

      let c = this.selectLink(chain, "initial");
      let name = c;
      let lastC = c;

      while (name.length < nameLen) {
        c = this.selectLink(chain, `${lastC}`);
        name += c;
        lastC = c;
      }

      names.push(name);
    }

    return names.join(" ");
  }

  public selectLink(chain: IMarkovChain, key: string): string {
    const len = chain.tableLen[key];
    const idx = Math.floor(Math.random() * len);
    let t = 0;
    let returnToken = "-";

    Object.keys(chain[key]).forEach((token) => {
      t += chain[key][token];
      if (idx < t) {
        returnToken = token;
      }
    });

    return returnToken;
  }
}

export default Generator;

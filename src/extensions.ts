declare global {
  // tslint:disable-next-line
  interface Array<T> {
    sample(): T;
  }
}

// grab a random element
Array.prototype.sample = function() {
  return this[Math.floor(Math.random() * this.length)];
};

export default {};

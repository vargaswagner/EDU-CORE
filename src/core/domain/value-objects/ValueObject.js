export class ValueObject {
  #value;

  constructor(value) {
    this.#value = Object.freeze(value);
  }

  get value() {
    return this.#value;
  }

  equals(other) {
    if (!(other instanceof ValueObject)) {
      return false;
    }

    return JSON.stringify(this.#value) === JSON.stringify(other.value);
  }

  toJSON() {
    return this.#value;
  }
}

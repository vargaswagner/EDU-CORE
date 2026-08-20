export class DTO {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  toJSON() {
    return {
      ...this,
    };
  }
}

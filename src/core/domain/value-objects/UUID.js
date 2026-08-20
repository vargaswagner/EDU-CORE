import crypto from 'node:crypto';
import { ValueObject } from './ValueObject.js';

export class UUID extends ValueObject {
  constructor(value = crypto.randomUUID()) {
    if (!UUID.isValid(value)) {
      throw new Error('UUID inválido');
    }

    super(value);
  }

  static isValid(value) {
    return (
      typeof value === 'string' &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value,
      )
    );
  }

  toString() {
    return this.value;
  }
}

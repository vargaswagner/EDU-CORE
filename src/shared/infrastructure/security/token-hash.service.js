// src/shared/infrastructure/security/token-hash.service.js

import crypto from 'node:crypto';

export class TokenHashService {
  hash(token) {
    if (typeof token !== 'string' || token.length === 0) {
      throw new Error('El token es obligatorio.');
    }

    return crypto.createHash('sha256').update(token, 'utf8').digest('hex');
  }

  compare(token, hash) {
    if (typeof token !== 'string' || typeof hash !== 'string') {
      return false;
    }

    const calculatedHash = this.hash(token);

    const calculatedBuffer = Buffer.from(calculatedHash, 'utf8');

    const storedBuffer = Buffer.from(hash, 'utf8');

    if (calculatedBuffer.length !== storedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(calculatedBuffer, storedBuffer);
  }
}

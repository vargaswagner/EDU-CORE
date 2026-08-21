// src/modules/auth/application/dtos/refresh-token.dto.js

export class RefreshTokenDto {
  constructor({ refreshToken }) {
    if (typeof refreshToken !== 'string' || refreshToken.length === 0) {
      throw new Error('Refresh token obligatorio.');
    }

    this.refreshToken = refreshToken;
  }
}

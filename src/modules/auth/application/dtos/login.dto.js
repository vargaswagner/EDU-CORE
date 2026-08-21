// src/modules/auth/application/dtos/login.dto.js

export class LoginDto {
  constructor({
    email,
    password,
    ipAddress = null,
    userAgent = null,
    deviceInfo = null,
  }) {
    this.email = email?.trim().toLowerCase();
    this.password = password;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.deviceInfo = deviceInfo;
  }
}

export class ApplicationService {
  constructor({ logger = console } = {}) {
    this.logger = logger;
  }
}

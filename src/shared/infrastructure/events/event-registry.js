export class EventRegistry {
  #eventBus;

  constructor(eventBus) {
    if (!eventBus) {
      throw new Error('EventBus es obligatorio.');
    }

    this.#eventBus = eventBus;
  }

  register(eventName, handler) {
    this.#eventBus.register(eventName, handler);
  }

  registerMany(registrations = []) {
    for (const registration of registrations) {
      this.register(registration.event, registration.handler);
    }
  }
}

// src/shared/infrastructure/events/event-bus.js

export class EventBus {
  #handlers = new Map();

  register(eventName, handler) {
    if (!eventName) {
      throw new Error('eventName es obligatorio.');
    }

    if (!handler || typeof handler.handle !== 'function') {
      throw new Error('El handler debe implementar handle().');
    }

    if (!this.#handlers.has(eventName)) {
      this.#handlers.set(eventName, []);
    }

    const handlers = this.#handlers.get(eventName);

    handlers.push(handler);
  }

  unregister(eventName, handler) {
    const handlers = this.#handlers.get(eventName);

    if (!handlers) {
      return;
    }

    const filtered = handlers.filter(
      (registeredHandler) => registeredHandler !== handler,
    );

    if (filtered.length === 0) {
      this.#handlers.delete(eventName);
      return;
    }

    this.#handlers.set(eventName, filtered);
  }

  async publish(event) {
    if (!event) {
      throw new Error('El evento es obligatorio.');
    }

    const eventName = event.eventName || event.constructor.name;

    const handlers = this.#handlers.get(eventName) || [];

    for (const handler of handlers) {
      await handler.handle(event);
    }
  }

  async publishAll(events = []) {
    for (const event of events) {
      await this.publish(event);
    }
  }

  getRegisteredHandlers(eventName) {
    return [...(this.#handlers.get(eventName) || [])];
  }

  hasHandlers(eventName) {
    return (
      this.#handlers.has(eventName) && this.#handlers.get(eventName).length > 0
    );
  }

  clear() {
    this.#handlers.clear();
  }
}

export class DomainEventDispatcher {
  #handlers = new Map();

  register(eventName, handler) {
    if (!this.#handlers.has(eventName)) {
      this.#handlers.set(eventName, []);
    }

    this.#handlers.get(eventName).push(handler);
  }

  async dispatch(event) {
    const handlers = this.#handlers.get(event.eventName) || [];

    for (const handler of handlers) {
      await handler(event);
    }
  }

  async dispatchAll(events) {
    for (const event of events) {
      await this.dispatch(event);
    }
  }

  clear() {
    this.#handlers.clear();
  }
}

import { Entity } from './Entity.js';

export class AggregateRoot extends Entity {
  #domainEvents = [];

  addDomainEvent(event) {
    this.#domainEvents.push(event);
  }

  get domainEvents() {
    return [...this.#domainEvents];
  }

  clearDomainEvents() {
    this.#domainEvents = [];
  }
}

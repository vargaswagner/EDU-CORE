import crypto from 'node:crypto';

export class DomainEvent {
  constructor({ aggregateId, occurredAt = new Date() }) {
    this.eventId = crypto.randomUUID();
    this.aggregateId = aggregateId;
    this.occurredAt = occurredAt;
  }

  get eventName() {
    return this.constructor.name;
  }
}

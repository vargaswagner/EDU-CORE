import { EventBus } from './event-bus.js';
import { EventRegistry } from './event-registry.js';

export const eventBus = new EventBus();

export const eventRegistry = new EventRegistry(eventBus);

export { EventBus, EventRegistry };

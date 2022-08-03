import { EventEmitter as NodeEventEmitter } from 'node:events';

let instance = null;

export default class EventEmitter {
	static getInstance() {
		if (!instance) {
			instance = new NodeEventEmitter();
		}

		return instance;
	}

	static on(eventClass, listeners) {
		const eventEmitter = EventEmitter.getInstance();

		eventEmitter.on(eventClass.eventName, function (event) {
			for (const listener of listeners) {
				const listenerInstance = new listener();
				listenerInstance.handle(event);
			}
		});
	}
}

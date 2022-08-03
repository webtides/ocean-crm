import EventEmitter from "../singletons/event-emitter";

export default class Event {
	static eventName;
	eventEmitter;

	constructor() {
		this.eventEmitter = EventEmitter.getInstance();
	}

	emit() {
		this.eventEmitter.emit(this.constructor.eventName, this);
	}
}

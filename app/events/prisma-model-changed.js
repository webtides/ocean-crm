import Event from './event.js';

export default class PrismaModelChanged extends Event {
	static eventName = 'ocean-crm-prisma-model-changed';
	changeType;
	modelName;
	model;
	service;
	request;

	constructor(changeType, modelName, model, service, request) {
		super();
		this.changeType = changeType;
		this.modelName = modelName;
		this.model = model;
		this.service = service;
		this.request = request;
	}
}

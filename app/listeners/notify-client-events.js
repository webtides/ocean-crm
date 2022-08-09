import fetch from 'node-fetch';

export default class NotifyClientEvents {
	/**
	 * @param { PrismaModelChanged } event
	 */
	handle(event) {
		// TODO: this should probably not be an http request... maybe move the post handler to a singleton?
		fetch('http://localhost:3000/api/events', {
			method: 'post',
			body: JSON.stringify({
				[event.service.name()]: {
					total: event.service.getAll().length,
					// deleted: this.getDeleted().length,
				},
			}),
			headers: { 'Content-Type': 'application/json' },
		});
	}
}

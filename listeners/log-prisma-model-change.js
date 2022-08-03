import LogService from "../services/LogService";

export default class LogPrismaModelChange {
	/**
	 * @param { PrismaModelChanged } event
	 */
	async handle(event) {
		await LogService.addLog(event.changeType, event.modelName, event.model, event.request.user);
	}
}

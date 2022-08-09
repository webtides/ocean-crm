import Job from './job';
import LogService from '../services/LogService.js';
import { stringify } from 'csv-stringify/sync';
import fs from "fs";

export default class GenerateCsvReports extends Job {
	async handle() {
		const logs = await LogService.getAll();

		const csv = stringify(
			logs.map((log) => ({
				createdAt: log.createdAt,
				logType: log.logType,
				resourceType: log.resourceType,
			})),
			{
				header: true,
			},
		);

		fs.writeFileSync(`./.reports/logs-${Date.now()}.csv`, csv);
	}
}

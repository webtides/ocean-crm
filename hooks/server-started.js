import { HOOKS } from '@webtides/luna-js/src/framework/hooks/definitions';
import EventEmitter from '../singletons/event-emitter';
import LogPrismaModelChange from '../listeners/log-prisma-model-change';
import PrismaModelChanged from '../events/prisma-model-changed';
import NotifyClientEvents from '../listeners/notify-client-events';
import UserCreated from '../events/user-created';
import SendWelcomeMail from '../listeners/send-welcome-mail';
import Job from '../jobs/job';
import GenerateCsvReports from '../jobs/generate-csv-reports.js';

export const name = HOOKS.SERVER_STARTED;

export default async () => {
	// register events and listeners
	EventEmitter.on(PrismaModelChanged, [LogPrismaModelChange, NotifyClientEvents]);
	EventEmitter.on(UserCreated, [SendWelcomeMail]);

	// register/schedule jobs
	Job.schedule(new GenerateCsvReports(), '*/60 * * * * *');
};

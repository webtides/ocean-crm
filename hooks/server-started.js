import { HOOKS } from '@webtides/luna-js/src/framework/hooks/definitions';
import EventEmitter from '../app/singletons/event-emitter';
import LogPrismaModelChange from '../app/listeners/log-prisma-model-change';
import PrismaModelChanged from '../app/events/prisma-model-changed';
import NotifyClientEvents from '../app/listeners/notify-client-events';
import UserCreated from '../app/events/user-created';
import SendWelcomeMail from '../app/listeners/send-welcome-mail';
import Job from '../app/jobs/job';
import GenerateCsvReports from '../app/jobs/generate-csv-reports.js';

export const name = HOOKS.SERVER_STARTED;

export default async () => {
	// register events and listeners
	EventEmitter.on(PrismaModelChanged, [LogPrismaModelChange, NotifyClientEvents]);
	EventEmitter.on(UserCreated, [SendWelcomeMail]);

	// register/schedule jobs
	Job.schedule(new GenerateCsvReports(), '*/60 * * * * *');
};

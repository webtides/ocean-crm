import { HOOKS } from '@webtides/luna-js/src/framework/hooks/definitions.js';
import EventEmitter from '../app/singletons/event-emitter.js';
import LogPrismaModelChange from '../app/listeners/log-prisma-model-change.js';
import PrismaModelChanged from '../app/events/prisma-model-changed.js';
import NotifyClientEvents from '../app/listeners/notify-client-events.js';
import UserCreated from '../app/events/user-created.js';
import SendWelcomeMail from '../app/listeners/send-welcome-mail.js';
// import Job from '../app/jobs/job.js';
// import GenerateCsvReports from '../app/jobs/generate-csv-reports.js';

export const name = HOOKS.SERVER_STARTED;

export default async () => {
	// register events and listeners
	EventEmitter.on(PrismaModelChanged, [LogPrismaModelChange, NotifyClientEvents]);
	EventEmitter.on(UserCreated, [SendWelcomeMail]);

	// register/schedule jobs
	// Job.schedule(new GenerateCsvReports(), '*/60 * * * * *');
};

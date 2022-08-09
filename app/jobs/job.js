import schedule from 'node-schedule';

// TODO: this is probably not gonna be good enough...
// I have used https://github.com/node-schedule/node-schedule for now
// what about concurrency? queues? retries? failures? persistence? logging?
// see https://blog.logrocket.com/comparing-best-node-js-schedulers/ for other options

export default class Job {
	handle() {}

	static schedule(job, cron) {
		schedule.scheduleJob(cron, () => {
			job.handle();
		});
	}
}

import { PrismaClient } from '@prisma/client';
import PrismaFactory from './PrismaFactory.js';
const prisma = new PrismaClient();

export default class LogFactory extends PrismaFactory {
	model() {
		return prisma.log;
	}

	properties(properties) {
		return {
			logType: 'create', // create, update, delete, restore
			resourceType: 'user', // contact, organization, user
			resourceId: 1,
			userId: 1,
			...properties,
		};
	}
}

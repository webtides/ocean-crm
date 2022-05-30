import { HOOKS } from '@webtides/luna-js/src/framework/hooks/definitions';
import OrganizationService from "../services/OrganizationService";

export const name = HOOKS.SERVER_STARTED;

export default async () => {
	OrganizationService.init();
};

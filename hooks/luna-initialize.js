import { HOOKS } from '@webtides/luna-js/src/framework/hooks/definitions';
import ContactService from "../app/services/ContactService";

export const name = HOOKS.LUNA_INITIALIZE;

export default async ({ luna }) => {
	luna.set(ContactService, ContactService);
};

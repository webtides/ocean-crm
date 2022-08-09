import { HOOKS } from '@webtides/luna-js/src/framework/hooks/definitions';
import yamljs from 'yamljs';
import swaggerUi from 'swagger-ui-express';

const swaggerDocument = yamljs.load('docs/openapi.yaml');

export const name = HOOKS.ROUTES_BEFORE_REGISTER;

export default async ({ router }) => {
	router.use('/api-docs', swaggerUi.serve);
	router.get('/api-docs', swaggerUi.setup(swaggerDocument));
};

import { HOOKS } from '@webtides/luna-js/src/framework/hooks/definitions.js';
// import yamljs from 'yamljs';
// import swaggerUi from 'swagger-ui-express';
//
// const swaggerDocument = yamljs.load('openapi.yaml');

export const name = HOOKS.ROUTES_BEFORE_REGISTER;

export default async ({ router }) => {
	// router.use('/api-docs', swaggerUi.serve);
	// router.get('/api-docs', swaggerUi.setup(swaggerDocument));
};

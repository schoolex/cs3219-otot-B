import * as express from 'express';
import swaggerUi from 'swagger-ui-express';
import docs from '../docs';

/**
 * Initialises the swagger docs
 */
export default async (app: express.Application) => {
  const options = {
    customSiteTitle: 'Users API',
  };
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(docs(), options));
};

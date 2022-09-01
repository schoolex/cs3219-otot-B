import * as express from 'express';
import database from './database';
import server from './server';
import swaggerUi from './swaggerUi';

/**
 * Initialise all the various loaders
 */
export default async (app: express.Application) => {
  await database.connect();
  await swaggerUi(app);
  server(app);
};

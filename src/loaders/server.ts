import bodyParser from 'body-parser';
import cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';
import routes from '../routes';
import { logger, httpLogger } from '../loggers/logger';

/**
 * Initialise the express application
 */
export default (app: express.Application) => {
  app.enable('trust proxy');
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(httpLogger);

  app.use('/api', routes);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const error: Error = new Error('Not Found');
    error['status'] = 404;
    next(error);
  });

  // Default error handler
  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send({ error: err.message });
  });
};

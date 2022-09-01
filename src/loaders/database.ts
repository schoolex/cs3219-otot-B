import mongoose, { Connection, createConnection } from 'mongoose';
import config from '../config';
import { logger } from '../loggers/logger';

const connect = async (): Promise<void> => {
  const dbUrl = config.database.url;
  try {
    await mongoose.connect(dbUrl);
    logger.info(`Connected to MongoDB at ${dbUrl}`);
  } catch (err) {
    logger.error(`Could not connect to MongoDB at ${dbUrl} `, err);
  }
};

const database = {
  connect,
};

export { database as default };

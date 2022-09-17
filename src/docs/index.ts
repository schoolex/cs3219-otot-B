import info from './info';
import servers from './servers';
import users from './users';

/**
 * Main swagger doc structure
 */
export default () => {
  return {
    openapi: '3.0.3',
    info: info(),
    servers: servers(),
    paths: {
      '/users': {
        post: users.post(),
        get: users.getAll(),
      },
      '/users/{userId}': {
        get: users.get(),
        put: users.put(),
        delete: users.del(),
      },
    },
  };
};

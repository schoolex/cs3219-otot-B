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
      },
      '/users/{userId}': {
        get: users.get(),
        patch: users.patch(),
        delete: users.del(),
      },
    },
  };
};

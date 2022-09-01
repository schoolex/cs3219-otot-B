/**
 * Docs related to the 'Users' endpoints
 */

const tags = ['Users'];

const get = () => {
  return {
    summary: 'Gets a user by id',
    description: 'Gets a user by id',
    tags,
    parameters: [
      {
        in: 'path',
        name: 'userId',
        type: 'string',
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'Returns the user',
      },
    },
  };
};

const post = () => {
  return {
    summary: 'Creates a new user',
    description: 'Creates a new user',
    tags,
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'Leanne Graham',
              },
              dob: {
                type: 'string',
                example: '11/11/1991',
              },
              address: {
                type: 'string',
                example: '711-721 Debs Place',
              },
              description: {
                type: 'string',
                example: 'I am a user',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Returns the created user',
      },
    },
  };
};

const patch = () => {
  return {
    summary: 'Updates a user by id',
    description: 'Updates a user by id',
    tags,
    parameters: [
      {
        in: 'path',
        name: 'userId',
        type: 'string',
        required: true,
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'Leanne Graham',
              },
              dob: {
                type: 'string',
                example: '11/11/1991',
              },
              address: {
                type: 'string',
                example: '711-721 Debs Place',
              },
              description: {
                type: 'string',
                example: 'I am a user',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Returns the updated user',
      },
    },
  };
};

const del = () => {
  return {
    summary: 'Deletes a user by id',
    description: 'Deletes a user by id',
    tags,
    parameters: [
      {
        in: 'path',
        name: 'userId',
        type: 'string',
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'Returns the deleted user',
      },
    },
  };
};

const Users = {
  get,
  post,
  patch,
  del,
};

export { Users as default };

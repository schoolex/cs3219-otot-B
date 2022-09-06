/**
 * List all the servers
 */
export default () => {
  return [
    {
      url: 'http://localhost:3000/api', // url
      description: 'Local', // name
    },
    {
      url: 'https://cs3219-361208.as.r.appspot.com/api',
      description: 'Google App Engine',
    },
  ];
};

import schema from './schema';

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'delivery/email',
        cors: true,
        authorizer: 'Authorization',
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}

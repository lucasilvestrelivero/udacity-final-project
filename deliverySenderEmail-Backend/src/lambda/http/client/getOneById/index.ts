
export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'client/{clientId}',
        cors: true,
        authorizer: 'Authorization'
      }
    }
  ]
}

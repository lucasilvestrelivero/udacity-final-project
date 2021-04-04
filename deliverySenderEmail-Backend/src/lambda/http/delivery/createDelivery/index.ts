export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'delivery',
        cors: true,
        authorizer: 'Authorization',
      }
    }
  ]
}

import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { getOneById } from '../../../../businessLogic/clientBL';
import { createLogger } from '../../../../utils/logger';

const logger = createLogger('getTasks')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Print the log in the CloudWatch getTasks Group
  logger.info('Processing event: ', event);


  // get clientId in the path parameter
  const clientId = event.pathParameters.clientId

  // Query the task items by user ID.
  const tasks = await getOneById(clientId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(tasks)
  };
}

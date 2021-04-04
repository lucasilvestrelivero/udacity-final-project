import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { getAllClients } from '../../../../businessLogic/clientBL';
import { createLogger } from '../../../../utils/logger';

const logger = createLogger('getTasks')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Print the log in the CloudWatch getTasks Group
  logger.info('Processing event: ', event);

  // Query the task items by user ID.
  const tasks = await getAllClients();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(tasks)
  };
}

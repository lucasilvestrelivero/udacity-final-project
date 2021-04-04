import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { getAllDeliveries } from '../../../../businessLogic/deliveryBL';
import { createLogger } from '../../../../utils/logger';

const logger = createLogger('get All Deliveries')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Print the log in the CloudWatch getTasks Group
  logger.info('Processing event: ', event);

  // Query the task items by user ID.
  const tasks = await getAllDeliveries();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(tasks)
  };
}

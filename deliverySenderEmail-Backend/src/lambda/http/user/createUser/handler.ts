import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { createUser } from 'src/businessLogic/userBL';

import { createLogger } from '../../../../utils/logger';
import { User } from './../../../../models/user';

const logger = createLogger('create Delivery')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  // Print the log in the CloudWatch CreateTask Group
  logger.info('Processing event: ', event);

  // Get Body of the request
  const body: User = JSON.parse(event.body);

  const newItem = await createUser(body);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(newItem)
  }
}

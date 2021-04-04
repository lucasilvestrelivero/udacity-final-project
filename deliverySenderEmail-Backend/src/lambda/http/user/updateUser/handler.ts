import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { updateUser } from '../../../../businessLogic/userBL';
import { createLogger } from '../../../../utils/logger';
import { User } from './../../../../models/user';

const logger = createLogger('updateTask')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Print the log in the CloudWatch CreateTask Group
  logger.info('Processing event: ', event);

  const userId = event.pathParameters.userId
  const updatedClient: User = JSON.parse(event.body);

  const taskUpdated = await updateUser(userId, updatedClient);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(taskUpdated)
  };
}

import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { deleteUser } from '../../../../businessLogic/userBL';
import { createLogger } from '../../../../utils/logger';

const logger = createLogger('deleteTask')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   // Print the log in the CloudWatch getTasks Group
   logger.info('Processing event: ', event);
  
   // Get taksId from ULR
  const userId = event.pathParameters.userId;

  const message = await deleteUser(userId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(message)
  }
}

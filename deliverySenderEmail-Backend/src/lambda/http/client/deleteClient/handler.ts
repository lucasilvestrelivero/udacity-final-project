import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { deleteClient } from '../../../../businessLogic/clientBL';
import { createLogger } from '../../../../utils/logger';

const logger = createLogger('deleteTask')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   // Print the log in the CloudWatch getTasks Group
   logger.info('Processing event: ', event);
  
   // Get taksId from ULR
  const clientId = event.pathParameters.clientId;

  const message = await deleteClient(clientId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(message)
  }
}

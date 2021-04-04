import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { updateClient } from '../../../../businessLogic/clientBL';
import { createLogger } from '../../../../utils/logger';
import { Client } from './../../../../models/client';

const logger = createLogger('updateTask')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Print the log in the CloudWatch CreateTask Group
  logger.info('Processing event: ', event);

  const clientId = event.pathParameters.clientId
  const updatedClient: Client = JSON.parse(event.body);

  const taskUpdated = await updateClient(clientId, updatedClient);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(taskUpdated)
  };
}

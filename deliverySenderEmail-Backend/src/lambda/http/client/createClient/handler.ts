import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { createClient } from '../../../../businessLogic/clientBL';
import { createLogger } from '../../../../utils/logger';
import { Client } from './../../../../models/client';
import { verifyEmail } from 'src/businessLogic/deliveryBL';

const logger = createLogger('createTask')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  // Print the log in the CloudWatch CreateTask Group
  logger.info('Processing event: ', event);

  // Get Body of the request
  const taskBody: Client = JSON.parse(event.body);

  const newTask = await createClient(taskBody);

  await verifyEmail(newTask.emails);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(newTask)
  }
}
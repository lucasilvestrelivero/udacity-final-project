import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { createDelivery, getUploadUrl } from '../../../../businessLogic/deliveryBL';
import { createLogger } from '../../../../utils/logger';
import { DeliveryCreateRequest } from './../../../../models/deliveryCreateRequest';

const logger = createLogger('createTask')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  // Print the log in the CloudWatch CreateTask Group
  logger.info('Processing event: ', event);

  // Get Body of the request
  const body: DeliveryCreateRequest = JSON.parse(event.body);

  const newItem = await createDelivery(body);

  const urls = getUploadUrl(newItem.attachments);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({item: newItem, urls: urls})
  }
}

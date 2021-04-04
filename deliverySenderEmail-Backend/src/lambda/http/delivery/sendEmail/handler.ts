import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { sendEmail } from 'src/businessLogic/deliveryBL';
import { createLogger } from 'src/utils/logger';

import { Delivery } from './../../../../models/delivery';

const logger = createLogger('sendEmail')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Print the log in the CloudWatch CreateTask Group
  logger.info('Processing event: ', event);

  const item: Delivery = JSON.parse(event.body);

  try {
    await sendEmail(item);
    logger.info(`The email has been sent successfully: delivery Id: ${item.deliveryId}`);
  } catch (error) {
    logger.error('error sending email ', error);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({message: 'Email send successfully', error})
    };
  }

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({message: 'Email send successfully'})
  };
}
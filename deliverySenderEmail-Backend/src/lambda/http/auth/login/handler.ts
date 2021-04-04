import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { getOneByUsername } from '../../../../businessLogic/userBL';
import { createLogger } from '../../../../utils/logger';
import { Login } from './../../../../models/login';
import { generateToken } from 'src/auth/utils';

const logger = createLogger('Login')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  // Print the log in the CloudWatch CreateTask Group
  logger.info('Processing event: ', event);

  // Get Body of the request
  const login: Login = JSON.parse(event.body);

  const user = await getOneByUsername(login.username);

  if (!user) {
    logger.info('Cant find user by username: ' + login.username);
    return responseError();
  }

  if (user.password !== login.password) {
    logger.info('wrong password');
    return responseError();
  }

  const token = generateToken(user.userId);

  const response = {
    user,
    auth: token
  }

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(response)
  }
}

function responseError() {
  return {
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({message: 'user not found'})
  }
}
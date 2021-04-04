import type { AWS } from '@serverless/typescript';
import {
  CreateClient,
  UpdateClient,
  DeleteClient,
  GetAllClients,
  CreateUser,
  UpdateUser,
  DeleteUser,
  GetAllUsers,
  GetOneClient,
  GetOneUser,
  Login,
  Authorization,
  CreateDelivery,
  GetAllDeliveries,
  SendEmail
} from './src/lambda';

const serverlessConfiguration: AWS = {
  service: 'deliverysenderemail-backend',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'sa-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      CLIENTS_TABLE: "Client-${self:provider.stage}",
      DELIVERIES_TABLE: "Deliveries-${self:provider.stage}",
      USERS_TABLE: "Users-${self:provider.stage}",
      USERS_USERNAME_INDEX: "UsersUsernameIndex",
      DELIVERY_ATTACHMENT: "delivery-sender-email-attachments",
      JWT_SECRET_KEY: "123",
      SIGNED_URL_EXPIRATION_SECONDS: "300"
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:PutItem", "dynamodb:Scan", "dynamodb:UpdateItem", "dynamodb:DeleteItem", "dynamodb:Query"],
        Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.CLIENTS_TABLE}"
      },
      {
        Effect: "Allow",
        Action: ["dynamodb:PutItem", "dynamodb:Scan", "dynamodb:Query"],
        Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.DELIVERIES_TABLE}"
      },
      {
        Effect: "Allow",
        Action: ["dynamodb:PutItem", "dynamodb:Scan", "dynamodb:UpdateItem", "dynamodb:DeleteItem", "dynamodb:Query"],
        Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USERS_TABLE}"
      },
      {
        Effect: "Allow",
        Action: ["dynamodb:Query"],
        Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USERS_TABLE}/index/${self:provider.environment.USERS_USERNAME_INDEX}"
      },
      {
        Effect: "Allow",
        Action: ["s3:PutObject", "s3:GetObject"],
        Resource: "arn:aws:s3:::${self:provider.environment.DELIVERY_ATTACHMENT}/*"
      },
      {
        Effect: "Allow",
        Action: ["ses:SendEmail","ses:SendRawEmail", "ses:VerifyEmailIdentity"],
        Resource: "*"
      }
    ]
  },
  functions: {
    CreateClient,
    UpdateClient,
    DeleteClient,
    GetAllClients,
    CreateUser,
    UpdateUser,
    DeleteUser,
    GetAllUsers,
    GetOneClient,
    GetOneUser,
    Login,
    CreateDelivery,
    GetAllDeliveries,
    SendEmail,
    Authorization,
  },
  resources: {
    Resources: {
      GatewayResponseDefault4XX: {
        Type: "AWS::ApiGateway::GatewayResponse",
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Headers": "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
            "gatewayresponse.header.Access-Control-Allow-Methods": "'GET,OPTIONS,POST'"
          },
          ResponseType: "DEFAULT_4XX",
          RestApiId: { Ref: "ApiGatewayRestApi" }
        }
      },
      AttachmentsBucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: "${self:provider.environment.DELIVERY_ATTACHMENT}",
          CorsConfiguration: {
            CorsRules: [
              {
                AllowedOrigins: ["*"],
                AllowedHeaders: ["*"],
                AllowedMethods: [
                  "GET",
                  "PUT",
                  "POST",
                  "DELETE",
                  "HEAD"
                ]
              }
            ]
          }
        }
      },
      BucketPolicy: {
        Type: "AWS::S3::BucketPolicy",
        Properties: {
          PolicyDocument: {
            Id: "MyPolicyImageS3",
            Version: "2012-10-17",
            Statement: [
              {
                Sid: "PublicReadForGetBucketObjects",
                Effect: "Allow",
                Principal: "*",
                Action: "s3:GetObject",
                Resource: "arn:aws:s3:::${self:provider.environment.DELIVERY_ATTACHMENT}/*"
              }
            ]
          },
          Bucket: { Ref: "AttachmentsBucket" }
        }
      }, 
      ClientsDynamoDBTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: "clientId",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "clientId",
              KeyType: "HASH"
            }
          ],
          BillingMode: "PAY_PER_REQUEST",
          TableName: "${self:provider.environment.CLIENTS_TABLE}"
        }
      },
      DeliveriesDynamoDBTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: "deliveryId",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "deliveryId",
              KeyType: "HASH"
            }
          ],
          BillingMode: "PAY_PER_REQUEST",
          TableName: "${self:provider.environment.DELIVERIES_TABLE}"
        }
      },
      UsersDynamoDBTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: "userId",
              AttributeType: "S"
            },
            {
              AttributeName: "username",
              AttributeType: "S"
            },
          ],
          KeySchema: [
            {
              AttributeName: "userId",
              KeyType: "HASH"
            }
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: "${self:provider.environment.USERS_USERNAME_INDEX}",
              KeySchema: [
                {
                  AttributeName: "username",
                  KeyType: "HASH"
                }
              ],
              Projection: {
                ProjectionType: "ALL"
              }
            }
          ],
          BillingMode: "PAY_PER_REQUEST",
          TableName: "${self:provider.environment.USERS_TABLE}"
        }
      },
    }
  }
}

module.exports = serverlessConfiguration;

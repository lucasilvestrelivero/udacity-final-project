import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { Client } from './../models/client';
import { DeleteMessage } from './../models/deleteMessage';

export class ClientAccessData {
    constructor(
			private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
			private readonly clientTable = process.env.CLIENTS_TABLE,
    ) {}

	async createClient(newClient: Client) {
		await this.docClient.put({
			TableName: this.clientTable,
			Item: newClient
		}).promise();			
	}

	async getAllClients(): Promise<Client[]> {
		// Query the task item by user ID.
		const result = await this.docClient.scan({
			TableName: this.clientTable,
		  }).promise();

		return result.Items as Client[]
	}

	async getOneById(clientId: string): Promise<Client> {
		// Query the task item by user ID.
		const result = await this.docClient.query({
			TableName: this.clientTable,
			KeyConditionExpression: 'clientId = :clientId',
			ExpressionAttributeValues: {
				':clientId': clientId
			}
		}).promise();
	
		return result.Items[0] as Client
	}

	async deleteClient(clientId: string): Promise<DeleteMessage> {
		// Query the task items by user ID.
		await this.docClient.delete({
			TableName: this.clientTable,
			Key: {
				clientId: clientId
			}
		}).promise();

		return {
			message: 'item deleted successfully'
		}
	}

	async updateClient(clientId: string, updatedClient: Client): Promise<Client> {
		const updateItem = await this.docClient.update({
			TableName: this.clientTable,
			Key: {
				clientId: clientId
			},
			UpdateExpression: "set #name = :name, emails = :emails",
			ExpressionAttributeValues: {
			  ":name": updatedClient.name,
			  ":emails": updatedClient.emails,
			},
			ExpressionAttributeNames: {
			  "#name": "name"
			},
			ReturnValues: "ALL_NEW"
		  }).promise();

		  return updateItem.Attributes as Client
	}
    
}
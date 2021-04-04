import { User } from './../models/user';
import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { DeleteMessage } from './../models/deleteMessage';

export class UserAccessData {
    constructor(
			private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
			private readonly userTable = process.env.USERS_TABLE,
			private readonly usersUsernameIndex = process.env.USERS_USERNAME_INDEX
    ) {}

	async createUser(newUser: User) {
		await this.docClient.put({
			TableName: this.userTable,
			Item: newUser
		}).promise();			
	}

	async getAllUsers(): Promise<User[]> {
		// Query the task item by user ID.
		const result = await this.docClient.scan({
			TableName: this.userTable,
		  }).promise();

		return result.Items as User[]
	}

	async getOneById(userId: string): Promise<User> {
		// Query the task item by user ID.
		const result = await this.docClient.query({
			TableName: this.userTable,
			KeyConditionExpression: 'userId = :userId',
			ExpressionAttributeValues: {
				':userId': userId
			}
		}).promise();
	
		return result.Items[0] as User
	}

	async getOneByUsername(username: string): Promise<User> {
		// Query the task item by user ID.
		const result = await this.docClient.query({
			TableName: this.userTable,
			IndexName: this.usersUsernameIndex,
			KeyConditionExpression: 'username = :username',
			ExpressionAttributeValues: {
			  ':username': username
			}
		}).promise();
	
		return result.Items[0] as User
	}

	async deleteUser(userId: string): Promise<DeleteMessage> {
		// Query the task items by user ID.
		await this.docClient.delete({
			TableName: this.userTable,
			Key: {
				userId: userId
			}
		}).promise();

		return {
			message: 'item deleted successfully'
		}
	}

	async updateUser(userId: string, updatedUser: User): Promise<User> {
		const updateItem = await this.docClient.update({
			TableName: this.userTable,
			Key: {
				userId: userId
			},
			UpdateExpression: "set username = :username, password = :password",
			ExpressionAttributeValues: {
				":username": updatedUser.username,
			  	":password": updatedUser.password,
			},
			ReturnValues: "ALL_NEW"
		  }).promise();

		  return updateItem.Attributes as User
	}
    
}
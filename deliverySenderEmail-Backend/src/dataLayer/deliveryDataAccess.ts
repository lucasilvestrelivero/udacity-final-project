import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { Delivery } from './../models/delivery';

let nodemailer = require("nodemailer");

export class DeliveryAccessData {
    constructor(
			private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
			private readonly SES = new AWS.SES({apiVersion: "2010-12-01",region: "sa-east-1"}),
			private readonly s3 = new AWS.S3({ signatureVersion: 'v4' }),
			private readonly deliveryTable = process.env.DELIVERIES_TABLE,
			private readonly bucketName = process.env.DELIVERY_ATTACHMENT,
			private readonly ulrTimeExpiration = +process.env.SIGNED_URL_EXPIRATION_SECONDS,
    ) {}

	async createDelivery(item: Delivery) {
		await this.docClient.put({
			TableName: this.deliveryTable,
			Item: item
		}).promise();			
	}

	async getAllDeliveries(): Promise<Delivery[]> {
		const result = await this.docClient.scan({
			TableName: this.deliveryTable,
		  }).promise();

		return result.Items as Delivery[]
	}

	async getOneById(itemId: string): Promise<Delivery> {
		// Query the task item by user ID.
		const result = await this.docClient.query({
			TableName: this.deliveryTable,
			KeyConditionExpression: 'deliveryId = :deliveryId',
			ExpressionAttributeValues: {
				':deliveryId': itemId
			}
		}).promise();
	
		return result.Items[0] as Delivery
	}

	getUploadUrl(attachments: string[]) {
		const urls: string[] = []
		for(let file of attachments) {
			const split = file.split("/");
			const fileId = split[split.length - 1];
			urls.push(this.s3.getSignedUrl('putObject', {
				Bucket: this.bucketName,
				Key: fileId,
				Expires: this.ulrTimeExpiration,
		 	}));
		}

		return urls;
	}

	async sendEmail(item: Delivery) {

		const attachments: {filename: string, content: any}[] = [];
		await Promise.all(item.attachments.map(async (file) => {
			const split = file.split("/");
			const id = split[split.length - 1]
			const fileData = await this.getS3File(id);
			attachments.push({
				filename: id,
				content: fileData.Body
			});
		}));
		
		console.log('Number of files in attachments: ' + attachments.length);

		const mailOptions = {
			from: 'lucasilvestre1@gmail.com',
			subject: 'Delivery receipt',
			html: `<p>Hi ${item.client.name},</p>
			<p>Attached is the proof of delivery.</p>
			<p>For more information, reply this email !</p>`,
			to: item.client.emails,
			attachments: attachments
		};
		// create Nodemailer SES transporter
		let transporter = nodemailer.createTransport({
			SES: { ses: this.SES, aws: AWS },
		});
		await transporter.sendMail(mailOptions)
	}

	private async getS3File(itemId: string) {
		return this.s3.getObject({
			Bucket: this.bucketName,
			Key: itemId,
		}).promise();
	}
    
	async verifyEmail(emails: string[]) {
		return await Promise.all(emails.map(async (email) => {
			console.log('Send verify email request: ' + email)
			const result = await this.SES.verifyEmailIdentity({
				EmailAddress: email
			}).promise();
			console.log(result);
		}));
	}
}
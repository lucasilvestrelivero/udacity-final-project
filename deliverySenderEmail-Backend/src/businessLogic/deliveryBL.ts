import { v4 as uuidv4 } from 'uuid';

import { DeliveryAccessData } from './../dataLayer/deliveryDataAccess';
import { Delivery } from './../models/delivery';
import { DeliveryCreateRequest } from './../models/deliveryCreateRequest';


const deliveryAccessData = new DeliveryAccessData();
const bucketName = process.env.DELIVERY_ATTACHMENT;

export async function createDelivery(body: DeliveryCreateRequest) {
	// Create a new task ID
	const id = uuidv4();

	const urls: string[] = [];
	for(let i = 0; i < body.numberOfAttachments; i++) {
		urls.push(`https://${bucketName}.s3.amazonaws.com/${i + 1}-${id}.png`)
	}

	// Creating task object to persist in the database
	const newItem: Delivery = {
		deliveryId: id,
		createdAt: new Date().toISOString(),
		client: body.client,
		attachments: urls,
		observation: body.observation
	}

	await deliveryAccessData.createDelivery(newItem);

	return newItem;
}

export async function getAllDeliveries() {
	return deliveryAccessData.getAllDeliveries();
}

export async function getOneById(userId: string) {
	return deliveryAccessData.getOneById(userId);
}

export async function sendEmail(delivery: Delivery) {
	return deliveryAccessData.sendEmail(delivery);
}

export function getUploadUrl(attachments: string[]) {
	return deliveryAccessData.getUploadUrl(attachments);
}

export async function verifyEmail(emails: string[]) {
	return deliveryAccessData.verifyEmail(emails);
}
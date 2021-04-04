import { v4 as uuidv4 } from 'uuid';

import { ClientAccessData } from './../dataLayer/clientDataAccess';
import { Client } from './../models/client';

const clientAccessData = new ClientAccessData();

export async function createClient(body: Client) {
	// Create a new task ID
	const clientId = uuidv4();

	// Creating task object to persist in the database
	const newClient: Client = {
		clientId: clientId,
		createdAt: new Date().toISOString(),
		...body
	}

	await clientAccessData.createClient(newClient);

	return newClient;
}

export async function updateClient(clientId: string, updatedClient: Client) {
	return clientAccessData.updateClient(clientId, updatedClient);
}

export async function getAllClients() {
	return clientAccessData.getAllClients();
}

export async function getOneById(clientId: string) {
	return clientAccessData.getOneById(clientId);
}

export async function deleteClient(clientId: string) {
	return clientAccessData.deleteClient(clientId);
}
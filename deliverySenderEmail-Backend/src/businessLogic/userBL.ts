import { User } from './../models/user';
import { UserAccessData } from './../dataLayer/userDataAccess';
import { v4 as uuidv4 } from 'uuid';


const userAccessData = new UserAccessData();

export async function createUser(body: User) {
	// Create a new task ID
	const userId = uuidv4();

	// Creating task object to persist in the database
	const newItem: User = {
		userId: userId,
		createdAt: new Date().toISOString(),
		...body
	}

	await userAccessData.createUser(newItem);

	return newItem;
}

export async function updateUser(id: string, updatedItem: User) {
	return userAccessData.updateUser(id, updatedItem);
}

export async function getAllUsers() {
	return userAccessData.getAllUsers();
}

export async function getOneById(userId: string) {
	return userAccessData.getOneById(userId);
}

export async function getOneByUsername(username: string) {
	return userAccessData.getOneByUsername(username);
}

export async function deleteUser(id: string) {
	return userAccessData.deleteUser(id);
}
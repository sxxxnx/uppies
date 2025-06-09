import { Client, Account, Databases } from 'appwrite';

const { VITE_PUBLIC_APPWRITE_ENDPOINT, VITE_PUBLIC_APPWRITE_PROJECT_ID } = import.meta.env;

export const client = new Client()
	.setEndpoint(VITE_PUBLIC_APPWRITE_ENDPOINT)
	.setProject(VITE_PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);


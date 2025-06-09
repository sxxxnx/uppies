import { env } from '$env/dynamic/private';
import { error } from 'console';
import { Client, Account, Databases, Storage } from 'node-appwrite';

const { VITE_PUBLIC_APPWRITE_ENDPOINT, VITE_PUBLIC_APPWRITE_PROJECT_ID } = import.meta.env;

export const SESSION_COOKIE = 'auth';

if (!env.APPWRITE_API_SECRET || typeof env.APPWRITE_API_SECRET !== 'string')
	throw error('Invalid `APPWRITE_API_SECRET`, please double check it.');

export function createAdminClient() {
	const client = new Client()
		.setEndpoint(VITE_PUBLIC_APPWRITE_ENDPOINT)
		.setProject(VITE_PUBLIC_APPWRITE_PROJECT_ID)
		.setKey(env.APPWRITE_API_SECRET as string);

	// Return the services we want to use.
	return {
		get account() {
			return new Account(client);
		},
		get database() {
			return new Databases(client);
		},
		get storage() {
			return new Storage(client);
		}
	};
}

export function createSessionClient(event: { cookies: { get: (arg0: string) => any } }) {
	const client = new Client()
		.setEndpoint(VITE_PUBLIC_APPWRITE_ENDPOINT)
		.setProject(VITE_PUBLIC_APPWRITE_PROJECT_ID);

	// Extract our custom domain's session cookie from the request
	const session = event.cookies.get(SESSION_COOKIE);
	if (!session) {
		throw new Error('No user session');
	}

	client.setSession(session);

	// Return the services we want to use.
	return {
		get account() {
			return new Account(client);
		},
		get database() {
			return new Databases(client);
		},
		get storage() {
			return new Storage(client);
		}
	};
}

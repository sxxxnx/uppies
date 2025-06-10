import { env } from '$env/dynamic/private';
import { createSessionClient, createAdminClient, SESSION_COOKIE } from '$lib/appwrite';
import { generateGravatarUrl } from '$lib/util/appwrite';
import { ID, Query } from 'node-appwrite';

export async function handle({ event, resolve }) {
	try {
		const sessionCookie = event.cookies.get(SESSION_COOKIE);
		if (!sessionCookie) {
			event.locals.user = undefined;
			return resolve(event);
		}
		const { account } = createSessionClient(event);

		let user;
		try {
			user = await account.get();
		} catch (accountError) {
			console.error('Failed to get user from account.get():', accountError);
			// If the session is invalid, clear the cookie
			event.cookies.delete(SESSION_COOKIE, { path: '/' });
			event.locals.user = undefined;
			event.locals.userRecord = undefined;
			return resolve(event);
		}

		const { database } = createAdminClient();

		// Check if user record exists in database
		let userRecord;
		try {
			const userRecords = await database.listDocuments('uppies', 'user', [
				Query.equal('userId', user.$id)
			]);

			userRecord = userRecords.documents[0];
		} catch (error) {
			console.log('User record not found, will create new one');
			userRecord = null;
		}

		// Create user record if it doesn't exist
		if (!userRecord) {
			const gravatarUrl = generateGravatarUrl(user.email);
			const nextResetDate = new Date();
			nextResetDate.setMonth(nextResetDate.getMonth() + 1);

			userRecord = await database.createDocument('uppies', 'user', ID.unique(), {
				userId: user.$id,
				email: user.email,
				name: user.name,
				profilePicture: gravatarUrl,
				uploadCap: 0,
				uploadCapSetDate: new Date(),
				uploadCapResetDate: nextResetDate
			});

			console.log('Created new user record with Gravatar');
		}

		// Check if we need to reset upload cap (monthly reset)
		if (userRecord.uploadCapResetDate && new Date() >= new Date(userRecord.uploadCapResetDate)) {
			const today = new Date().toDateString();
			const lastResetDate = userRecord.uploadCapSetDate
				? new Date(userRecord.uploadCapSetDate).toDateString()
				: null;

			if (lastResetDate !== today) {
				const nextResetDate = new Date();
				nextResetDate.setMonth(nextResetDate.getMonth() + 1);

				userRecord = await database.updateDocument('uppies', 'user', userRecord.$id, {
					uploadCap: 0, // Reset to 0
					uploadCapSetDate: new Date(),
					uploadCapResetDate: nextResetDate
				});

				console.log('Reset upload cap for user:', user.email);
			}
		}		// Attach user record to locals for use in other parts of the app
		event.locals.user = user;
		event.locals.userRecord = userRecord;
	} catch (error) {
		console.error('Authentication error:', error);
		event.cookies.delete(SESSION_COOKIE, { path: '/' });
		event.locals.user = undefined;
		event.locals.userRecord = undefined;
	}

	return resolve(event);
}

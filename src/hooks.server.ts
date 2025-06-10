import { env } from '$env/dynamic/private';
import { createSessionClient, SESSION_COOKIE } from '$lib/appwrite';
import { generateGravatarUrl } from '$lib/util/appwrite';

export async function handle({ event, resolve }) {
	try {
		const sessionCookie = event.cookies.get(SESSION_COOKIE);

		if (!sessionCookie) {
			event.locals.user = undefined;
			return resolve(event);
		}

		const { account } = createSessionClient(event);
		const user = await account.get();
		// Initialize Gravatar URL if not set
		if (!user.prefs.profilePicture) {
			console.log('Generating Gravatar for user:', user.email);
			const gravatarUrl = generateGravatarUrl(user.email);
			console.log('Generated Gravatar URL:', gravatarUrl);

			await account.updatePrefs({
				...user.prefs,
				profilePicture: gravatarUrl
			});
			// Update the user object with the new profilePicture
			user.prefs.profilePicture = gravatarUrl;
			console.log('Updated user prefs with Gravatar');
		} else {
			console.log('User already has profile picture:', user.prefs.profilePicture);
		}
		// Initialize upload cap if not set
		if (!user.prefs.uploadCap) {
			// Set initial upload cap and next reset date (1 month from now)
			const nextResetDate = new Date();
			nextResetDate.setMonth(nextResetDate.getMonth() + 1);

			await account.updatePrefs({
				...user.prefs,
				uploadCap: 0,
				uploadCapSetDate: new Date(),
				uploadCapResetDate: nextResetDate
			});
			// Update the user object with the new prefs
			user.prefs.uploadCap = 0;
			user.prefs.uploadCapSetDate = new Date();
			user.prefs.uploadCapResetDate = nextResetDate;
		}
		// Check if it's time to reset the upload cap (monthly reset)
		if (user.prefs.uploadCapResetDate && new Date() >= new Date(user.prefs.uploadCapResetDate)) {
			// Only reset if we haven't already reset today (prevent multiple resets)
			const today = new Date().toDateString();
			const lastResetDate = user.prefs.uploadCapSetDate
				? new Date(user.prefs.uploadCapSetDate).toDateString()
				: null;

			if (lastResetDate !== today) {
				const nextResetDate = new Date();
				nextResetDate.setMonth(nextResetDate.getMonth() + 1);

				await account.updatePrefs({
					...user.prefs,
					uploadCap: 0, // Reset to 0
					uploadCapSetDate: new Date(),
					uploadCapResetDate: nextResetDate
				});
				// Update the user object with the reset values
				user.prefs.uploadCap = 0;
				user.prefs.uploadCapSetDate = new Date();
				user.prefs.uploadCapResetDate = nextResetDate;
			}
		}

		event.locals.user = user;
	} catch (error) {
		console.error('Error in hooks:', error);
		event.cookies.delete(SESSION_COOKIE, { path: '/' });
		event.locals.user = undefined;
	}

	return resolve(event);
}

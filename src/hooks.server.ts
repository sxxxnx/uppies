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

		if (!user.prefs.profilePicture) {
			account.updatePrefs({
				profilePicture: generateGravatarUrl(user.email)
			});
		}

		event.locals.user = user;
	} catch (error) {
		console.error('Error in hooks:', error);
		event.cookies.delete(SESSION_COOKIE, { path: '/' });
		event.locals.user = undefined;
	}

	return resolve(event);
}

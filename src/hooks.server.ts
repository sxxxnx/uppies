import { env } from '$env/dynamic/private';
import { createSessionClient } from '$lib/appwrite';

export async function handle({ event, resolve }) {
	try {
		const { account } = createSessionClient(event);

		event.locals.user = await account.get();
	} catch {}

	return resolve(event);
}

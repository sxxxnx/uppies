import { createSessionClient, SESSION_COOKIE } from '$lib/appwrite';
import { json } from '@sveltejs/kit';

export async function POST(event) {
	const { account } = createSessionClient(event);

	await account.deleteSession('current');
	event.cookies.delete(SESSION_COOKIE, { path: '/' });

	return json({ success: true });
}

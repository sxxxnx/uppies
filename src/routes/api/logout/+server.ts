import { createSessionClient, SESSION_COOKIE } from '$lib/appwrite';
import { redirect } from '@sveltejs/kit';

export async function POST(event) {
	const { account } = createSessionClient(event);

	await account.deleteSession('current');
	event.cookies.delete(SESSION_COOKIE, { path: '/' });

	return redirect(302, '/signup');
}

import { createAdminClient, SESSION_COOKIE } from '$lib/appwrite';

export async function GET(event) {
	const userId = event.url.searchParams.get('userId');
	const secret = event.url.searchParams.get('secret');

	if (!userId || !secret) {
		return new Response('Missing `userId` or `secret` query params', { status: 400 });
	}

	const { account } = createAdminClient();
	const session = await account.createSession(userId, secret);

	const headers = new Headers({
		location: '/account',
		'set-cookie': event.cookies.serialize(SESSION_COOKIE, session.secret, {
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true,
			path: '/'
		})
	});

	return new Response(null, { status: 302, headers });
}

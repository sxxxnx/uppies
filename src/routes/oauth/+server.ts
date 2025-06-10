import { createAdminClient, createSessionClient, SESSION_COOKIE } from '$lib/appwrite';
import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';

export async function GET(event) {
	const userId = event.url.searchParams.get('userId');
	const secret = event.url.searchParams.get('secret');

	console.log('OAuth callback received:', {
		userId: userId ? 'present' : 'missing',
		secret: secret ? 'present' : 'missing',
		origin: event.url.origin,
		fullUrl: event.url.toString()
	});

	if (!userId || !secret) {
		console.error('OAuth callback missing required parameters');
		return new Response('Missing `userId` or `secret` query params', { status: 400 });
	}
	try {
		const { account } = createAdminClient();
		const session = await account.createSession(userId, secret);

		const cookieOptions = {
			sameSite: 'lax' as const, // Better for OAuth flows
			expires: new Date(session.expire),
			secure: !dev && event.url.protocol === 'https:', // Only secure if HTTPS
			path: '/',
			httpOnly: true
		};

		event.cookies.set(SESSION_COOKIE, session.secret, cookieOptions);
	} catch (error) {
		console.error('OAuth session creation failed:', error);
		const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
		redirect(302, `/signup?error=${encodeURIComponent(errorMessage)}`);
	}

	redirect(302, '/');
}

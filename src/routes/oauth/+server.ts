import { createAdminClient, createSessionClient, SESSION_COOKIE } from '$lib/appwrite';
import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import crypto from 'crypto';

export async function GET(event) {
	const userId = event.url.searchParams.get('userId');
	const secret = event.url.searchParams.get('secret');

	if (!userId || !secret) {
		return new Response('Missing `userId` or `secret` query params', { status: 400 });
	}

	try {
		const { account } = createAdminClient();
		const session = await account.createSession(userId, secret);

		event.cookies.set(SESSION_COOKIE, session.secret, {
			sameSite: 'lax',
			expires: new Date(session.expire),
			secure: !dev,
			path: '/',
			httpOnly: true
		});
	} catch (error) {
		console.error('OAuth session creation failed:', error);
		redirect(302, '/signup?error=auth_failed');
	}

	redirect(302, '/');
}

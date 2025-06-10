import { createAdminClient } from '$lib/appwrite';
import { redirect } from '@sveltejs/kit';
import { Query } from 'node-appwrite';

export const load = async ({ locals }) => {
	const user = locals.user;
	if (!user) redirect(302, '/signup?error=unauthorized&source=profile_page');

	try {
		const { database } = createAdminClient();

		const media = await database.listDocuments('uppies', 'posts', [
			Query.equal('userId', user.$id)
		]);

		return {
			media: media.documents
		};
	} catch (error) {
		console.error(error);
	}
};

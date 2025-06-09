import { createAdminClient } from '$lib/appwrite.js';
import { error } from '@sveltejs/kit';

export async function GET({ params }) {
	const { fileID } = params;

	const session = createAdminClient();
	const record = await session.database.getDocument('uppies', 'posts', fileID);

	if (!record) {
		throw error(404, 'File not found.');
	}

	const headers = {
		'Content-Type': 'application/octet-stream',
		'X-File-Salt': record.encSalt,
		'X-File-Iv': record.encIv,
		'X-File-Content-Type': record.contentType
	};

	const file = await session.storage.getFileView('public', record.fileId);

	return new Response(file, {
		status: 200,
		headers
	});
}

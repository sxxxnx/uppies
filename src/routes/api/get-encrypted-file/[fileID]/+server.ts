import { createAdminClient, createSessionClient } from '$lib/appwrite.js';
import { error } from '@sveltejs/kit';

export async function GET(event) {
	const { fileID } = event.params;

	const session = createAdminClient();
	const record = await session.database.getDocument('uppies', 'posts', fileID.toString());

	if (!record) {
		throw error(404, 'File not found.');
	}

	const headers = {
		'Content-Type': 'application/octet-stream',
		'X-File-Content-Type': record.contentType,
		'X-File-Extension': record.fileExtention
	};

	const file = await session.storage.getFileView('public', record.fileId);

	return new Response(
		JSON.stringify({
			file: file,
			encSalt: record.encSalt,
			encIv: record.encIv,
			contentType: record.contentType,
			fileExtension: record.fileExtention
		}),
		{
			status: 200,
			headers
		}
	);
}

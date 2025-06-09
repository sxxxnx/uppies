import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const formData = await request.formData();

	const encryptedFile = formData.get('encryptedFile') as File;
	const fileSalt = formData.get('fileSalt') as string;
	const fileIv = formData.get('fileIv') as string;
	const encryptedLinkPassword = formData.get('encryptedLinkPassword') as File;
	const linkPasswordSalt = formData.get('linkPasswordSalt') as string;
	const linkPasswordIv = formData.get('linkPasswordIv') as string;

	//TODO: Code to upload file to Appwrite and save it in our DB.
	const fileID = '';

	return json({ fileID }, { status: 201 });
}

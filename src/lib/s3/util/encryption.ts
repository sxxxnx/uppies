function arrayBufferToBase64(buffer: ArrayBuffer) {
	let binary = '';

	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;

	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}

	return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
	const binary_string = window.atob(base64);
	const len = binary_string.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binary_string.charCodeAt(i);
	}

	return bytes.buffer;
}

async function encryptFile(file: File, password: string) {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const iv = crypto.getRandomValues(new Uint8Array(12));

	const passwordKey = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(password),
		{ name: 'PBKDF2' },
		false,
		['deriveBits', 'deriveKey']
	);

	const derivedKey = await crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt,
			iterations: 100000,
			hash: 'SHA-256'
		},
		passwordKey,
		{ name: 'AES-GCM', length: 256 },
		true,
		['encrypt', 'decrypt']
	);

	const fileBuffer = await file.arrayBuffer();

	const encryptedContent = await crypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv
		},
		derivedKey,
		fileBuffer
	);
	return {
		encryptFile: new Blob([encryptedContent]),
		salt: salt.buffer,
		iv: iv.buffer
	};
}

async function decryptFile(encryptedBlob: Blob, password: string, salt: ArrayBuffer, iv: ArrayBuffer) {
	const passwordKey = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(password),
		{ name: 'PBKDF2' },
		false,
		['deriveBits', 'deriveKey']
	);

	const derivedKey = await crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt,
			iterations: 100000,
			hash: 'SHA-256'
		},
		passwordKey,
		{ name: 'AES-GCM', length: 256 },
		true,
		['encrypt', 'decrypt']
	);

	const encryptedBuffer = await encryptedBlob.arrayBuffer();

	const decryptedContent = await crypto.subtle.decrypt(
		{
			name: 'AES-GCM',
			iv
		},
		derivedKey,
		encryptedBuffer
	);

	return new Blob([decryptedContent]);
}

async function decryptFileFromUrl(url: string, password: string, salt: ArrayBuffer, iv: ArrayBuffer) {
	try {
		// Fetch the encrypted file from the URL
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
		}

		const encryptedBlob = await response.blob();

		// Decrypt the file
		const decryptedBlob = await decryptFile(encryptedBlob, password, salt, iv);

		return decryptedBlob;
	} catch (error) {
		console.error('Error decrypting file from URL:', error);
		throw error;
	}
}

export { arrayBufferToBase64, base64ToArrayBuffer, encryptFile, decryptFile, decryptFileFromUrl };

import crypto from 'crypto';

export function generateGravatarUrl(email: string, size: number = 200) {
	const hash = crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex');
	return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

export function getInitials(name: string) {
		if (!name) return 'U';

		const words = name
			.trim()
			.split(' ')
			.filter((word) => word.length > 0);

		if (words.length === 0) return 'U';
		if (words.length === 1) return words[0].charAt(0).toUpperCase();

		return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
	}

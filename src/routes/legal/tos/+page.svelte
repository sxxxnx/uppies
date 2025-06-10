<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>Terms of Service - Uppies</title>
	<meta name="description" content="Terms of Service for Uppies - Secure File Sharing Platform" />
</svelte:head>

<div class="min-h-screen bg-background text-white">
	<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="bg-container border-border rounded-xl border p-8">
			<h1 class="mb-8 text-3xl font-bold text-white">Terms of Service</h1>
			<p class="mb-6 text-sm text-neutral-400">Last updated: {new Date().toLocaleDateString()}</p>

			<div class="space-y-8 text-neutral-300">
				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">1. Acceptance of Terms</h2>
					<p class="mb-4">
						By accessing and using Uppies ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the terms of this agreement, you are not authorized to use or access the Service.
					</p>
					<p>
						These Terms of Service ("Terms") constitute a legally binding agreement between you and Uppies regarding your use of our secure file sharing platform and related services.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">2. Description of Service</h2>
					<p class="mb-4">
						Uppies is a secure file sharing platform that allows users to:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Upload and store files with client-side encryption</li>
						<li>Share files securely with access controls</li>
						<li>Manage uploaded content through a user dashboard</li>
						<li>Access files through secure, time-limited links</li>
					</ul>
					<p>
						We reserve the right to modify, suspend, or discontinue the Service at any time with or without notice.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">3. User Accounts and Registration</h2>
					
					<h3 class="mb-3 text-lg font-medium text-white">3.1 Account Creation</h3>
					<p class="mb-4">
						To use certain features of the Service, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary.
					</p>

					<h3 class="mb-3 text-lg font-medium text-white">3.2 Account Security</h3>
					<p class="mb-4">
						You are responsible for:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Maintaining the confidentiality of your account credentials</li>
						<li>All activities that occur under your account</li>
						<li>Immediately notifying us of any unauthorized use</li>
						<li>Securing your master key and encryption passwords</li>
					</ul>

					<h3 class="mb-3 text-lg font-medium text-white">3.3 Age Requirements</h3>
					<p class="mb-4">
						You must be at least 13 years old to use the Service. If you are between 13 and 18 years old, you represent that you have parental or guardian consent to use the Service.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">4. Acceptable Use Policy</h2>
					
					<h3 class="mb-3 text-lg font-medium text-white">4.1 Permitted Uses</h3>
					<p class="mb-4">
						You may use the Service for lawful purposes only, including:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Sharing personal files and documents</li>
						<li>Collaborative work and file exchange</li>
						<li>Backup and storage of your own content</li>
						<li>Any other lawful file sharing purposes</li>
					</ul>

					<h3 class="mb-3 text-lg font-medium text-white">4.2 Prohibited Uses</h3>
					<p class="mb-4">
						You agree NOT to use the Service to:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Upload, store, or share illegal, harmful, threatening, or abusive content</li>
						<li>Violate any applicable laws or regulations</li>
						<li>Infringe upon intellectual property rights of others</li>
						<li>Distribute malware, viruses, or other malicious code</li>
						<li>Share copyrighted material without permission</li>
						<li>Engage in harassment, hate speech, or discrimination</li>
						<li>Attempt to gain unauthorized access to our systems</li>
						<li>Use the Service for commercial purposes without authorization</li>
						<li>Interfere with or disrupt the Service or servers</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">5. File Storage and Limits</h2>
					
					<h3 class="mb-3 text-lg font-medium text-white">5.1 Storage Limits</h3>
					<p class="mb-4">
						We may impose limits on:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Monthly upload quotas</li>
						<li>Individual file size limits</li>
						<li>Total storage capacity per user</li>
						<li>Number of concurrent uploads</li>
					</ul>

					<h3 class="mb-3 text-lg font-medium text-white">5.2 File Retention</h3>
					<p class="mb-4">
						Files may be automatically deleted:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>After extended periods of inactivity</li>
						<li>If they violate our Terms of Service</li>
						<li>If your account is terminated</li>
						<li>If storage limits are exceeded</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">6. Privacy and Data Protection</h2>
					<p class="mb-4">
						Your privacy is important to us. Our collection and use of personal information is governed by our <a href="/legal/privacy-policy" class="text-accent underline">Privacy Policy</a>, which is incorporated into these Terms by reference.
					</p>
					<p class="mb-4">
						We implement client-side encryption to protect your files, but you remain responsible for maintaining the security of your encryption keys and passwords.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">7. Intellectual Property Rights</h2>
					
					<h3 class="mb-3 text-lg font-medium text-white">7.1 Your Content</h3>
					<p class="mb-4">
						You retain all ownership rights to the content you upload. By using the Service, you grant us a limited license to store, process, and transmit your content solely to provide the Service.
					</p>

					<h3 class="mb-3 text-lg font-medium text-white">7.2 Our Content</h3>
					<p class="mb-4">
						The Service, including its design, features, and functionality, is owned by us and protected by copyright, trademark, and other intellectual property laws.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">8. Termination</h2>
					
					<h3 class="mb-3 text-lg font-medium text-white">8.1 Termination by You</h3>
					<p class="mb-4">
						You may terminate your account at any time by contacting us or using account deletion features if available.
					</p>

					<h3 class="mb-3 text-lg font-medium text-white">8.2 Termination by Us</h3>
					<p class="mb-4">
						We may terminate or suspend your account immediately, without prior notice, if you:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Violate these Terms of Service</li>
						<li>Engage in prohibited activities</li>
						<li>Fail to comply with applicable laws</li>
						<li>Create security or legal liability for us</li>
					</ul>

					<h3 class="mb-3 text-lg font-medium text-white">8.3 Effect of Termination</h3>
					<p class="mb-4">
						Upon termination, your right to use the Service ceases immediately. We may delete your content, though we will make reasonable efforts to provide you with an opportunity to retrieve your data.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">9. Disclaimers and Limitation of Liability</h2>
					
					<h3 class="mb-3 text-lg font-medium text-white">9.1 Service Availability</h3>
					<p class="mb-4">
						The Service is provided "as is" and "as available." We do not guarantee that the Service will be uninterrupted, secure, or error-free.
					</p>

					<h3 class="mb-3 text-lg font-medium text-white">9.2 Data Loss</h3>
					<p class="mb-4">
						While we implement security measures, we cannot guarantee against data loss, corruption, or unauthorized access. You are responsible for maintaining backups of important data.
					</p>

					<h3 class="mb-3 text-lg font-medium text-white">9.3 Limitation of Liability</h3>
					<p class="mb-4">
						To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, revenue, or profits.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">10. Indemnification</h2>
					<p class="mb-4">
						You agree to indemnify and hold us harmless from any claims, damages, losses, or expenses arising from:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Your use of the Service</li>
						<li>Your violation of these Terms</li>
						<li>Your content or activities</li>
						<li>Your violation of any third-party rights</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">11. Governing Law and Dispute Resolution</h2>
					<p class="mb-4">
						These Terms are governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or your use of the Service will be resolved through binding arbitration or in the courts of competent jurisdiction.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">12. Changes to Terms</h2>
					<p class="mb-4">
						We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on our website and updating the "Last updated" date.
					</p>
					<p class="mb-4">
						Continued use of the Service after changes constitutes acceptance of the modified Terms.
					</p>
				</section>

				<section>
					<h2 class="mb-4 text-xl font-semibold text-white">13. Contact Information</h2>
					<p class="mb-4">
						If you have questions about these Terms of Service, please contact us through:
					</p>
					<ul class="mb-4 ml-6 list-disc space-y-2">
						<li>Our website contact form</li>
						<li>Email (if contact information is available)</li>
					</ul>
				</section>

				<section class="border-t border-neutral-700 pt-6">
					<p class="text-sm text-neutral-400">
						By using Uppies, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
					</p>
				</section>
			</div>
		</div>
	</div>
</div>

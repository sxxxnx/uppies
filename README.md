# 🔒 Uppies - Secure File Sharing Platform

A modern, secure file sharing platform built with SvelteKit and Appwrite. Uppies allows users to upload, encrypt, and share files with end-to-end encryption for maximum security.

## ✨ Features

- **🔐 End-to-End Encryption**: Files are encrypted client-side before upload using AES-GCM encryption
- **🔑 Password Protection**: Each shared file can be protected with a unique password
- **☁️ Cloud Storage**: Secure file storage using Appwrite Storage integration
- **👤 User Authentication**: Google OAuth integration via Appwrite
- **🎨 Modern UI**: Clean, responsive interface built with TailwindCSS
- **⚡ Fast Performance**: Built on SvelteKit for optimal performance

## 🚀 Tech Stack

- **Frontend**: SvelteKit + TypeScript
- **Styling**: TailwindCSS + Bits UI components
- **Backend**: Appwrite (Database, Auth, Storage)
- **File Storage**: Appwrite Storage
- **Encryption**: Web Crypto API (AES-GCM + PBKDF2)
- **Development**: Vite + ESLint + Prettier

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- Bun package manager
- Doppler CLI (for environment management)
- Appwrite account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sxxxnx/uppies.git
   cd uppies
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   Configure your Doppler project with the following variables:

   ```bash
   VITE_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-endpoint
   VITE_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
   APPWRITE_API_SECRET=your-api-secret
   ```

4. **Start development server**

   ```bash
   bun run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```
src/
├── lib/
│   ├── components/           # Reusable Svelte components
│   ├── stores/              # Svelte stores for state management
│   ├── util/
│   │   └── encryption.ts    # Client-side encryption utilities
│   └── appwrite.ts          # Appwrite configuration
├── routes/
│   ├── api/                 # Server-side API endpoints
│   ├── oauth/               # OAuth callback handling
│   └── signup/              # User registration
└── app.html                 # Main HTML template
```

## 🔒 Security Features

### Encryption Process

1. **File Encryption**: Files are encrypted client-side using AES-GCM with a user-provided password
2. **Key Derivation**: PBKDF2 with 100,000 iterations for password-based key derivation
3. **Unique Salts**: Each file gets a unique salt and IV for encryption
4. **Metadata Storage**: Only encrypted files are stored; salts and IVs are stored separately in the database

### Data Flow

1. User selects file and enters password
2. File is encrypted client-side with generated salt/IV
3. Encrypted file is uploaded to Appwrite Storage
4. Salt, IV, and metadata are stored in Appwrite database
5. Share link contains file ID; password required for decryption

## 📝 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run check` - Run TypeScript checks
- `bun run format` - Format code with Prettier
- `bun run lint` - Lint code with ESLint

## 🚀 Deployment

### Building for Production

```bash
bun run build
```

### Environment Configuration

Ensure all required environment variables are set in your production environment:

- `VITE_PUBLIC_APPWRITE_ENDPOINT`
- `VITE_PUBLIC_APPWRITE_PROJECT_ID`
- `APPWRITE_API_SECRET`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.

---

Built with ❤️ using SvelteKit and Appwrite

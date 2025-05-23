# TheAuthorityGPT

A comprehensive AI-powered platform for prompt engineering and content management.

## Project Structure
```
├── client/           # React frontend
├── server/           # Node.js backend
├── shared/           # Shared types and utilities
└── scripts/         # Deployment and utility scripts
```

## Quick Start

1. Clone the repository
2. Copy `.env.example` to `.env` in both client and server directories
3. Install dependencies:
```bash
pnpm install
```

4. Start development servers:
```bash
pnpm dev
```

5. For production:
```bash
pnpm build && pnpm start
```

## Environment Setup

Configure the following environment variables:

### Server
- `MONGODB_URI`: MongoDB connection string
- `OPENAI_API_KEY`: OpenAI API key
- `JWT_SECRET`: Secret for JWT tokens
- `STRIPE_SECRET_KEY`: Stripe payment processing
- `PORT`: Server port (default: 3000)

### Client
- `VITE_API_URL`: Backend API URL
- `VITE_STRIPE_PUBLIC_KEY`: Stripe public key

## Features

- AI-Powered Prompt Generation
- Role-Based Access Control
- Content Management System
- Expansion Vault
- Payment Integration
- Admin Dashboard

## Documentation

Detailed documentation available in `/docs`

## License

Proprietary - All rights reserved

# Frontend

Next.js 15 application with React 19 and TypeScript.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/                 # Next.js app directory
│   ├── page.tsx        # Homepage
│   ├── register/       # Product registration
│   └── products/       # Product views
├── components/         # React components
├── lib/               # Utilities and helpers
└── public/            # Static assets
```

## Key Features

- **Server Components**: Fast initial loads
- **Client Components**: Interactive UI
- **Wallet Integration**: Freighter wallet support
- **Responsive Design**: Mobile-first approach

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CONTRACT_ID=YOUR_CONTRACT_ID
NEXT_PUBLIC_STELLAR_NETWORK=testnet
```

## Building for Production

```bash
npm run build
npm start
```

## Development Roadmap

This is a foundational implementation. Key areas to implement:

1. **Wallet Integration**: Complete Freighter wallet connection
2. **Contract Interaction**: Implement contract calls
3. **Product Pages**: Build product detail and list pages
4. **Timeline Component**: Visualize tracking events
5. **QR Code**: Generate and scan QR codes
6. **Analytics**: Dashboard with charts

See [CONTRIBUTING.md](../CONTRIBUTING.md) for how to contribute.

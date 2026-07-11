# Deployment Guide

## Prerequisites

- Docker & Docker Compose
- Stellar account with XLM for contract deployment
- Domain name (for production)
- SSL certificate (for production)

## Local Development

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/Supply-Konnect.git
cd Supply-Konnect
```

### 2. Start Services

```bash
docker-compose up -d
```

### 3. Deploy Smart Contract

```bash
cd smart-contract
cargo build --target wasm32-unknown-unknown --release
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/supply_konnect.wasm \
  --source ACCOUNT_SECRET \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"
```

### 4. Configure Environment

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your values

# Frontend
cd ../frontend
cp .env.example .env.local
# Edit .env.local with contract ID
```

### 5. Start Development Servers

```bash
# Backend
cd backend
cargo run

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## Production Deployment

### Option 1: Docker Deployment

1. **Build Images**
```bash
docker-compose -f docker-compose.prod.yml build
```

2. **Deploy**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Option 2: Kubernetes Deployment

1. **Create Namespace**
```bash
kubectl create namespace supplykonnect
```

2. **Apply Configurations**
```bash
kubectl apply -f k8s/
```

3. **Verify Deployment**
```bash
kubectl get pods -n supplykonnect
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgres://user:pass@host:5432/db
REDIS_URL=redis://host:6379
CONTRACT_ID=CXXXXXXX...
STELLAR_NETWORK=testnet
HOST=0.0.0.0
PORT=3001
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CONTRACT_ID=CXXXXXXX...
NEXT_PUBLIC_STELLAR_NETWORK=testnet
```

## Monitoring

- **Health Check**: `GET /health`
- **Metrics**: Prometheus endpoint at `/metrics`
- **Logs**: `docker-compose logs -f`

## Backup & Recovery

### Database Backup
```bash
docker exec supplykonnect-postgres pg_dump -U supplykonnect > backup.sql
```

### Database Restore
```bash
docker exec -i supplykonnect-postgres psql -U supplykonnect < backup.sql
```

## Security Checklist

- [ ] Change default passwords
- [ ] Enable SSL/TLS
- [ ] Configure firewall rules
- [ ] Set up rate limiting
- [ ] Enable CORS properly
- [ ] Rotate secrets regularly
- [ ] Monitor logs for suspicious activity

## Troubleshooting

### Contract Deployment Fails
- Check account has sufficient XLM
- Verify network passphrase
- Ensure WASM is optimized

### Backend Won't Start
- Check database connection
- Verify Redis is running
- Review environment variables

### Frontend Build Errors
- Clear node_modules and reinstall
- Check Node.js version (18+)
- Verify environment variables

## Support

For deployment issues:
- GitHub Issues: https://github.com/yourusername/Supply-Konnect/issues
- Email: support@supplykonnect.com

# Contributing to Supply-Konnect 🚀

Thank you for your interest in contributing to Supply-Konnect! This comprehensive guide will help you contribute effectively to our open-source supply chain tracking platform.

## 📚 Table of Contents

- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Issue Labels](#issue-labels)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Getting Help](#getting-help)

---

## 🚀 Quick Start

Supply-Konnect is a decentralized supply chain tracker built on Stellar's Soroban. It has three components:

1. **Smart Contracts** (Rust/Soroban) - On-chain logic
2. **Frontend** (Next.js 15/React 19/TypeScript) - Web UI
3. **Backend** (Rust/Axum/SQLx) - High-Performance API Server

**New contributors**: Look for issues labeled `good first issue`!

---

## 💻 Development Setup

### Prerequisites

#### Smart Contracts:
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Soroban CLI
cargo install --locked soroban-cli --features opt

# Add WASM target
rustup target add wasm32-unknown-unknown
```

#### Frontend & Backend:
- Node.js 18+ (for frontend)
- Rust 1.70+ (for backend)
- PostgreSQL 14+ (for backend database)
- Redis 6+ (for backend caching)
- npm or yarn
- Git

### Setup Instructions

```bash
# 1. Fork the repo on GitHub

# 2. Clone YOUR fork
git clone https://github.com/YOUR_USERNAME/Supply-Konnect.git
cd Supply-Konnect

# 3. Add upstream
git remote add upstream https://github.com/yourusername/Supply-Konnect.git

# 4. Smart Contracts
cd smart-contract
cargo build --target wasm32-unknown-unknown --release
cargo test

# 5. Frontend
cd ../frontend
npm install
npm run dev  # http://localhost:3000

# 6. Backend (Rust/Axum)
cd ../backend
cargo build
cargo test
cp .env.example .env
cargo run  # http://localhost:3001
```

---

## 📁 Project Structure

```
Supply-Konnect/
├── smart-contract/          # Soroban Smart Contracts
│   ├── src/
│   │   ├── lib.rs          # Contract entry point
│   │   ├── types.rs        # Data structures
│   │   ├── storage.rs      # Storage helpers
│   │   └── error.rs        # Error types
│   └── Cargo.toml
│
├── frontend/                # Next.js Application
│   ├── app/
│   │   ├── page.tsx        # Homepage
│   │   ├── register/       # Product registration
│   │   └── products/       # Product views
│   ├── components/
│   │   ├── wallet/         # Wallet components
│   │   ├── forms/          # Form components
│   │   └── ui/             # UI components
│   └── lib/
│       └── stellar/        # Stellar integration
│
├── backend/                 # Rust API Server (Axum)
│   ├── src/
│   │   ├── main.rs         # Server entry
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── models/         # Data models
│   └── Cargo.toml
│
├── docs/                    # Documentation
├── docker/                  # Docker configs
└── .github/                 # GitHub configs
```

---

## 🤝 How to Contribute

### Step-by-Step

1. **Find an Issue**
   - Browse [GitHub Issues](https://github.com/yourusername/Supply-Konnect/issues)
   - Look for `good first issue` or `help wanted`
   - Read the issue description carefully

2. **Claim the Issue**
   - Comment: "I'd like to work on this!"
   - Wait for assignment from maintainer
   - Ask questions if unclear

3. **Create Your Branch**
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/issue-23-wallet-connection
   ```

4. **Make Changes**
   - Write clean, documented code
   - Follow style guidelines
   - Add tests if applicable

5. **Test Everything**
   ```bash
   # Contracts
   cd smart-contract && cargo test
   
   # Frontend
   cd frontend && npm run build
   
   # Backend
   cd backend && cargo test
   ```

6. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: add wallet connection (#23)"
   git push origin feature/issue-23-wallet-connection
   ```

7. **Open Pull Request**
   - Go to your fork on GitHub
   - Click "Compare & pull request"
   - Fill out PR template
   - Link issue: "Closes #23"
   - Request review

8. **Address Feedback**
   - Respond to comments
   - Make requested changes
   - Push updates

---

## 🏷️ Issue Labels

| Label | Description | Difficulty |
|-------|-------------|------------|
| `good first issue` | Perfect for newcomers | ⭐ Easy |
| `help wanted` | Need contributors | ⭐⭐ Medium |
| `bug` | Something's broken | Varies |
| `enhancement` | New feature | ⭐⭐⭐ Hard |
| `documentation` | Docs work | ⭐ Easy |
| `smart-contract` | Soroban/Rust | ⭐⭐⭐ Hard |
| `frontend` | Next.js/React | ⭐⭐ Medium |
| `backend` | Rust/Axum/API | ⭐⭐ Medium |
| `testing` | Test coverage | ⭐⭐ Medium |
| `design` | UI/UX work | ⭐⭐ Medium |
| `priority: high` | Urgent | - |
| `priority: low` | Nice to have | - |

---

## 📝 Pull Request Process

### Before Submitting

1. **Run Tests**
   ```bash
   # Contracts
   cargo test && cargo clippy
   
   # Frontend
   npm run build && npm run lint
   
   # Backend
   cargo test && cargo clippy
   ```

2. **Update Docs**
   - Add/update README if needed
   - Document new features

3. **Commit Convention**
   ```
   feat: add feature
   fix: bug fix
   docs: documentation
   style: formatting
   refactor: code restructure
   test: add tests
   chore: maintenance
   ```

### PR Template

```markdown
## Description
[What does this PR do?]

## Related Issue
Closes #[issue number]

## Type
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## Testing
- [ ] Tests pass
- [ ] Manual testing done

## Screenshots
[If applicable]

## Checklist
- [ ] Code follows style guide
- [ ] Self-reviewed
- [ ] Commented complex code
- [ ] Docs updated
- [ ] Tests added
```

---

## 🎨 Code Style Guidelines

### Smart Contracts (Rust)

```rust
// Good naming
pub fn register_product() {}  ✅
pub fn reg_prod() {}  ❌

// Document public APIs
/// Registers a new product on the blockchain.
pub fn register_product() {}

// Format & lint
cargo fmt
cargo clippy
```

### Frontend (TypeScript)

```typescript
// Strict TypeScript
interface Product {
  id: string;
  name: string;
}

// Functional components
export function ProductCard({ product }: { product: Product }) {
  return <div>{product.name}</div>;
}

// Organize imports
import { useState } from 'react';           // React
import { Contract } from '@stellar/sdk';    // Packages
import { format } from '@/lib/utils';       // Local
```

### Backend (Rust)

```rust
// Async/await with Axum
async fn get_product(
    Path(id): Path<String>,
) -> Result<Json<Product>, AppError> {
    let product = fetch_product(&id).await?;
    Ok(Json(product))
}

// Error handling
match result {
    Ok(product) => Ok(Json(product)),
    Err(e) => {
        error!("Error fetching product: {:?}", e);
        Err(AppError::NotFound)
    }
}
```

---

## 🆘 Getting Help

- **GitHub Discussions**: Ask questions
- **GitHub Issues**: Report bugs
- **Discord**: Real-time chat (coming soon)
- **Email**: hello@supplykonnect.com

---

## 🎉 Recognition

Contributors are featured in:
- README contributors section
- Release notes
- Annual blog post

---

## 📋 Common Contribution Areas

### 1. Smart Contract Development
- Implement storage functions
- Add access control
- Write comprehensive tests
- Optimize gas usage

### 2. Frontend Development
- Build UI components
- Integrate wallet connection
- Create product forms
- Design timeline visualization

### 3. Backend Development
- Create API endpoints
- Implement caching
- Add rate limiting
- Write integration tests

### 4. Documentation
- Write tutorials
- Create API docs
- Add code examples
- Improve README

### 5. Testing
- Write unit tests
- Create E2E tests
- Test edge cases
- Improve coverage

### 6. Design
- Create mockups
- Improve UX
- Design icons
- Build responsive layouts

---

## 🔒 Security

If you discover a security vulnerability, please email security@supplykonnect.com instead of opening a public issue.

---

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:
- Be respectful and considerate
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

---

## 🎓 Learning Resources

### Blockchain Development
- [Soroban Documentation](https://soroban.stellar.org/docs)
- [Stellar Developer Docs](https://developers.stellar.org)
- [Rust Book](https://doc.rust-lang.org/book/)

### Frontend Development
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Backend Development
- [Axum Documentation](https://docs.rs/axum/latest/axum/)
- [SQLx Documentation](https://docs.rs/sqlx/latest/sqlx/)
- [Tokio Tutorial](https://tokio.rs/tokio/tutorial)

---

## 🌟 Thank You!

Thank you for contributing to Supply-Konnect! Together, we're building a more transparent and trustworthy supply chain ecosystem.

---

*Built with ❤️ by the Supply-Konnect community*

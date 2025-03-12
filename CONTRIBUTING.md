# How to Contribute to Skillmap

We're thrilled you want to help! Here's how to get started:

## 🚀 First-Time Contributors

1. Fork the repository

2. Clone your fork:

   ```bash
   git clone https://github.com/Incognitol07/Skillmap.git
   ```

3. Create a feature branch:

    ```bash
    git checkout -b feat/your-feature
    ```

4. Follow our Development Setup

## 🔧 Development Setup

1. Install dependencies:

    ```bash
    npm install
    ```

2. Set up database:

    ```bash
    docker-compose up -d
    npm run db:reset # If you have a reset script
    ```

3. Start dev server:

    ```bash
    npm run dev
    ```

## 📜 Coding Standards

TypeScript strict mode required

Follow Airbnb JavaScript Style Guide

Write meaningful commit messages

Include tests for new features

## 🛠️ Issue & PR Workflow

Check GitHub Issues for tasks

For bugs, use the "Bug Report" template

For features, discuss in Discussions first

Open PRs against the main branch

## 💬 Communication

Use GitHub Discussions for design debates

## 🧪 Testing

```bash
npm test # Add testing scripts when ready
```

## 📖 Documentation

Update inline JSDoc comments

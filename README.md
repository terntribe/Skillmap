# Skillmap 🗺️

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Open Source](https://badges.frapsoft.com/os/v2/open-source.svg)](CONTRIBUTING.md)

> A Google Maps-inspired learning platform with structured roadmaps and community-curated resources.

## Features

- 🛣️ Interactive skill roadmaps
- 🌐 Community-vetted resources
- 📊 Progress tracking & certifications
- 👐 Open-source contributions

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Docker (optional)

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/terntribe/Skillmap.git
   cd Skillmap
   ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Setup environment:

    ```bash
    cp .env.example .env
    ```

### Setup PostgreSQL

You can either:

1. **Spin up a PostgreSQL database using Docker**:

    ```bash
    docker-compose up -d
    ```

2. **Use a local PostgreSQL server**:

    Ensure PostgreSQL is installed and running on your machine. Create a database named `skillmap` and configure your credentials.

### Edit `.env` with your database connection details

Update the `.env` file with the appropriate connection string for your setup.

Run the app:

```bash
npm run dev
```

Visit `/docs` for API documentation.

## Contributing

We welcome contributions! Please read our [Contribution Guidelines](https://github.com/terntribe/Skillmap/blob/main/CONTRIBUTING.md) and our [Code of Conduct](https://github.com/terntribe/Skillmap/blob/main/CODE_OF_CONDUCT.md).

## License

Distributed under the MIT License. See [LICENSE](https://github.com/terntribe/Skillmap/blob/main/LICENSE) for details.

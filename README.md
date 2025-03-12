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
   git clone https://github.com/Incognitol07/Skillmap.git
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

### Edit .env with your credentials

Start PostgreSQL:

```bash
docker-compose up -d
```

Run the app:

```bash
npm run dev
```

## Contributing

We welcome contributions! Please read our [Contribution Guidelines](https://github.com/Incognitol07/Skillmap/blob/main/CONTRIBUTING.md) and our [Code of Conduct](https://github.com/Incognitol07/Skillmap/blob/main/CODE_OF_CONDUCT.md).

## License

Distributed under the MIT License. See [LICENSE](https://github.com/Incognitol07/Skillmap/blob/main/LICENSE) for details.

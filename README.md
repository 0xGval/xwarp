# XWarp - X/Twitter Advanced Search Builder

Build complex Twitter/X search queries visually with drag-and-drop blocks or natural language, powered by AI analysis.

## Features

- **Visual Block Builder** - Drag-and-drop interface to construct search queries without learning Twitter's query syntax
- **Natural Language Search** - Describe what you're looking for in plain English and get a structured query
- **AI-Powered Analysis** - Get summaries, sentiment analysis, topic extraction, and insights from search results
- **15+ Search Operators** - Keywords, users, media filters, date ranges, engagement metrics
- **Real-time Query Preview** - See the generated Twitter query as you build it

## Tech Stack

| Frontend | Backend |
|----------|---------|
| Next.js 15 | Express.js |
| React 18 | OpenAI GPT-4 |
| TypeScript | Node.js |
| Tailwind CSS | Twitter API (RapidAPI) |
| shadcn/ui | |
| dnd-kit | |

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm (recommended) or npm
- [OpenAI API key](https://platform.openai.com/api-keys)
- [RapidAPI key](https://rapidapi.com/omarmhaimdat/api/twitter154) with Twitter API subscription

### Installation

```bash
# Clone the repository
git clone https://github.com/0xGval/xwarp.git
cd xwarp

# Setup backend
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys

# Setup frontend
cd ../frontend
pnpm install
```

### Configuration

Create `backend/.env`:

```env
OPENAI_API_KEY=your-openai-key
RAPIDAPI_KEY=your-rapidapi-key
PORT=3001
```

### Run

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
xwarp/
├── backend/                 # Express.js API server
│   ├── server.js           # Entry point
│   ├── twitter.js          # API routes
│   ├── ai.js               # Tweet analysis with GPT-4
│   ├── natural-language.js # NL to query conversion
│   └── middleware/         # CORS, rate limiting, security
│
├── frontend/               # Next.js frontend
│   ├── app/               # App router pages
│   ├── components/        # React components
│   ├── lib/               # Utilities and API client
│   └── types/             # TypeScript definitions
│
└── README.md
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ai-search` | POST | Search tweets and get AI analysis |
| `/api/natural-language` | POST | Convert natural language to search query |

## Search Block Types

| Category | Blocks |
|----------|--------|
| Keywords | All words, Exact phrase, OR, Exclusions, Hashtags |
| Users | From, To, Mentions, Lists |
| Media | Images, Videos, Links, URL filter |
| Dates | Since, Until |
| Engagement | Min retweets, Min likes, Min replies, Questions |

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

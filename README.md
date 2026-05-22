# Mirror

An AI-powered self-reflection and journaling web app built with React and TypeScript. Mirror uses the OpenAI API to provide intelligent responses to your journal entries — helping you process thoughts, track emotional patterns, and gain deeper self-awareness over time.

User data is stored securely via Supabase, enabling persistent journaling sessions with a clean, animated interface.

---

## Features

- **AI-powered journaling** — write entries and receive intelligent, empathetic responses via OpenAI
- **Persistent storage** — entries and user sessions saved via Supabase backend
- **Smooth animations** — fluid transitions built with Framer Motion
- **Multi-page navigation** — structured routes via React Router
- **Responsive design** — built with Tailwind CSS

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, TypeScript, Tailwind CSS |
| AI | OpenAI API |
| Backend/Database | Supabase |
| Animations | Framer Motion |
| Routing | React Router |

---

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key
- Supabase project (URL + anon key)

### Installation

```bash
git clone https://github.com/ShadeHD/mirror.git
cd mirror
npm install
cp .env.example .env
```

Add your keys to `.env`:

```
VITE_OPENAI_API_KEY=your_openai_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```bash
npm run dev
```

---

## Author

**Fahad Hanief** — [github.com/ShadeHD](https://github.com/ShadeHD)

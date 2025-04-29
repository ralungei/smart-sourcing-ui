# Volvo AI Smart Sourcing Frontend

Next.js application providing an interface for AI-powered truck parts procurement with automated supplier selection and comparison.

## Features

- **AI-Powered Chat** - Request parts through natural language
- **Form-Based Requests** - Submit structured procurement requests
- **Request Management** - View, filter, and track requests
- **Supplier Comparison** - Compare offers based on price and delivery time
- **Notification System** - Updates when requests are assigned to suppliers

## Tech Stack

- Next.js 15 (App Router)
- Material UI 7
- Framer Motion
- React Charts

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/ralungei/volvo-ai-requests-frontend.git
cd volvo-ai-requests-frontend

# Install dependencies
npm install

# Create .env.local file with:
NEXT_PUBLIC_API_URL=http://localhost:8001
NEXT_PUBLIC_AI_AGENT_API_URL=http://localhost:8000
NEXT_PUBLIC_FORM_API_URL=http://localhost:8002
AUTH_USERNAME=your_username
AUTH_PASSWORD=your_password
```

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start

# Or with PM2
pm2 start npm --name "volvo-ui" -- start
```

## Project Structure

- `/app` - Main application code
  - `/api` - Authentication routes
  - `/components` - UI components
  - `/context` - State management
  - `/theme` - UI theming
- `/lib` - Utilities and API clients

## Backend Integration

The frontend connects to three services:

- Main API - Requests and notifications
- AI Agent API - Chat functionality
- Form API - Structured requests submission

# Docker

## Build the Docker image

docker build -t volvo-ai-frontend .

## Run the container

docker run -p 3000:3000 \
 -e NEXT_PUBLIC_API_URL=http://localhost:8001 \
 -e NEXT_PUBLIC_AI_AGENT_API_URL=http://localhost:8000 \
 -e NEXT_PUBLIC_FORM_API_URL=http://localhost:8002 \
 -e AUTH_USERNAME=your_username \
 -e AUTH_PASSWORD=your_password \
 volvo-ai-frontend

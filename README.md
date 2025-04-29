# Volvo AI Smart Sourcing Frontend

A **Next.js** application that provides an intuitive interface for **AI-powered truck parts procurement**. The system automates **supplier selection**, **communication**, and **comparison** to support optimal sourcing decisions.

---

## Features

- **AI-Powered Chat**  
  Request parts through natural language conversation.

- **Request Management**  
  View, filter, and track purchase requests.

- **Supplier Comparison**  
  Automatically compare offers based on price and delivery time.

- **Notification System**  
  Get updates when requests are assigned to suppliers.

---

## 🚀 Running in Dev

```bash
# Install dependencies
npm install

# Create your .env file with
AUTH_USERNAME=admin
AUTH_PASSWORD=password
NEXT_PUBLIC_AI_AGENT_API_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8001
NEXT_PUBLIC_FORM_API_URL=http://localhost:8002


# Run the development server
npm run dev
```

---

## Running in Production

To build and run the application in production mode:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

To run the app in the background using PM2

```bash
# If the process is already registered, restart it:
pm2 restart volvo-ui

# If it's not started yet, start it with:
pm2 start npm --name "volvo-ui" -- start

```

Make sure you have PM2 installed globally:

```bash
npm install -g pm2
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 🛠️ Technologies

- **Next.js 14 (App Router)**
- **Material UI**
- **Framer Motion** – for smooth animations
- **React Charts** – for dynamic data visualization

---

## 🔐 Environment Variables

The application requires the following environment variables to be set in your `.env.local` file:

| Variable                       | Description                         |
| ------------------------------ | ----------------------------------- |
| `AUTH_USERNAME`                | Username for basic authentication   |
| `AUTH_PASSWORD`                | Password for basic authentication   |
| `NEXT_PUBLIC_AI_AGENT_API_URL` | URL of the AI agent API service     |
| `NEXT_PUBLIC_API_URL`          | URL of the main backend API service |
| `NEXT_PUBLIC_FORM_API_URL`     | URL of the requests backend API     |

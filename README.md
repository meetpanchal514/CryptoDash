Crypto Dashboard

A full-stack cryptocurrency dashboard that displays real-time market data, including coin logos, prices, and market capitalization.

Built with React.js (frontend) and Node.js/Express (backend), it integrates the CoinGecko API and runs inside Docker containers for consistent, production-ready deployment.

✨ Features

Displays thousands of cryptocurrencies (not just top 5).

Shows logos, prices, market cap for each coin.

Pagination: 50 coins per page with Previous/Next navigation.

Responsive UI using React Bootstrap.

Backend caching (60s) to reduce API calls.

Dockerized deployment for easy setup across environments.

Debug logging for API fetches & pagination flow.

🎯 Purpose

This project was developed as a final semester project to showcase:

Full-stack web development (React + Node.js)

REST API integration (CoinGecko)

Containerized deployment (Docker Compose)

Responsive design and UI/UX optimization

🛠 Tech Stack

Frontend: React.js, React Bootstrap, Framer Motion, Axios

Backend: Node.js, Express, Axios, CORS

API: CoinGecko /coins/markets

Deployment: Docker, Docker Compose

Development: PowerShell (Windows), Node v18+

🚀 Setup & Usage
1. Clone repository
git clone <repository-url>
cd crypto-dashboard

2. Run with Docker
docker-compose up --build


Open: http://localhost:3000

Stop:

docker-compose down

3. Run locally (without Docker)

Backend:

cd backend
npm install
node index.js


Frontend:

cd frontend
npm install
npm start

🔧 Troubleshooting

Only 5 coins showing → ensure backend per_page=250 and pagination loop is correct.

Logos not displaying → check image URL field in API response.

API rate limits (429 errors) → add a CoinGecko API key to backend/.env.

Docker conflicts → free up ports 3000/5000 before starting.

📈 Future Enhancements

Search filter for coins

Sorting by price, market cap, or name

Interactive charts (Chart.js)

Virtualized lists for better performance

Production deployment with Nginx

👤 Author

Aryan Panchal
📧 your-email@example.com

🔗 GitHub: your-profile

# Crypto-dashboard
Crypto currency dashboard

Crypto Dashboard

Crypto Dashboard is a web application that displays real-time data for all cryptocurrencies, including their logos, prices, and market capitalization, sourced from the CoinGecko API. Built with React.js for the frontend and Node.js/Express for the backend, it uses Docker for easy deployment and features a responsive, paginated UI to browse thousands of cryptocurrencies.

This project was developed as a final semester project to demonstrate full-stack development skills, API integration, and containerized deployment.

Features





All Cryptocurrencies: Fetches data for thousands of cryptocurrencies, not limited to the top 5.



Coin Logos: Displays each cryptocurrency's logo alongside its name, price, and market cap.



Pagination: Shows 50 coins per page with "Previous" and "Next" buttons for navigation.



Responsive UI: Built with React Bootstrap for a mobile-friendly layout.



Caching: Backend caches API responses for 60 seconds to reduce CoinGecko API calls.



Dockerized: Runs frontend (React) and backend (Node.js) in Docker containers for consistent deployment.



Debug Logging: Includes console logs for debugging API fetches and pagination.

Tech Stack





Frontend: React.js, React Bootstrap, Framer Motion, Axios



Backend: Node.js, Express, Axios, CORS



API: CoinGecko /coins/markets endpoint



Containerization: Docker, Docker Compose



Environment: PowerShell (Windows) for development and deployment



Other: Bootstrap CSS, custom styles

Prerequisites





Node.js (v18 or higher)



Docker Desktop (with Docker Compose)



PowerShell (Windows)



Internet connection for CoinGecko API access

Setup Instructions

Clone the Repository

git clone <repository-url>
cd ceypto-dashbord

Directory Structure

ceypto-dashbord/
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── NavbarComponent.js
│   │   │   └── Footer.js
│   │   ├── App.js
│   │   └── App.css
│   ├── public/
│   │   ├── css/
│   │   │   ├── bootstrap.min.css
│   │   │   └── style.css
│   │   └── index.html
│   ├── package.json
│   ├── Dockerfile
│   ├── .env
│   └── .dockerignore
├── docker-compose.yml
└── README.md

Option 1: Run with Docker





Ensure Docker Desktop is running:

docker --version
docker-compose --version



Free ports 3000 (frontend) and 5000 (backend):

netstat -aon | findstr :3000
netstat -aon | findstr :5000
taskkill /PID <PID> /F



Build and start containers:

docker-compose up --build



Access the app:





Open http://localhost:3000 in your browser.



Check logs for debugging:

docker logs backend
docker logs frontend



Stop containers:

docker-compose down

Option 2: Run Locally





Backend Setup:

cd backend
npm install
node index.js





Verify: Backend running on port 5000.



Test API: Invoke-RestMethod -Uri http://localhost:5000/api/crypto-summary.



Frontend Setup:

cd frontend
npm install
npm start





Opens http://localhost:3000 automatically.



Stop servers: Press Ctrl+C in each terminal.

Environment Variables





Backend (backend/.env):

PORT=5000
COINGECKO_API_URL=https://api.coingecko.com/api/v3
# Optional: COINGECKO_API_KEY=your_api_key



Frontend (frontend/.env):

REACT_APP_API_URL=http://backend:5000



Frontend (development) (frontend/.env.development):

REACT_APP_API_URL=http://localhost:5000

Usage





Open the Dashboard:





Navigate to http://localhost:3000.



See a list of 50 cryptocurrencies per page, each with a logo, name, price, and market cap.



Pagination:





Use "Previous" and "Next" buttons to navigate pages.



Total coins and pages are displayed (e.g., "All Cryptocurrencies (1234)", "Page 1 of 25").



Debugging:





Open browser console (F12) to check:





Backend response, coins: Z (should be > 1000).



Switched to page: X when clicking pagination buttons.



Check Network tab for /api/crypto-summary response.

Troubleshooting





Only 5 coins displayed:





Verify backend/index.js has per_page: 250 and pagination loop.



Clear backend cache:

Invoke-RestMethod -Uri "http://localhost:5000/api/crypto-summary?nocache=true"



Check frontend logs: docker logs frontend for Backend response, coins: Z.



Pagination buttons not working:





Ensure frontend/src/components/Dashboard.js has correct handleNextPage and handlePrevPage.



Check browser console for Switched to page: X logs.



Verify coinsPerPage = 50 in Dashboard.js.



Logos not displaying:





Confirm image field in API response:

(Invoke-RestMethod -Uri "http://localhost:5000/api/crypto-summary?nocache=true").coingecko[0].image



Check browser Network tab for image URL errors (404, CORS).



CoinGecko rate limits (429 errors):





Add a CoinGecko API key to backend/.env and update index.js (see code comments).



Increase delay in index.js (e.g., setTimeout(resolve, 2000)).



Docker issues:





Run PowerShell as Administrator:

Start-Process powershell -Verb RunAs



Clear containers:

docker ps -a
docker rm backend frontend -f

Future Enhancements





Search Filter: Add a search bar to filter coins by name.



Charts: Integrate Chart.js for price or market cap visualizations.



Sorting: Allow sorting by price, market cap, or name.



Virtualized List: Use react-window for better performance with large lists.



Production Deployment: Use Nginx for frontend in production.

Contributing

Contributions are welcome! Please:





Fork the repository.



Create a feature branch (git checkout -b feature/YourFeature).



Commit changes (git commit -m 'Add YourFeature').



Push to the branch (git push origin feature/YourFeature).



Open a Pull Request.

Contact





Author: Aryan Panchal



Email: your-email@example.com



GitHub:

License

This project is licensed under the MIT License.
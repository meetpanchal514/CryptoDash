// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// function Dashboard() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [retryCount, setRetryCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hoveredCoin, setHoveredCoin] = useState(null);
//   const coinsPerPage = 9;

//   const fetchData = async () => {
//     try {
//       console.log('Fetching coin data from /coins...');
//       const response = await axios.get('/coins', { timeout: 5000 });
//       console.log('Successfully fetched coin data:', response.data);
//       setData(response.data);
//       setError(null);
//       setCurrentPage(1);
//     } catch (error) {
//       console.error('Failed to fetch coin data:', error.message, error.response);
//       setError(`Network error: ${error.message}. Please check your connection or retry.`);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleRetry = () => {
//     setRetryCount(retryCount + 1);
//     fetchData();
//   };

//   const totalCoins = data ? data.coins.length : 0;
//   const totalPages = Math.max(1, Math.ceil(totalCoins / coinsPerPage));
//   const indexOfLastCoin = currentPage * coinsPerPage;
//   const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
//   const currentCoins = data ? data.coins.slice(indexOfFirstCoin, indexOfLastCoin) : [];

//   const handlePageChange = (pageNumber) => {
//     const newPage = Math.min(Math.max(1, pageNumber), totalPages);
//     setCurrentPage(newPage);
//     window.scrollTo(0, 0);
//   };

//   // Helper function to format date from YYYY-MM-DD to MM/DD
//   const formatDate = (dateString) => {
//     const [, month, day] = dateString.split('-'); // Ignore the year by using a comma
//     return `${month}/${day}`;
//   };

//   const getChartData = (coin) => ({
//     labels: Array.isArray(coin.historical_prices)
//       ? coin.historical_prices.map(price => formatDate(price.date))
//       : [],
//     datasets: [
//       {
//         label: 'Price (USD)',
//         data: Array.isArray(coin.historical_prices)
//           ? coin.historical_prices.map(price => price.price)
//           : [],
//         borderColor: 'var(--chart-line-color)',
//         backgroundColor: 'var(--chart-fill-color)',
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   });

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       title: {
//         display: true,
//         text: 'Price Variation (Last 7 Days)',
//         color: 'var(--text-color)',
//         font: { size: 12, family: "'Inter', sans-serif", weight: 500 },
//         padding: { top: 5, bottom: 5 },
//       },
//       tooltip: {
//         titleColor: 'var(--text-color)',
//         bodyColor: 'var(--text-color)',
//         backgroundColor: 'var(--card-background)',
//         borderColor: 'var(--border-color)',
//         borderWidth: 1,
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: 'var(--text-color)',
//           font: { size: 10 },
//           maxTicksLimit: 7,
//         },
//         grid: { display: false },
//         title: {
//           display: true,
//           text: 'Date',
//           color: 'var(--text-color)',
//           font: { size: 10, family: "'Inter', sans-serif" },
//           padding: { top: 5 },
//         },
//       },
//       y: {
//         ticks: {
//           color: 'var(--text-color)',
//           font: { size: 10 },
//           callback: (value) => `$${value}`,
//         },
//         grid: {
//           color: 'var(--border-color)',
//           borderDash: [5, 5],
//         },
//         title: {
//           display: true,
//           text: 'Price (USD)',
//           color: 'var(--text-color)',
//           font: { size: 10, family: "'Inter', sans-serif" },
//           padding: { bottom: 5 },
//         },
//       },
//     },
//   };

//   const pageVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
//   };

//   const buttonVariants = {
//     hover: { scale: 1.05, transition: { duration: 0.3 } },
//     tap: { scale: 0.95 },
//   };

//   const cardVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//     hover: { scale: 1.02 },
//   };

//   const contentVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//   };

//   if (error) {
//     return (
//       <div className="flex flex-col justify-center items-center py-8">
//         <motion.div className="text-center px-4" initial="hidden" animate="visible" variants={pageVariants}>
//           <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-color)' }}>
//             Cryptocurrencies
//           </h2>
//           <div className="bg-opacity-90 backdrop-blur-md rounded-lg p-6 shadow-lg max-w-md text-center" style={{ backgroundColor: 'var(--card-background)' }}>
//             <p className="mb-4" style={{ color: 'var(--error-text)' }}>{error}</p>
//             <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
//               <button
//                 className="font-semibold py-2 px-4 rounded-full transition-colors"
//                 style={{
//                   backgroundColor: 'var(--button-bg)',
//                   color: 'var(--button-text)',
//                 }}
//                 onClick={handleRetry}
//                 onMouseEnter={(e) => (e.target.style.backgroundColor = 'var(--button-bg-hover)')}
//                 onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--button-bg)')}
//               >
//                 Retry (Attempt {retryCount + 1})
//               </button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     );
//   }

//   if (!data) return (
//     <div className="flex flex-col justify-center items-center py-8">
//       <motion.div className="text-center px-4" initial="hidden" animate="visible" variants={pageVariants}>
//         <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-color)' }}>
//           Cryptocurrencies
//         </h2>
//         <p style={{ color: 'var(--text-color-secondary)' }}>Loading...</p>
//       </motion.div>
//     </div>
//   );

//   return (
//     <div className="flex flex-col items-center py-8">
//       <motion.div className="text-center px-4 max-w-7xl mx-auto w-full" initial="hidden" animate="visible" variants={pageVariants}>
//         <h2 className="text-6xl md:text-8xl font-bold mb-12 tracking-tight pb-10" style={{ color: 'var(--text-color)' }}>
//           Cryptocurrencies
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
//           {currentCoins.length > 0 ? (
//             currentCoins.map((coin) => (
//               <div key={coin.id}>
//                 <motion.div
//                   className="card-3d bg-opacity-70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-56"
//                   variants={cardVariants}
//                   initial="initial"
//                   animate="animate"
//                   whileHover="hover"
//                   onMouseEnter={() => setHoveredCoin(coin.id)}
//                   onMouseLeave={() => setHoveredCoin(null)}
//                   style={{ backgroundColor: 'var(--card-background)' }}
//                 >
//                   {hoveredCoin === coin.id ? (
//                     <motion.div
//                       key="chart"
//                       variants={contentVariants}
//                       initial="hidden"
//                       animate="visible"
//                       className="h-full flex flex-col"
//                     >
//                       <div className="flex flex-col items-center">
//                         <h4 className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>{coin.name}</h4>
//                         <p className="text-sm mt-1" style={{ color: 'var(--text-color-secondary)' }}>
//                           Current Price: ${coin.current_price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
//                         </p>
//                       </div>
//                       <div className="flex-1 mt-2 min-h-0">
//                         {Array.isArray(coin.historical_prices) && coin.historical_prices.length > 0 ? (
//                           <Line data={getChartData(coin)} options={chartOptions} />
//                         ) : (
//                           <div className="h-full flex items-center justify-center" style={{ color: 'var(--text-color-secondary)' }}>
//                             Sorry, no historical data available.
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   ) : (
//                     <motion.div
//                       key="info"
//                       variants={contentVariants}
//                       initial="hidden"
//                       animate="visible"
//                       className="h-full flex flex-col justify-center items-center"
//                     >
//                       <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
//                         {coin.name}
//                       </h3>
//                       <p className="text-lg" style={{ color: 'var(--text-color-secondary)' }}>
//                         ${coin.current_price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
//                       </p>
//                       <p className="text-sm mt-1" style={{ color: 'var(--text-color-secondary)' }}>
//                         Market Cap: ${coin.market_cap.toLocaleString('en-US')}
//                       </p>
//                     </motion.div>
//                   )}
//                 </motion.div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center" style={{ color: 'var(--text-color-secondary)' }}>
//               No coins available on this page.
//             </div>
//           )}
//         </div>

//         {totalPages > 1 && (
//           <div className="flex justify-center mt-12 space-x-2">
//             <motion.button
//               className="font-semibold py-2 px-4 rounded-full disabled:opacity-50 transition-colors"
//               disabled={currentPage === 1}
//               onClick={() => handlePageChange(currentPage - 1)}
//               style={{
//                 backgroundColor: currentPage === 1 ? 'var(--pagination-bg)' : 'var(--pagination-bg)',
//                 color: currentPage === 1 ? 'var(--pagination-text)' : 'var(--pagination-text)',
//                 cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//               }}
//               onMouseEnter={(e) => {
//                 if (currentPage !== 1) {
//                   e.target.style.backgroundColor = 'var(--pagination-bg-active)';
//                   e.target.style.color = 'var(--pagination-text-active)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (currentPage !== 1) {
//                   e.target.style.backgroundColor = 'var(--pagination-bg)';
//                   e.target.style.color = 'var(--pagination-text)';
//                 }
//               }}
//               variants={buttonVariants}
//               whileHover={currentPage === 1 ? {} : "hover"}
//               whileTap={currentPage === 1 ? {} : "tap"}
//             >
//               Previous
//             </motion.button>

//             {[...Array(totalPages)].map((_, i) => (
//               <motion.button
//                 key={i + 1}
//                 className="font-semibold py-2 px-4 rounded-full transition-colors"
//                 onClick={() => handlePageChange(i + 1)}
//                 style={{
//                   backgroundColor: i + 1 === currentPage ? 'var(--pagination-bg-active)' : 'var(--pagination-bg)',
//                   color: i + 1 === currentPage ? 'var(--pagination-text-active)' : 'var(--pagination-text)',
//                 }}
//                 onMouseEnter={(e) => {
//                   if (i + 1 !== currentPage) {
//                     e.target.style.backgroundColor = 'var(--pagination-bg-active)';
//                     e.target.style.color = 'var(--pagination-text-active)';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (i + 1 !== currentPage) {
//                     e.target.style.backgroundColor = 'var(--pagination-bg)';
//                     e.target.style.color = 'var(--pagination-text)';
//                   }
//                 }}
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 {i + 1}
//               </motion.button>
//             ))}

//             <motion.button
//               className="font-semibold py-2 px-4 rounded-full disabled:opacity-50 transition-colors"
//               disabled={currentPage === totalPages}
//               onClick={() => handlePageChange(currentPage + 1)}
//               style={{
//                 backgroundColor: currentPage === totalPages ? 'var(--pagination-bg)' : 'var(--pagination-bg)',
//                 color: currentPage === totalPages ? 'var(--pagination-text)' : 'var(--pagination-text)',
//                 cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
//               }}
//               onMouseEnter={(e) => {
//                 if (currentPage !== totalPages) {
//                   e.target.style.backgroundColor = 'var(--pagination-bg-active)';
//                   e.target.style.color = 'var(--pagination-text-active)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (currentPage !== totalPages) {
//                   e.target.style.backgroundColor = 'var(--pagination-bg)';
//                   e.target.style.color = 'var(--pagination-text)';
//                 }
//               }}
//               variants={buttonVariants}
//               whileHover={currentPage === totalPages ? {} : "hover"}
//               whileTap={currentPage === totalPages ? {} : "tap"}
//             >
//               Next
//             </motion.button>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }

// export default Dashboard;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCoin, setHoveredCoin] = useState(null);
  const [sortOption, setSortOption] = useState('market_cap_desc');
  const [searchTerm, setSearchTerm] = useState('');
  const coinsPerPage = 9;

  const fetchData = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const fullUrl = `${apiUrl}/coins`;
      console.log(`Fetching coin data from ${fullUrl}...`);
      const response = await axios.get(fullUrl, { timeout: 20000 });
      console.log('Successfully fetched coin data:', response.data);
      setData(response.data);
      setError(null);
      setCurrentPage(1);
    } catch (error) {
      console.error('Failed to fetch coin data:', error.message, error.response);
      setError(`Network error: ${error.message}. Please check your connection or retry.`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRetry = () => {
    setRetryCount(retryCount + 1);
    fetchData();
  };

  const filteredAndSortedCoins = () => {
    let coins = data ? [...data.coins] : [];

    if (searchTerm) {
      coins = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case 'market_cap_desc':
        coins.sort((a, b) => b.market_cap - a.market_cap);
        break;
      case 'market_cap_asc':
        coins.sort((a, b) => a.market_cap - b.market_cap);
        break;
      case 'price_desc':
        coins.sort((a, b) => b.current_price - a.current_price);
        break;
      case 'price_asc':
        coins.sort((a, b) => a.current_price - b.current_price);
        break;
      case 'name_asc':
        coins.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        coins.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return coins;
  };

  const totalCoins = filteredAndSortedCoins().length;
  const totalPages = Math.max(1, Math.ceil(totalCoins / coinsPerPage));
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredAndSortedCoins().slice(indexOfFirstCoin, indexOfLastCoin);

  const handlePageChange = (pageNumber) => {
    const newPage = Math.min(Math.max(1, pageNumber), totalPages);
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    const [, month, day] = dateString.split('-');
    return `${month}/${day}`;
  };

  const getChartData = (coin) => ({
    labels: Array.isArray(coin.historical_prices)
      ? coin.historical_prices.map(price => formatDate(price.date))
      : [],
    datasets: [
      {
        label: 'Price (USD)',
        data: Array.isArray(coin.historical_prices)
          ? coin.historical_prices.map(price => price.price)
          : [],
        borderColor: 'var(--chart-line-color)',
        backgroundColor: 'var(--chart-fill-color)',
        fill: true,
        tension: 0.4,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Price Variation (Last 7 Days)',
        color: 'var(--text-color)',
        font: { size: 12, family: "'Inter', sans-serif", weight: 500 },
        padding: { top: 5, bottom: 5 },
      },
      tooltip: {
        titleColor: 'var(--text-color)',
        bodyColor: 'var(--text-color)',
        backgroundColor: 'var(--card-background)',
        borderColor: 'var(--border-color)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'var(--text-color)',
          font: { size: 10 },
          maxTicksLimit: 7,
        },
        grid: { display: false },
        title: {
          display: true,
          text: 'Date',
          color: 'var(--text-color)',
          font: { size: 10, family: "'Inter', sans-serif" },
          padding: { top: 5 },
        },
      },
      y: {
        ticks: {
          color: 'var(--text-color)',
          font: { size: 10 },
          callback: (value) => `$${value}`,
        },
        grid: {
          color: 'var(--border-color)',
          borderDash: [5, 5],
        },
        title: {
          display: true,
          text: 'Price (USD)',
          color: 'var(--text-color)',
          font: { size: 10, family: "'Inter', sans-serif" },
          padding: { bottom: 5 },
        },
      },
    },
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.02 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center py-8">
        <motion.div className="text-center px-4" initial="hidden" animate="visible" variants={pageVariants}>
          <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-color)' }}>
            Cryptocurrencies
          </h2>
          <div className="bg-opacity-90 backdrop-blur-md rounded-lg p-6 shadow-lg max-w-md text-center" style={{ backgroundColor: 'var(--card-background)' }}>
            <p className="mb-4" style={{ color: 'var(--error-text)' }}>{error}</p>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <button
                className="font-semibold py-2 px-4 rounded-full transition-colors"
                style={{
                  backgroundColor: 'var(--button-bg)',
                  color: 'var(--button-text)',
                }}
                onClick={handleRetry}
                onMouseEnter={(e) => (e.target.style.backgroundColor = 'var(--button-bg-hover)')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--button-bg)')}
              >
                Retry (Attempt {retryCount + 1})
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!data) return (
    <div className="flex flex-col justify-center items-center py-8">
      <motion.div className="text-center px-4" initial="hidden" animate="visible" variants={pageVariants}>
        <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-color)' }}>
          Cryptocurrencies
        </h2>
        <p style={{ color: 'var(--text-color-secondary)' }}>Loading...</p>
      </motion.div>
    </div>
  );

  return (
    <div className="flex flex-col items-center py-8">
      <motion.div className="text-center px-4 max-w-7xl mx-auto w-full" initial="hidden" animate="visible" variants={pageVariants}>
        <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-color)' }}>
          Cryptocurrencies
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 px-4 space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search coins by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: 'var(--card-background)',
              color: 'var(--text-color)',
              borderColor: 'var(--border-color)',
            }}
          />
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" style={{ color: 'var(--text-color)' }}>
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: 'var(--card-background)',
                color: 'var(--text-color)',
                borderColor: 'var(--border-color)',
              }}
            >
              <option value="market_cap_desc">Popularity (High to Low)</option>
              <option value="market_cap_asc">Popularity (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
              <option value="price_asc">Price (Low to High)</option>
              <option value="name_asc">Name (A to Z)</option>
              <option value="name_desc">Name (Z to A)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
          {currentCoins.length > 0 ? (
            currentCoins.map((coin) => (
              <div key={coin.id}>
                <motion.div
                  className="card-3d bg-opacity-70 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-56"
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  onMouseEnter={() => setHoveredCoin(coin.id)}
                  onMouseLeave={() => setHoveredCoin(null)}
                  style={{ backgroundColor: 'var(--card-background)' }}
                >
                  {hoveredCoin === coin.id ? (
                    <motion.div
                      key="chart"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      className="h-full flex flex-col"
                    >
                      <div className="flex flex-col items-center">
                        <h4 className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>{coin.name}</h4>
                        <p className="text-sm mt-1" style={{ color: 'var(--text-color-secondary)' }}>
                          Current Price: ${coin.current_price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="flex-1 mt-2 min-h-0">
                        {Array.isArray(coin.historical_prices) && coin.historical_prices.length > 0 ? (
                          <Line data={getChartData(coin)} options={chartOptions} />
                        ) : (
                          <div className="h-full flex items-center justify-center" style={{ color: 'var(--text-color-secondary)' }}>
                            Sorry, no historical data available.
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="info"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      className="h-full flex flex-col justify-center items-center"
                    >
                      <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                        {coin.name}
                      </h3>
                      <p className="text-lg" style={{ color: 'var(--text-color-secondary)' }}>
                        ${coin.current_price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-color-secondary)' }}>
                        Market Cap: ${coin.market_cap.toLocaleString('en-US')}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center" style={{ color: 'var(--text-color-secondary)' }}>
              No coins match your search criteria.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            <motion.button
              className="font-semibold py-2 px-4 rounded-full disabled:opacity-50 transition-colors"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              style={{
                backgroundColor: currentPage === 1 ? 'var(--pagination-bg)' : 'var(--pagination-bg)',
                color: currentPage === 1 ? 'var(--pagination-text)' : 'var(--pagination-text)',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 1) {
                  e.target.style.backgroundColor = 'var(--pagination-bg-active)';
                  e.target.style.color = 'var(--pagination-text-active)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 1) {
                  e.target.style.backgroundColor = 'var(--pagination-bg)';
                  e.target.style.color = 'var(--pagination-text)';
                }
              }}
              variants={buttonVariants}
              whileHover={currentPage === 1 ? {} : "hover"}
              whileTap={currentPage === 1 ? {} : "tap"}
            >
              Previous
            </motion.button>

            {[...Array(totalPages)].map((_, i) => (
              <motion.button
                key={i + 1}
                className="font-semibold py-2 px-4 rounded-full transition-colors"
                onClick={() => handlePageChange(i + 1)}
                style={{
                  backgroundColor: i + 1 === currentPage ? 'var(--pagination-bg-active)' : 'var(--pagination-bg)',
                  color: i + 1 === currentPage ? 'var(--pagination-text-active)' : 'var(--pagination-text)',
                }}
                onMouseEnter={(e) => {
                  if (i + 1 !== currentPage) {
                    e.target.style.backgroundColor = 'var(--pagination-bg-active)';
                    e.target.style.color = 'var(--pagination-text-active)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (i + 1 !== currentPage) {
                    e.target.style.backgroundColor = 'var(--pagination-bg)';
                    e.target.style.color = 'var(--pagination-text)';
                  }
                }}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {i + 1}
              </motion.button>
            ))}

            <motion.button
              className="font-semibold py-2 px-4 rounded-full disabled:opacity-50 transition-colors"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              style={{
                backgroundColor: currentPage === totalPages ? 'var(--pagination-bg)' : 'var(--pagination-bg)',
                color: currentPage === totalPages ? 'var(--pagination-text)' : 'var(--pagination-text)',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages) {
                  e.target.style.backgroundColor = 'var(--pagination-bg-active)';
                  e.target.style.color = 'var(--pagination-text-active)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== totalPages) {
                  e.target.style.backgroundColor = 'var(--pagination-bg)';
                  e.target.style.color = 'var(--pagination-text)';
                }
              }}
              variants={buttonVariants}
              whileHover={currentPage === totalPages ? {} : "hover"}
              whileTap={currentPage === totalPages ? {} : "tap"}
            >
              Next
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Dashboard;
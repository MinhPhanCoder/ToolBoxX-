import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RefreshCwIcon, TrendingUpIcon, TrendingDownIcon, DollarSignIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
// Mock data for gold prices
const generateMockData = () => {
  const data = [];
  const today = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    // Generate a realistic gold price between 1800 and 2000
    const basePrice = 1900;
    const variation = Math.random() * 100 - 50; // Random value between -50 and 50
    const price = basePrice + variation;
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2))
    });
  }
  return data;
};
const GoldTracker = () => {
  const {
    t
  } = useLanguage();
  const [goldData, setGoldData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('1M'); // 1D, 1W, 1M, 3M, 1Y
  useEffect(() => {
    // In a real app, we would fetch data from an API
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setGoldData(generateMockData());
      } catch (error) {
        console.error('Error fetching gold data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [timeRange]);
  const currentPrice = goldData.length > 0 ? goldData[goldData.length - 1].price : 0;
  const previousPrice = goldData.length > 1 ? goldData[goldData.length - 2].price : 0;
  const priceChange = currentPrice - previousPrice;
  const percentageChange = priceChange / previousPrice * 100;
  const isPositive = priceChange >= 0;
  const timeRangeOptions = [{
    value: '1D',
    label: '1D'
  }, {
    value: '1W',
    label: '1W'
  }, {
    value: '1M',
    label: '1M'
  }, {
    value: '3M',
    label: '3M'
  }, {
    value: '1Y',
    label: '1Y'
  }];
  return <div className="w-full">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('goldTracker')}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track the latest gold prices and historical trends.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button onClick={() => setGoldData(generateMockData())} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <RefreshCwIcon size={16} className="mr-2" />
            Refresh Data
          </button>
        </div>
      </div>
      {/* Price Summary Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-500">Current Gold Price (USD/oz)</p>
            <div className="flex items-center mt-1">
              <DollarSignIcon size={24} className="text-yellow-500 mr-2" />
              <span className="text-3xl font-bold">
                ${currentPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-500">24h Change</p>
            <div className={`flex items-center mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUpIcon size={20} className="mr-1" /> : <TrendingDownIcon size={20} className="mr-1" />}
              <span className="text-xl font-semibold">
                ${Math.abs(priceChange).toFixed(2)}
              </span>
              <span className="ml-1 text-xl font-semibold">
                ({Math.abs(percentageChange).toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Chart Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-gray-700">Price History</div>
        <div className="flex space-x-1">
          {timeRangeOptions.map(option => <button key={option.value} onClick={() => setTimeRange(option.value)} className={`px-3 py-1 text-sm rounded-md ${timeRange === option.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {option.label}
            </button>)}
        </div>
      </div>
      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm h-80">
        {isLoading ? <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div> : <ResponsiveContainer width="100%" height="100%">
            <LineChart data={goldData} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{
            fontSize: 12
          }} tickFormatter={value => {
            const date = new Date(value);
            return date.getDate() + '/' + (date.getMonth() + 1);
          }} />
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} tick={{
            fontSize: 12
          }} tickFormatter={value => `$${value}`} />
              <Tooltip formatter={value => [`$${value}`, 'Price']} labelFormatter={label => {
            const date = new Date(label);
            return date.toLocaleDateString();
          }} />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#FFD700" strokeWidth={2} dot={false} activeDot={{
            r: 6
          }} name="Gold Price (USD/oz)" />
            </LineChart>
          </ResponsiveContainer>}
      </div>
      {/* Market Insights */}
      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Market Insights
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Market Summary
              </h3>
              <p className="text-sm text-gray-600">
                Gold prices have {isPositive ? 'increased' : 'decreased'} by{' '}
                {Math.abs(percentageChange).toFixed(2)}% in the last 24 hours.
                The market is showing {isPositive ? 'positive' : 'negative'}{' '}
                momentum with increased trading volume.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Factors Affecting Price
              </h3>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>US Dollar strength</li>
                <li>Inflation concerns</li>
                <li>Central bank policies</li>
                <li>Geopolitical tensions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Forecast
              </h3>
              <p className="text-sm text-gray-600">
                Analysts predict gold prices may{' '}
                {Math.random() > 0.5 ? 'continue to rise' : 'face resistance'}{' '}
                in the coming weeks due to
                {Math.random() > 0.5 ? ' economic uncertainty' : ' market stabilization'}{' '}
                and investor sentiment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default GoldTracker;
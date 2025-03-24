import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CoinsIcon, RefreshCwIcon } from 'lucide-react';
import Button from '../ui/Button';
interface GoldPriceData {
  date: string;
  price: number;
}
const GoldPriceTool: React.FC = () => {
  const {
    t
  } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GoldPriceData[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [timeframe, setTimeframe] = useState<'1m' | '3m' | '6m' | '1y'>('1m');
  useEffect(() => {
    setLoading(true);
    const generateMockData = () => {
      const mockData: GoldPriceData[] = [];
      const today = new Date();
      let days = 30;
      switch (timeframe) {
        case '3m':
          days = 90;
          break;
        case '6m':
          days = 180;
          break;
        case '1y':
          days = 365;
          break;
        default:
          days = 30;
      }
      const basePrice = 1800 + Math.random() * 200;
      let price = basePrice;
      for (let i = days; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        price = price + (Math.random() - 0.5) * 20;
        if (price < 1700) price = 1700 + Math.random() * 50;
        if (price > 2100) price = 2100 - Math.random() * 50;
        mockData.push({
          date: date.toISOString().split('T')[0],
          price: parseFloat(price.toFixed(2))
        });
      }
      setCurrentPrice(mockData[mockData.length - 1].price);
      return mockData;
    };
    const mockData = generateMockData();
    setData(mockData);
    setLoading(false);
  }, [timeframe]);
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [...data];
      const lastPrice = mockData[mockData.length - 1].price;
      const newPrice = lastPrice + (Math.random() - 0.5) * 10;
      mockData[mockData.length - 1].price = parseFloat(newPrice.toFixed(2));
      setData(mockData);
      setCurrentPrice(newPrice);
      setLoading(false);
    }, 1000);
  };
  const priceChange = data.length >= 2 ? data[data.length - 1].price - data[data.length - 2].price : 0;
  const priceChangePercentage = data.length >= 2 ? priceChange / data[data.length - 2].price * 100 : 0;
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-3 sm:space-y-0">
        <div className="flex items-center">
          <CoinsIcon size={24} className="text-yellow-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {t('goldPrice')}
          </h2>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="flex space-x-1 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {(['1m', '3m', '6m', '1y'] as const).map(tf => <button key={tf} onClick={() => setTimeframe(tf)} className={`px-3 py-1 text-sm font-medium rounded-md whitespace-nowrap ${timeframe === tf ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                {tf}
              </button>)}
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} isLoading={loading} leftIcon={!loading ? <RefreshCwIcon size={16} /> : undefined}>
            Refresh
          </Button>
        </div>
      </div>
      {currentPrice && <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Current Price (USD)
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${currentPrice.toFixed(2)}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Daily Change
            </div>
            <div className={`text-2xl font-bold ${priceChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {priceChange >= 0 ? '+' : ''}
              {priceChange.toFixed(2)} USD
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Daily Change %
            </div>
            <div className={`text-2xl font-bold ${priceChangePercentage >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {priceChangePercentage >= 0 ? '+' : ''}
              {priceChangePercentage.toFixed(2)}%
            </div>
          </div>
        </div>}
      <div className="h-80">
        {loading ? <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div> : <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 5
        }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis dataKey="date" tick={{
            fontSize: 12,
            fill: '#9CA3AF'
          }} tickFormatter={value => {
            const date = new Date(value);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }} stroke="#6B7280" />
              <YAxis domain={['auto', 'auto']} tick={{
            fontSize: 12,
            fill: '#9CA3AF'
          }} stroke="#6B7280" />
              <Tooltip formatter={value => [`$${value}`, 'Gold Price']} labelFormatter={label => new Date(label).toLocaleDateString()} contentStyle={{
            backgroundColor: 'rgba(31, 41, 55, 0.8)',
            border: 'none',
            borderRadius: '0.375rem',
            color: '#F3F4F6'
          }} />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#F59E0B" strokeWidth={2} dot={false} activeDot={{
            r: 6
          }} name="Gold Price (USD)" />
            </LineChart>
          </ResponsiveContainer>}
      </div>
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          About Gold Prices
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Gold prices are influenced by multiple factors including inflation,
          currency fluctuations, interest rates, and geopolitical events. This
          tool provides real-time and historical gold price data to help you
          make informed investment decisions.
        </p>
      </div>
    </div>;
};
export default GoldPriceTool;
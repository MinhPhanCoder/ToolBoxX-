import React, { useEffect, useState } from 'react';
import { TicketIcon, CalendarIcon, FilterIcon, RefreshCwIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
// Mock lottery data generator
const generateLotteryData = () => {
  const lotteryTypes = ['Powerball', 'Mega Millions', 'State Lottery', 'Daily Draw', 'Lucky Numbers'];
  const results = [];
  for (let i = 0; i < 20; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const lotteryType = lotteryTypes[Math.floor(Math.random() * lotteryTypes.length)];
    const numbers = Array.from({
      length: 6
    }, () => Math.floor(Math.random() * 99) + 1).sort((a, b) => a - b);
    const jackpot = Math.floor(Math.random() * 900) + 100; // Between $100M and $999M
    results.push({
      id: i + 1,
      date: date.toISOString().split('T')[0],
      type: lotteryType,
      numbers,
      jackpot: `$${jackpot}M`,
      winner: Math.random() > 0.8 // 20% chance of having a winner
    });
  }
  return results;
};
const LotteryResults = () => {
  const {
    t
  } = useLanguage();
  const [lotteryData, setLotteryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLotteryData(generateLotteryData());
      } catch (error) {
        console.error('Error fetching lottery data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLotteryData(generateLotteryData());
      setIsLoading(false);
    }, 1000);
  };
  const filteredData = lotteryData.filter(lottery => filter === 'all' || lottery.type === filter).filter(lottery => lottery.type.toLowerCase().includes(searchTerm.toLowerCase()) || lottery.date.includes(searchTerm));
  const lotteryTypes = ['all', ...new Set(lotteryData.map(lottery => lottery.type))];
  return <div className="w-full">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('lotteryResults')}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View the latest lottery results and historical winning numbers.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button onClick={refreshData} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700" disabled={isLoading}>
            <RefreshCwIcon size={16} className="mr-2" />
            Refresh Results
          </button>
        </div>
      </div>
      {/* Featured Result */}
      {lotteryData.length > 0 && <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border-l-4 border-green-500">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center">
                <TicketIcon size={24} className="text-green-500 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">
                  {lotteryData[0].type}
                </h2>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <CalendarIcon size={14} className="mr-1" />
                <span>
                  {new Date(lotteryData[0].date).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Jackpot: {lotteryData[0].jackpot}
              </div>
              <div className="flex space-x-2">
                {lotteryData[0].numbers.map((number, index) => <div key={index} className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-800">
                    {number}
                  </div>)}
              </div>
              {lotteryData[0].winner && <div className="mt-2 text-sm font-medium text-green-600">
                  Winner Announced!
                </div>}
            </div>
          </div>
        </div>}
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <div className="flex items-center">
          <FilterIcon size={16} className="text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-700 mr-2">
            Filter:
          </span>
          <div className="flex flex-wrap gap-2">
            {lotteryTypes.map(type => <button key={type} onClick={() => setFilter(type)} className={`px-3 py-1 text-xs rounded-full ${filter === type ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {type === 'all' ? 'All Types' : type}
              </button>)}
          </div>
        </div>
        <div className="relative">
          <input type="text" placeholder="Search results..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full md:w-64" />
          <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {/* Results Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {isLoading ? <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div> : filteredData.length === 0 ? <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <TicketIcon size={48} className="mb-4 opacity-30" />
            <p>No lottery results match your search.</p>
          </div> : <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lottery Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Numbers
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jackpot
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Winner
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map(lottery => <tr key={lottery.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(lottery.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <TicketIcon size={16} className="text-green-500 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {lottery.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-1">
                        {lottery.numbers.map((number, index) => <div key={index} className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-xs font-medium text-green-800">
                            {number}
                          </div>)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lottery.jackpot}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lottery.winner ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Yes
                        </span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          No
                        </span>}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </div>
    </div>;
};
export default LotteryResults;
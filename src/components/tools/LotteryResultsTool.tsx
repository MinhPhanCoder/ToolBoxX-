import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { TicketIcon, CalendarIcon, RefreshCwIcon } from 'lucide-react';
import Button from '../ui/Button';
interface LotteryResult {
  id: string;
  date: string;
  numbers: number[];
  jackpot: string;
  winners: number;
}
const LotteryResultsTool: React.FC = () => {
  const {
    t
  } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<LotteryResult[]>([]);
  const [selectedLottery, setSelectedLottery] = useState<'powerball' | 'megamillions'>('powerball');
  useEffect(() => {
    setLoading(true);
    const generateMockResults = () => {
      const mockResults: LotteryResult[] = [];
      const today = new Date();
      for (let i = 0; i < 10; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i * 3);
        const numbers = Array.from({
          length: selectedLottery === 'powerball' ? 6 : 7
        }, () => Math.floor(Math.random() * 69) + 1);
        const jackpot = `$${(Math.floor(Math.random() * 500) + 50).toLocaleString()}M`;
        const winners = Math.floor(Math.random() * 5);
        mockResults.push({
          id: `${selectedLottery}-${date.toISOString()}`,
          date: date.toISOString().split('T')[0],
          numbers,
          jackpot,
          winners
        });
      }
      return mockResults;
    };
    const mockResults = generateMockResults();
    setResults(mockResults);
    setLoading(false);
  }, [selectedLottery]);
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const mockResults = generateMockResults();
      setResults(mockResults);
      setLoading(false);
    }, 1000);
  };
  const generateMockResults = () => {
    const mockResults: LotteryResult[] = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i * 3);
      const numbers = Array.from({
        length: selectedLottery === 'powerball' ? 6 : 7
      }, () => Math.floor(Math.random() * 69) + 1);
      const jackpot = `$${(Math.floor(Math.random() * 500) + 50).toLocaleString()}M`;
      const winners = Math.floor(Math.random() * 5);
      mockResults.push({
        id: `${selectedLottery}-${date.toISOString()}`,
        date: date.toISOString().split('T')[0],
        numbers,
        jackpot,
        winners
      });
    }
    return mockResults;
  };
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <TicketIcon size={24} className="text-green-500 dark:text-green-400 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {t('lotteryResults')}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <button onClick={() => setSelectedLottery('powerball')} className={`px-3 py-1 text-sm font-medium rounded-md ${selectedLottery === 'powerball' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              Powerball
            </button>
            <button onClick={() => setSelectedLottery('megamillions')} className={`px-3 py-1 text-sm font-medium rounded-md ${selectedLottery === 'megamillions' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              Mega Millions
            </button>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} isLoading={loading} leftIcon={!loading ? <RefreshCwIcon size={16} /> : undefined}>
            Refresh
          </Button>
        </div>
      </div>
      {loading ? <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        </div> : <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Numbers
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Jackpot
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Winners
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {results.map(result => <tr key={result.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                    <div className="flex items-center">
                      <CalendarIcon size={16} className="text-gray-400 dark:text-gray-500 mr-2" />
                      {new Date(result.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {result.numbers.map((number, index) => <div key={index} className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                            ${index === result.numbers.length - 1 ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600'}
                          `}>
                          {number}
                        </div>)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-medium">
                    {result.jackpot}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {result.winners > 0 ? <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                        {result.winners}{' '}
                        {result.winners === 1 ? 'winner' : 'winners'}
                      </span> : <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                        No winners
                      </span>}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>}
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          How to Play{' '}
          {selectedLottery === 'powerball' ? 'Powerball' : 'Mega Millions'}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {selectedLottery === 'powerball' ? <>
              Select five numbers from 1 to 69 for the white balls, then select
              one number from 1 to 26 for the red Powerball. Drawings are held
              every Monday, Wednesday and Saturday at 10:59 PM ET.
            </> : <>
              Select five numbers from 1 to 70 for the white balls, then select
              one number from 1 to 25 for the gold Mega Ball. Drawings are held
              every Tuesday and Friday at 11:00 PM ET.
            </>}
        </p>
      </div>
    </div>;
};
export default LotteryResultsTool;
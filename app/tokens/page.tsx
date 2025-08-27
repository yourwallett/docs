import Sidebar from '@/components/Sidebar'
import { CheckCircle, ArrowRight, Coins, ArrowLeftRight } from 'lucide-react'

export default function TokensPage() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Supported Tokens & Swap Pairs</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              YourWallet supports a comprehensive range of tokens on the Terra Classic network, including native tokens and cross-chain assets via Axelar bridge.
            </p>

            {/* Native Tokens */}
            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
              <div className="flex items-center mb-6">
                <Coins className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Native Terra Classic Tokens</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                  { symbol: 'LUNC', name: 'Luna Classic', denom: 'uluna', description: 'Native Terra Classic token' },
                  { symbol: 'USTC', name: 'TerraUSD Classic', denom: 'uusd', description: 'Stablecoin on Terra Classic' },
                ].map((token) => (
                  <div key={token.symbol} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{token.symbol}</h3>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">Native</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{token.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">{token.denom}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{token.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Axelar Bridge Tokens */}
            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
              <div className="flex items-center mb-6">
                <ArrowLeftRight className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400 mr-3" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Axelar Bridge Tokens</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                  { symbol: 'axlUSDC', name: 'Axelar USDC', denom: 'uusdc', description: 'USD Coin via Axelar bridge' },
                  { symbol: 'axlUSDT', name: 'Axelar USDT', denom: 'uusdt', description: 'Tether USD via Axelar bridge' },
                  { symbol: 'AXL', name: 'Axelar', denom: 'uaxl', description: 'Axelar native token' },
                  { symbol: 'axlWBTC', name: 'Axelar WBTC', denom: 'wbtc-satoshi', description: 'Wrapped Bitcoin via Axelar' },
                  { symbol: 'axlWETH', name: 'Axelar WETH', denom: 'weth-wei', description: 'Wrapped Ethereum via Axelar' },
                  { symbol: 'axlDAI', name: 'Axelar DAI', denom: 'dai-wei', description: 'Dai stablecoin via Axelar' },
                  { symbol: 'axlLINK', name: 'Axelar LINK', denom: 'link-wei', description: 'Chainlink via Axelar' },
                  { symbol: 'axlUNI', name: 'Axelar UNI', denom: 'uni-wei', description: 'Uniswap via Axelar' },
                  { symbol: 'axlMATIC', name: 'Axelar MATIC', denom: 'wmatic-wei', description: 'Polygon via Axelar' },
                  { symbol: 'BUSD', name: 'Binance USD', denom: 'busd-wei', description: 'Binance USD via Axelar' },
                ].map((token) => (
                  <div key={token.symbol} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{token.symbol}</h3>
                      <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-2 py-1 rounded">Bridge</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{token.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">{token.denom}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{token.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Swap Pairs */}
            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
              <div className="flex items-center mb-6">
                <ArrowLeftRight className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400 mr-3" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Available Swap Pairs</h2>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                YourWallet supports the following swap pairs on Terra Classic network through Terraswap protocol:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { from: 'LUNC', to: 'USTC', description: 'Luna Classic to TerraUSD Classic' },
                  { from: 'USTC', to: 'LUNC', description: 'TerraUSD Classic to Luna Classic' },
                  { from: 'LUNC', to: 'axlUSDC', description: 'Luna Classic to Axelar USDC' },
                  { from: 'axlUSDC', to: 'LUNC', description: 'Axelar USDC to Luna Classic' },
                  { from: 'LUNC', to: 'axlUSDT', description: 'Luna Classic to Axelar USDT' },
                  { from: 'axlUSDT', to: 'LUNC', description: 'Axelar USDT to Luna Classic' },
                  { from: 'USTC', to: 'axlUSDC', description: 'TerraUSD Classic to Axelar USDC' },
                  { from: 'axlUSDC', to: 'USTC', description: 'Axelar USDC to TerraUSD Classic' },
                  { from: 'USTC', to: 'axlUSDT', description: 'TerraUSD Classic to Axelar USDT' },
                  { from: 'axlUSDT', to: 'USTC', description: 'Axelar USDT to TerraUSD Classic' },
                  { from: 'axlUSDC', to: 'axlUSDT', description: 'Axelar USDC to Axelar USDT' },
                  { from: 'axlUSDT', to: 'axlUSDC', description: 'Axelar USDT to Axelar USDC' },
                  { from: 'LUNC', to: 'AXL', description: 'Luna Classic to Axelar' },
                  { from: 'AXL', to: 'LUNC', description: 'Axelar to Luna Classic' },
                  { from: 'LUNC', to: 'axlWBTC', description: 'Luna Classic to Axelar WBTC' },
                  { from: 'axlWBTC', to: 'LUNC', description: 'Axelar WBTC to Luna Classic' },
                  { from: 'LUNC', to: 'axlWETH', description: 'Luna Classic to Axelar WETH' },
                  { from: 'axlWETH', to: 'LUNC', description: 'Axelar WETH to Luna Classic' },
                  { from: 'LUNC', to: 'axlDAI', description: 'Luna Classic to Axelar DAI' },
                  { from: 'axlDAI', to: 'LUNC', description: 'Axelar DAI to Luna Classic' },
                  { from: 'LUNC', to: 'axlLINK', description: 'Luna Classic to Axelar LINK' },
                  { from: 'axlLINK', to: 'LUNC', description: 'Axelar LINK to Luna Classic' },
                  { from: 'LUNC', to: 'axlUNI', description: 'Luna Classic to Axelar UNI' },
                  { from: 'axlUNI', to: 'LUNC', description: 'Axelar UNI to Luna Classic' },
                  { from: 'LUNC', to: 'axlMATIC', description: 'Luna Classic to Axelar MATIC' },
                  { from: 'axlMATIC', to: 'LUNC', description: 'Axelar MATIC to Luna Classic' },
                  { from: 'LUNC', to: 'BUSD', description: 'Luna Classic to Binance USD' },
                  { from: 'BUSD', to: 'LUNC', description: 'Binance USD to Luna Classic' },
                ].map((pair, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900 dark:text-white">{pair.from}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold text-gray-900 dark:text-white">{pair.to}</span>
                      </div>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{pair.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfer Capabilities */}
            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
              <div className="flex items-center mb-6">
                <Coins className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 dark:text-orange-400 mr-3" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Transfer Capabilities</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Supported Transfer Types</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Native Transfers:</strong> All supported tokens can be transferred between Terra Classic addresses</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Cross-Chain Transfers:</strong> Axelar bridge tokens can be transferred to other supported networks</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Batch Transfers:</strong> Multiple tokens can be transferred in a single transaction</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Memo Support:</strong> Custom memos can be added to transfer transactions</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Network Features</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Terra Classic Network:</strong> Primary network for all operations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Axelar Bridge:</strong> Cross-chain interoperability with multiple networks</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Terraswap Protocol:</strong> Decentralized exchange for token swaps</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Fast Transactions:</strong> Average block time of ~6 seconds</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Token Information */}
            <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">Token Information</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Token</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Symbol</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Denom</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Decimals</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { token: 'Luna Classic', symbol: 'LUNC', denom: 'uluna', decimals: 6, type: 'Native' },
                      { token: 'TerraUSD Classic', symbol: 'USTC', denom: 'uusd', decimals: 6, type: 'Native' },
                      { token: 'Axelar USDC', symbol: 'axlUSDC', denom: 'uusdc', decimals: 6, type: 'Bridge' },
                      { token: 'Axelar USDT', symbol: 'axlUSDT', denom: 'uusdt', decimals: 6, type: 'Bridge' },
                      { token: 'Axelar', symbol: 'AXL', denom: 'uaxl', decimals: 6, type: 'Bridge' },
                      { token: 'Axelar WBTC', symbol: 'axlWBTC', denom: 'wbtc-satoshi', decimals: 8, type: 'Bridge' },
                      { token: 'Axelar WETH', symbol: 'axlWETH', denom: 'weth-wei', decimals: 18, type: 'Bridge' },
                      { token: 'Axelar DAI', symbol: 'axlDAI', denom: 'dai-wei', decimals: 18, type: 'Bridge' },
                      { token: 'Axelar LINK', symbol: 'axlLINK', denom: 'link-wei', decimals: 18, type: 'Bridge' },
                      { token: 'Axelar UNI', symbol: 'axlUNI', denom: 'uni-wei', decimals: 18, type: 'Bridge' },
                      { token: 'Axelar MATIC', symbol: 'axlMATIC', denom: 'wmatic-wei', decimals: 18, type: 'Bridge' },
                      { token: 'Binance USD', symbol: 'BUSD', denom: 'busd-wei', decimals: 18, type: 'Bridge' },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 px-4 text-gray-900 dark:text-white">{row.token}</td>
                        <td className="py-3 px-4 text-gray-900 dark:text-white font-mono">{row.symbol}</td>
                        <td className="py-3 px-4 text-gray-500 dark:text-gray-400 font-mono">{row.denom}</td>
                        <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{row.decimals}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2 py-1 rounded ${
                            row.type === 'Native' 
                              ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                              : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                          }`}>
                            {row.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

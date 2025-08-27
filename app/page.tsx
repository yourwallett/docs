import Sidebar from '@/components/Sidebar'
import { ArrowRight, Zap, Shield, Database, Code, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Hero Section */}
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              YourWallet Swap Model Documentation
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Comprehensive documentation for the YourWallet swap system on Terra Classic network
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-lg text-sm font-medium">
                Terra Classic Network
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-4 py-2 rounded-lg text-sm font-medium">
                Terraswap Protocol
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-lg text-sm font-medium">
                MongoDB Schema
              </div>
            </div>
          </div>

          {/* Apple Developer Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 lg:p-8 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 mr-3" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">For Apple Developer Review</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Our Own Swap Implementation</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>No Third-Party APIs:</strong> We developed our complete swap system from scratch</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Direct Blockchain Integration:</strong> Direct connection to Terra Classic network</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Custom Smart Contracts:</strong> Our own swap contract implementations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Proprietary Database:</strong> Custom MongoDB schema for transaction tracking</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Technical Architecture</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <Code className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Backend:</strong> Node.js with Express.js framework</span>
                  </li>
                  <li className="flex items-start">
                    <Database className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Database:</strong> MongoDB with custom swap schema</span>
                  </li>
                  <li className="flex items-start">
                    <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Blockchain:</strong> Direct Terra Classic SDK integration</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Security:</strong> JWT authentication and custom validation</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Points for Review:</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• <strong>No External Swap Services:</strong> We do not use any third-party swap APIs or services</li>
                <li>• <strong>Direct Blockchain Transactions:</strong> All swaps are executed directly on the Terra Classic blockchain</li>
                <li>• <strong>Custom Implementation:</strong> Our swap logic, fee calculation, and transaction handling are proprietary</li>
                <li>• <strong>Complete Control:</strong> We have full control over the swap process, security, and user experience</li>
              </ul>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Swap Model</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Complete MongoDB schema and data structures for swap transactions
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-500 space-y-1">
                <li>• Transaction records</li>
                <li>• Token information</li>
                <li>• Fee calculations</li>
                <li>• Status tracking</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Database Schema</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Optimized MongoDB collections with proper indexing and performance
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-500 space-y-1">
                <li>• Indexed queries</li>
                <li>• TTL collections</li>
                <li>• Aggregation pipelines</li>
                <li>• Performance optimization</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Data Integrity</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Robust data validation and error handling for swap operations
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-500 space-y-1">
                <li>• Input validation</li>
                <li>• Error handling</li>
                <li>• Data consistency</li>
                <li>• Audit trails</li>
              </ul>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Start</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Swap Model Overview</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Understand the complete swap transaction data structure and schema
                  </p>
                  <a href="/model" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                    View Swap Model <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Database Schema</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Learn about MongoDB collections, indexes, and performance optimization
                  </p>
                  <a href="/schema" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                    Database Schema <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Examples & Usage</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    See real-world examples of how to work with the swap model
                  </p>
                  <a href="/examples" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                    View Examples <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Supported Tokens */}
          <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Supported Tokens</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { symbol: 'LUNC', name: 'Luna Classic', denom: 'uluna' },
                { symbol: 'USTC', name: 'TerraUSD Classic', denom: 'uusd' },
                { symbol: 'axlUSDC', name: 'Axelar USDC', denom: 'uusdc' },
                { symbol: 'axlUSDT', name: 'Axelar USDT', denom: 'uusdt' },
                { symbol: 'AXL', name: 'Axelar', denom: 'uaxl' },
                { symbol: 'axlWBTC', name: 'Axelar WBTC', denom: 'wbtc-satoshi' },
                { symbol: 'axlWETH', name: 'Axelar WETH', denom: 'weth-wei' },
                { symbol: 'axlDAI', name: 'Axelar DAI', denom: 'dai-wei' },
              ].map((token) => (
                <div key={token.symbol} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-semibold text-gray-900 dark:text-white">{token.symbol}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{token.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 font-mono">{token.denom}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

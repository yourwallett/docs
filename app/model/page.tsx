import Sidebar from '@/components/Sidebar'
import CodeBlock from '@/components/CodeBlock'
import { CheckCircle, Code, Database, Shield } from 'lucide-react'

export default function ModelPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Swap Model Documentation</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              The YourWallet swap system uses a comprehensive MongoDB schema to store and manage swap transactions 
              on the Terra Classic network. This model handles all aspects of swap operations including token information, 
              fees, status tracking, and transaction details.
            </p>

            {/* Apple Developer Notice */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 mb-8">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Proprietary Swap Implementation</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <Code className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Custom Code</h3>
                    <p className="text-sm text-gray-600">Our own swap logic and transaction handling</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Database className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Own Database</h3>
                    <p className="text-sm text-gray-600">Custom MongoDB schema for transaction tracking</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Direct Integration</h3>
                    <p className="text-sm text-gray-600">No third-party swap services used</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white rounded border border-green-200">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> This swap system is entirely our own implementation. We do not rely on any external 
                  swap APIs or third-party services. All swap operations are executed directly on the Terra Classic blockchain 
                  using our custom smart contracts and proprietary transaction handling logic.
                </p>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Model Overview</h2>
              <p className="text-gray-600 mb-4">
                The swap model is designed to capture every detail of a swap transaction, from initial request to completion. 
                It includes comprehensive tracking of tokens, amounts, fees, and transaction status.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Complete transaction tracking</li>
                    <li>• Token amount and price information</li>
                    <li>• Fee and commission calculations</li>
                    <li>• Status management (pending/completed/failed)</li>
                    <li>• Blockchain transaction details</li>
                    <li>• Timestamp and audit information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Data Integrity</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Required field validation</li>
                    <li>• Enum constraints for status and network</li>
                    <li>• Unique transaction hash indexing</li>
                    <li>• Automatic timestamp management</li>
                    <li>• TTL for data cleanup</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Database Schema */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Database Schema</h2>
              <p className="text-gray-600 mb-4">
                The MongoDB schema defines the structure for storing swap transactions with proper validation and indexing.
              </p>
              
              <CodeBlock 
                code={`const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
    // Basic Information
    walletAddress: { 
        type: String, 
        required: true,
        index: true,
        description: 'Address of the wallet performing the swap'
    },
    network: {
        type: String,
        required: true,
        enum: ['terra-classic', 'ethereum', 'bitcoin', 'binance', 'solana', 'tron'],
        default: 'terra-classic',
        description: 'Blockchain network where the swap occurs'
    },
    
    // Transaction Status
    status: { 
        type: String, 
        required: true, 
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
        description: 'Current status of the swap transaction'
    },
    txhash: { 
        type: String, 
        required: true,
        unique: true,
        index: true,
        description: 'Blockchain transaction hash'
    },
    timestamp: { 
        type: Date, 
        default: Date.now,
        index: true,
        description: 'When the swap was initiated'
    },
    type: { 
        type: String, 
        required: true, 
        enum: ['swap'],
        default: 'swap',
        description: 'Type of transaction'
    },
    
    // Fee Information
    fee: { 
        type: Number, 
        required: true,
        description: 'YourWallet commission fee amount'
    },
    feeRate: { 
        type: Number, 
        required: true,
        description: 'Commission rate (0.0085 = 0.85%)'
    },
    feeCurrency: { 
        type: String, 
        required: true,
        description: 'Currency of the commission fee'
    },
    networkFee: { 
        type: Number, 
        required: true,
        description: 'Blockchain network fee amount'
    },
    networkFeeCurrency: { 
        type: String, 
        required: true,
        description: 'Currency of the network fee'
    },
    currency: { 
        type: String, 
        required: true,
        description: 'Primary currency of the transaction'
    },
    
    // From Token Information (Token being sold)
    fromToken: { 
        type: String, 
        required: true,
        description: 'Contract address or denom of the token being sold'
    },
    fromTokenAmount: { 
        type: Number, 
        required: true,
        description: 'Amount of tokens being sold'
    },
    fromTokenDecimals: { 
        type: Number, 
        required: true,
        description: 'Decimal places for the from token'
    },
    fromTokenSymbol: { 
        type: String, 
        required: true,
        description: 'Symbol of the token being sold (e.g., LUNC)'
    },
    fromTokenPrice: { 
        type: Number, 
        required: true,
        description: 'Price of the from token at swap time'
    },
    
    // To Token Information (Token being bought)
    toToken: { 
        type: String, 
        required: true,
        description: 'Contract address or denom of the token being bought'
    },
    toTokenAmount: { 
        type: Number, 
        required: true,
        description: 'Amount of tokens being bought'
    },
    toTokenDecimals: { 
        type: Number, 
        required: true,
        description: 'Decimal places for the to token'
    },
    toTokenSymbol: { 
        type: String, 
        required: true,
        description: 'Symbol of the token being bought (e.g., USTC)'
    },
    toTokenPrice: { 
        type: Number, 
        required: true,
        description: 'Price of the to token at swap time'
    },
    
    // Contract Information
    contractAddress: { 
        type: String, 
        required: true,
        description: 'Address of the swap contract used'
    },
    provider: { 
        type: String, 
        default: 'yourwallet',
        description: 'Swap service provider'
    },
    slippage: { 
        type: Number, 
        default: 0.01,
        description: 'Slippage tolerance (0.01 = 1%)'
    }
}, {
    timestamps: true,
    collection: 'swaps'
});

// Indexes for optimal query performance
swapSchema.index({ walletAddress: 1, timestamp: -1 });
swapSchema.index({ status: 1, timestamp: -1 });
swapSchema.index({ fromTokenSymbol: 1, toTokenSymbol: 1 });
swapSchema.index({ 'timestamp': 1 }, { expireAfterSeconds: 7776000 }); // Auto-delete after 90 days

module.exports = mongoose.model('Swap', swapSchema);`}
                language="javascript"
                title="models/swap.model.js"
              />
            </div>

            {/* Field Descriptions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Field Descriptions</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">walletAddress:</span>
                      <p className="text-gray-600">The Terra Classic wallet address that initiated the swap</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">network:</span>
                      <p className="text-gray-600">Blockchain network where the transaction occurred</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">status:</span>
                      <p className="text-gray-600">Current state: pending, completed, or failed</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">txhash:</span>
                      <p className="text-gray-600">Unique blockchain transaction identifier</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">timestamp:</span>
                      <p className="text-gray-600">When the swap was initiated (auto-generated)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Token Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">fromToken:</span>
                      <p className="text-gray-600">Denom or contract address of the token being sold</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">fromTokenAmount:</span>
                      <p className="text-gray-600">Exact amount of tokens being sold</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">fromTokenSymbol:</span>
                      <p className="text-gray-600">Human-readable symbol (LUNC, USTC, etc.)</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">toToken:</span>
                      <p className="text-gray-600">Denom or contract address of the token being bought</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">toTokenAmount:</span>
                      <p className="text-gray-600">Exact amount of tokens being bought</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Fee Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">fee:</span>
                      <p className="text-gray-600">YourWallet commission fee amount</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">feeRate:</span>
                      <p className="text-gray-600">Commission rate (0.0085 = 0.85%)</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">networkFee:</span>
                      <p className="text-gray-600">Blockchain gas fee amount</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">slippage:</span>
                      <p className="text-gray-600">Slippage tolerance (0.01 = 1%)</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">contractAddress:</span>
                      <p className="text-gray-600">Terraswap contract address used</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">provider:</span>
                      <p className="text-gray-600">Swap service provider (yourwallet)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Types */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">TypeScript Interfaces</h2>
              
              <CodeBlock 
                code={`// Core Swap Interface
interface Swap {
  _id?: string;
  walletAddress: string;
  network: 'terra-classic' | 'ethereum' | 'bitcoin' | 'binance' | 'solana' | 'tron';
  status: 'pending' | 'completed' | 'failed';
  txhash: string;
  timestamp: Date;
  type: 'swap';
  
  // Fee Information
  fee: number;
  feeRate: number;
  feeCurrency: string;
  networkFee: number;
  networkFeeCurrency: string;
  currency: string;
  
  // From Token (Token being sold)
  fromToken: string;
  fromTokenAmount: number;
  fromTokenDecimals: number;
  fromTokenSymbol: string;
  fromTokenPrice: number;
  
  // To Token (Token being bought)
  toToken: string;
  toTokenAmount: number;
  toTokenDecimals: number;
  toTokenSymbol: string;
  toTokenPrice: number;
  
  // Contract Information
  contractAddress: string;
  provider: string;
  slippage: number;
  
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

// Create Swap Request
interface CreateSwapRequest {
  walletAddress: string;
  network: string;
  fee: number;
  feeRate: number;
  feeCurrency: string;
  networkFee: number;
  networkFeeCurrency: string;
  currency: string;
  status: string;
  txhash: string;
  timestamp: string;
  type: string;
  fromToken: string;
  fromTokenAmount: number;
  fromTokenDecimals: number;
  fromTokenSymbol: string;
  fromTokenPrice: number;
  toToken: string;
  toTokenAmount: number;
  toTokenDecimals: number;
  toTokenSymbol: string;
  toTokenPrice: number;
  contractAddress: string;
  provider: string;
  slippage: number;
}

// Swap List Response
interface SwapListResponse {
  success: boolean;
  swaps: Swap[];
  totalCount: number;
  percentageChangeTotalValue: {
    change: number;
    isPositive: boolean;
  };
  percentageChangeTotalFee: {
    change: number;
    isPositive: boolean;
  };
  mostUsedToken: {
    symbol: string;
    count: number;
  } | null;
}

// Swap Statistics
interface SwapStats {
  totalSwaps: number;
  totalVolume: number;
  totalFees: number;
  successRate: {
    completed: number;
    failed: number;
    pending: number;
  };
  mostUsedToken: {
    symbol: string;
    count: number;
  } | null;
}`}
                language="typescript"
                title="types/swap.d.ts"
              />
            </div>

            {/* Example Data */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Example Swap Data</h2>
              <p className="text-gray-600 mb-4">
                Here's an example of what a completed swap transaction looks like in the database.
              </p>
              
              <CodeBlock 
                code={`{
  "_id": "507f1f77bcf86cd799439011",
  "walletAddress": "terra1exnef0wrmf864tczt7m7ykvc70juh8p5er9rdj",
  "network": "terra-classic",
  "status": "completed",
  "txhash": "ABC123DEF456789GHI0123456789JKL0123456789MNO0123456789PQR",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "type": "swap",
  
  // Fee Information
  "fee": 0.0085,
  "feeRate": 0.0085,
  "feeCurrency": "LUNC",
  "networkFee": 0.001,
  "networkFeeCurrency": "LUNC",
  "currency": "LUNC",
  
  // From Token (LUNC being sold)
  "fromToken": "uluna",
  "fromTokenAmount": 1000.0,
  "fromTokenDecimals": 6,
  "fromTokenSymbol": "LUNC",
  "fromTokenPrice": 0.0001,
  
  // To Token (USTC being bought)
  "toToken": "uusd",
  "toTokenAmount": 0.1,
  "toTokenDecimals": 6,
  "toTokenSymbol": "USTC",
  "toTokenPrice": 1.0,
  
  // Contract Information
  "contractAddress": "terra1jkndu9w5attpz09ut02sgey5dd3e8sq5watzm0",
  "provider": "yourwallet",
  "slippage": 0.01,
  
  // Timestamps
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}`}
                language="json"
                title="Example Swap Document"
              />
            </div>

            {/* Validation Rules */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Validation Rules</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Required Fields</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• <strong>walletAddress:</strong> Must be a valid Terra Classic address</li>
                    <li>• <strong>txhash:</strong> Must be unique and valid transaction hash</li>
                    <li>• <strong>fromToken/toToken:</strong> Must be valid token denoms or contract addresses</li>
                    <li>• <strong>amounts:</strong> Must be positive numbers</li>
                    <li>• <strong>decimals:</strong> Must be integers between 0 and 18</li>
                    <li>• <strong>prices:</strong> Must be positive numbers</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Enum Constraints</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• <strong>network:</strong> Must be one of: terra-classic, ethereum, bitcoin, binance, solana, tron</li>
                    <li>• <strong>status:</strong> Must be one of: pending, completed, failed</li>
                    <li>• <strong>type:</strong> Must be 'swap'</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Business Rules</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• <strong>feeRate:</strong> Must be between 0 and 1 (0% to 100%)</li>
                    <li>• <strong>slippage:</strong> Must be between 0 and 1 (0% to 100%)</li>
                    <li>• <strong>fromToken ≠ toToken:</strong> Cannot swap the same token</li>
                    <li>• <strong>amounts > 0:</strong> Token amounts must be positive</li>
                    <li>• <strong>prices > 0:</strong> Token prices must be positive</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

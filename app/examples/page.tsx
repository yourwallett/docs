import Sidebar from '@/components/Sidebar'
import CodeBlock from '@/components/CodeBlock'

export default function ExamplesPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Examples & Usage</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Real-world examples of how to work with the YourWallet swap model, including database operations, 
              data validation, and common use cases.
            </p>

            {/* Creating Swap Records */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Creating Swap Records</h2>
              <p className="text-gray-600 mb-4">
                Examples of how to create and save swap transaction records to the database.
              </p>
              
              <CodeBlock 
                code={`// Example 1: Basic Swap Record Creation
const createSwapRecord = async (swapData) => {
  try {
    const swap = new Swap({
      walletAddress: "terra1exnef0wrmf864tczt7m7ykvc70juh8p5er9rdj",
      network: "terra-classic",
      status: "completed",
      txhash: "ABC123DEF456789GHI0123456789JKL0123456789MNO0123456789PQR",
      fee: 0.0085,
      feeRate: 0.0085,
      feeCurrency: "LUNC",
      networkFee: 0.001,
      networkFeeCurrency: "LUNC",
      currency: "LUNC",
      fromToken: "uluna",
      fromTokenAmount: 1000.0,
      fromTokenDecimals: 6,
      fromTokenSymbol: "LUNC",
      fromTokenPrice: 0.0001,
      toToken: "uusd",
      toTokenAmount: 0.1,
      toTokenDecimals: 6,
      toTokenSymbol: "USTC",
      toTokenPrice: 1.0,
      contractAddress: "terra1jkndu9w5attpz09ut02sgey5dd3e8sq5watzm0",
      provider: "yourwallet",
      slippage: 0.01
    });

    const savedSwap = await swap.save();
    console.log('Swap saved:', savedSwap._id);
    return { success: true, swap: savedSwap };
  } catch (error) {
    console.error('Error saving swap:', error);
    return { success: false, error: error.message };
  }
};

// Example 2: Bulk Insert for Multiple Swaps
const createBulkSwaps = async (swapsArray) => {
  try {
    const swaps = swapsArray.map(swapData => new Swap(swapData));
    const result = await Swap.insertMany(swaps, { ordered: false });
    console.log(\`Inserted \${result.length} swaps\`);
    return { success: true, count: result.length };
  } catch (error) {
    console.error('Bulk insert error:', error);
    return { success: false, error: error.message };
  }
};

// Example 3: Swap with Validation
const createValidatedSwap = async (swapData) => {
  try {
    // Validate required fields
    const requiredFields = ['walletAddress', 'txhash', 'fromToken', 'toToken'];
    for (const field of requiredFields) {
      if (!swapData[field]) {
        throw new Error(\`Missing required field: \${field}\`);
      }
    }

    // Validate amounts
    if (swapData.fromTokenAmount <= 0 || swapData.toTokenAmount <= 0) {
      throw new Error('Token amounts must be positive');
    }

    // Validate slippage
    if (swapData.slippage < 0 || swapData.slippage > 1) {
      throw new Error('Slippage must be between 0 and 1');
    }

    const swap = new Swap(swapData);
    const savedSwap = await swap.save();
    return { success: true, swap: savedSwap };
  } catch (error) {
    return { success: false, error: error.message };
  }
};`}
                language="javascript"
                title="Creating Swap Records"
              />
            </div>

            {/* Querying Swap Data */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Querying Swap Data</h2>
              <p className="text-gray-600 mb-4">
                Common query patterns for retrieving and filtering swap transaction data.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">User Transaction History</h3>
                  <CodeBlock 
                    code={`// Get user's swap history with pagination
const getUserSwapHistory = async (walletAddress, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    
    const swaps = await Swap.find({ walletAddress })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .select('txhash status fromTokenSymbol toTokenSymbol fromTokenAmount toTokenAmount timestamp fee');

    const totalCount = await Swap.countDocuments({ walletAddress });
    
    return {
      success: true,
      swaps,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get recent swaps for a user
const getRecentSwaps = async (walletAddress, hours = 24) => {
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
  
  return await Swap.find({
    walletAddress,
    timestamp: { $gte: cutoff }
  })
  .sort({ timestamp: -1 })
  .limit(50)
  .lean();
};`}
                    language="javascript"
                    title="User Transaction History"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Token Analytics</h3>
                  <CodeBlock 
                    code={`// Get statistics for a specific token
const getTokenStats = async (tokenSymbol, timeFrame = 30) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - timeFrame);
  
  const pipeline = [
    {
      $match: {
        $or: [
          { fromTokenSymbol: tokenSymbol },
          { toTokenSymbol: tokenSymbol }
        ],
        timestamp: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        totalSwaps: { $sum: 1 },
        totalVolume: { $sum: '$fromTokenAmount' },
        totalFees: { $sum: '$fee' },
        avgSlippage: { $avg: '$slippage' },
        successRate: {
          $avg: {
            $cond: [{ $eq: ['$status', 'completed'] }, 1, 0]
          }
        }
      }
    }
  ];
  
  const result = await Swap.aggregate(pipeline);
  return result[0] || {
    totalSwaps: 0,
    totalVolume: 0,
    totalFees: 0,
    avgSlippage: 0,
    successRate: 0
  };
};

// Get most popular token pairs
const getPopularPairs = async (limit = 10) => {
  const pipeline = [
    {
      $group: {
        _id: {
          fromToken: '$fromTokenSymbol',
          toToken: '$toTokenSymbol'
        },
        count: { $sum: 1 },
        totalVolume: { $sum: '$fromTokenAmount' }
      }
    },
    { $sort: { count: -1 } },
    { $limit: limit }
  ];
  
  return await Swap.aggregate(pipeline);
};`}
                    language="javascript"
                    title="Token Analytics"
                  />
                </div>
              </div>
            </div>

            {/* Data Validation */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Validation</h2>
              <p className="text-gray-600 mb-4">
                Comprehensive validation functions for swap data before saving to database.
              </p>
              
              <CodeBlock 
                code={`// Comprehensive swap data validation
const validateSwapData = (swapData) => {
  const errors = [];

  // Required field validation
  const requiredFields = [
    'walletAddress', 'txhash', 'fromToken', 'toToken',
    'fromTokenAmount', 'toTokenAmount', 'fromTokenSymbol', 'toTokenSymbol'
  ];
  
  for (const field of requiredFields) {
    if (!swapData[field]) {
      errors.push(\`Missing required field: \${field}\`);
    }
  }

  // Wallet address validation (Terra Classic format)
  if (swapData.walletAddress && !swapData.walletAddress.startsWith('terra1')) {
    errors.push('Invalid Terra Classic wallet address');
  }

  // Transaction hash validation
  if (swapData.txhash && swapData.txhash.length < 64) {
    errors.push('Invalid transaction hash length');
  }

  // Amount validation
  if (swapData.fromTokenAmount && swapData.fromTokenAmount <= 0) {
    errors.push('From token amount must be positive');
  }
  
  if (swapData.toTokenAmount && swapData.toTokenAmount <= 0) {
    errors.push('To token amount must be positive');
  }

  // Decimal validation
  if (swapData.fromTokenDecimals && (swapData.fromTokenDecimals < 0 || swapData.fromTokenDecimals > 18)) {
    errors.push('From token decimals must be between 0 and 18');
  }
  
  if (swapData.toTokenDecimals && (swapData.toTokenDecimals < 0 || swapData.toTokenDecimals > 18)) {
    errors.push('To token decimals must be between 0 and 18');
  }

  // Price validation
  if (swapData.fromTokenPrice && swapData.fromTokenPrice <= 0) {
    errors.push('From token price must be positive');
  }
  
  if (swapData.toTokenPrice && swapData.toTokenPrice <= 0) {
    errors.push('To token price must be positive');
  }

  // Fee validation
  if (swapData.fee && swapData.fee < 0) {
    errors.push('Fee cannot be negative');
  }
  
  if (swapData.feeRate && (swapData.feeRate < 0 || swapData.feeRate > 1)) {
    errors.push('Fee rate must be between 0 and 1');
  }

  // Slippage validation
  if (swapData.slippage && (swapData.slippage < 0 || swapData.slippage > 1)) {
    errors.push('Slippage must be between 0 and 1');
  }

  // Network validation
  const validNetworks = ['terra-classic', 'ethereum', 'bitcoin', 'binance', 'solana', 'tron'];
  if (swapData.network && !validNetworks.includes(swapData.network)) {
    errors.push(\`Invalid network. Must be one of: \${validNetworks.join(', ')}\`);
  }

  // Status validation
  const validStatuses = ['pending', 'completed', 'failed'];
  if (swapData.status && !validStatuses.includes(swapData.status)) {
    errors.push(\`Invalid status. Must be one of: \${validStatuses.join(', ')}\`);
  }

  // Token pair validation
  if (swapData.fromToken === swapData.toToken) {
    errors.push('Cannot swap the same token');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Usage example
const createValidatedSwap = async (swapData) => {
  const validation = validateSwapData(swapData);
  
  if (!validation.isValid) {
    return {
      success: false,
      error: 'Validation failed',
      details: validation.errors
    };
  }

  try {
    const swap = new Swap(swapData);
    const savedSwap = await swap.save();
    return { success: true, swap: savedSwap };
  } catch (error) {
    return { success: false, error: error.message };
  }
};`}
                language="javascript"
                title="Data Validation"
              />
            </div>

            {/* Error Handling */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Error Handling</h2>
              <p className="text-gray-600 mb-4">
                Robust error handling patterns for swap operations.
              </p>
              
              <CodeBlock 
                code={`// Comprehensive error handling for swap operations
const handleSwapOperation = async (operation, swapData) => {
  try {
    // Input validation
    const validation = validateSwapData(swapData);
    if (!validation.isValid) {
      throw new Error(\`Validation failed: \${validation.errors.join(', ')}\`);
    }

    // Check for duplicate transaction
    const existingSwap = await Swap.findOne({ txhash: swapData.txhash });
    if (existingSwap) {
      throw new Error('Transaction already exists');
    }

    // Perform the operation
    const result = await operation(swapData);
    
    // Log successful operation
    console.log('Swap operation successful:', {
      txhash: swapData.txhash,
      walletAddress: swapData.walletAddress,
      timestamp: new Date().toISOString()
    });

    return { success: true, data: result };

  } catch (error) {
    // Log error with context
    console.error('Swap operation failed:', {
      error: error.message,
      txhash: swapData?.txhash,
      walletAddress: swapData?.walletAddress,
      timestamp: new Date().toISOString(),
      stack: error.stack
    });

    // Return structured error response
    return {
      success: false,
      error: error.message,
      errorType: error.name,
      timestamp: new Date().toISOString()
    };
  }
};

// Retry mechanism for failed operations
const retrySwapOperation = async (operation, swapData, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await operation(swapData);
      
      if (result.success) {
        return result;
      }

      // Don't retry validation errors
      if (result.error.includes('Validation failed')) {
        throw new Error(result.error);
      }

      console.log(\`Attempt \${attempt}/\${maxRetries} failed: \${result.error}\`);
      
      if (attempt < maxRetries) {
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }

    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
    }
  }
};

// Usage example
const createSwapWithRetry = async (swapData) => {
  return await retrySwapOperation(
    (data) => handleSwapOperation(createValidatedSwap, data),
    swapData
  );
};`}
                language="javascript"
                title="Error Handling"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

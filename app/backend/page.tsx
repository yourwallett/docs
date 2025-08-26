import Sidebar from '@/components/Sidebar'
import CodeBlock from '@/components/CodeBlock'
import ApiEndpoint from '@/components/ApiEndpoint'
import { CheckCircle, Code, Database, Server } from 'lucide-react'

export default function BackendPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Backend API</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              YourWallet backend API implementation for swap functionality using Node.js, Express.js, and MongoDB.
            </p>

            {/* Apple Developer Notice */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200 mb-8">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Our Own Backend Implementation</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <Server className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Node.js/Express</h3>
                    <p className="text-sm text-gray-600">Custom backend built from scratch</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Database className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">MongoDB</h3>
                    <p className="text-sm text-gray-600">Our own database schema</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Code className="w-5 h-5 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Terra SDK</h3>
                    <p className="text-sm text-gray-600">Direct blockchain integration</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white rounded border border-blue-200">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> The YourWallet backend is our own implementation using Node.js and Express.js. 
                  We directly integrate with the Terra Classic blockchain using the official Terra SDK. 
                  No third-party swap services or external APIs are used for swap operations.
                </p>
              </div>
            </div>

            {/* API Endpoints */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">API Endpoints</h2>
              <p className="text-gray-600 mb-4">
                Complete list of swap-related API endpoints and their implementations.
              </p>
              
              <div className="space-y-6">
                <div>
                  <ApiEndpoint method="GET" path="/api/v1/user/quote" description="Get price quote for swap" />
                  <p className="text-sm text-gray-600 mt-2 mb-4">
                    Retrieves price quotes for token swaps on Terra Classic network.
                  </p>
                  
                  <CodeBlock 
                    code={`/**
 * Terra Classic swap işlemi için fiyat teklifi al
 * GET /user/quote
 * Query: { fromToken, toToken, amount }
 * Yanıt: { fromToken, toToken, amount, returnAmount }
 */
const quote = async (req, res) => {
    const { fromToken, toToken, amount } = req.query;

    if (!fromToken || !toToken || !amount) {
        return res.status(400).json({ error: 'Tüm query parametreleri gereklidir' });
    }

    try {
        // Token kontrolü - uluna2 desteklenmiyor (Terra 2.0 tokeni)
        if (fromToken === 'uluna2' || toToken === 'uluna2') {
            return res.status(400).json({
                error: \`Terra 2.0 tokeni (\${fromToken === 'uluna2' ? 'uluna2' : toToken}) Terra Classic ağında takas edilemez. Lütfen 'uluna' kullanın.\`,
                fromToken,
                toToken,
                supportedTokens: TOKENS
            });
        }

        // Pair contract adresini al
        const pairAddress = await getPairAddress(fromToken, toToken);

        if (!pairAddress) {
            return res.status(400).json({
                error: \`Pair bulunamadı: '\${fromToken}' ve '\${toToken}' tokenleri için likidite havuzu yok veya hatalı token sembolleri.\`,
                fromToken,
                toToken,
                supportedTokens: TOKENS
            });
        }

        // Token tipi kontrolü
        const isFromTokenNative = fromToken.startsWith('u');

        // Swap simülasyonu yap
        const resSim = await terra.wasm.contractQuery(pairAddress.contract_addr, {
            simulation: {
                offer_asset: {
                    amount: amount.toString(),
                    info: isFromTokenNative
                        ? { native_token: { denom: fromToken } }
                        : { token: { contract_addr: fromToken } },
                },
            },
        });

        const returnAmount = resSim.return_amount;

        res.json({
            fromToken,
            toToken,
            amount: amount.toString(),
            returnAmount: returnAmount.toString()
        });

    } catch (err) {
        console.error('Quote hatası:', err);
        res.status(500).json({ error: err.message });
    }
};`}
                    language="javascript"
                    title="controller/user.controller.js - quote function"
                  />
                </div>

                <div>
                  <ApiEndpoint method="POST" path="/api/v1/user/prepare-swap" description="Prepare swap transaction" />
                  <p className="text-sm text-gray-600 mt-2 mb-4">
                    Prepares swap transaction messages for mobile app to sign and broadcast.
                  </p>
                  
                  <CodeBlock 
                    code={`/**
 * Terra Classic swap işlemi oluştur (mobil imzalayacak)
 * POST /user/prepare-swap
 * Body: { sender, fromToken, toToken, amount }
 * Yanıt: { msg }
 */
const prepareSwap = async (req, res) => {
    const { sender, fromToken, toToken, amount } = req.body;

    try {
        // Gerekli parametrelerin kontrolü
        if (!sender || !fromToken || !toToken || !amount) {
            return res.status(400).json({
                error: 'Tüm parametreler gereklidir: sender, fromToken, toToken, amount',
                success: false
            });
        }

        // Token kontrolü - uluna2 desteklenmiyor (Terra 2.0 tokeni)
        if (fromToken === 'uluna2' || toToken === 'uluna2') {
            return res.status(400).json({
                error: \`Terra 2.0 tokeni (\${fromToken === 'uluna2' ? 'uluna2' : toToken}) Terra Classic ağında takas edilemez. Lütfen 'uluna' kullanın.\`,
                fromToken,
                toToken,
                supportedTokens: TOKENS,
                success: false
            });
        }

        // Pair contract adresini al
        const pairAddress = await getPairAddress(fromToken, toToken);

        if (!pairAddress || !pairAddress.contract_addr) {
            return res.status(400).json({
                error: \`Pair bulunamadı: '\${fromToken}' ve '\${toToken}' tokenleri için likidite havuzu yok veya hatalı token sembolleri.\`,
                fromToken,
                toToken,
                supportedTokens: TOKENS,
                success: false
            });
        }

        const executeMsg = new MsgExecuteContract(
            sender,
            pairAddress.contract_addr,
            {
                swap: {
                    offer_asset: {
                        amount: amount.toString(),
                        info: fromToken.startsWith('u')
                            ? { native_token: { denom: fromToken } }
                            : { token: { contract_addr: fromToken } },
                    },
                },
            },
            fromToken.startsWith('u') ? new Coins({ [fromToken]: amount }) : {}
        );

        res.json({
            msg: executeMsg.toData(),
            success: true
        });
    } catch (err) {
        console.error('Swap hazırlama hatası:', err);
        res.status(500).json({
            error: err.message,
            success: false
        });
    }
};`}
                    language="javascript"
                    title="controller/user.controller.js - prepareSwap function"
                  />
                </div>

                <div>
                  <ApiEndpoint method="POST" path="/api/v1/swap/create" description="Create swap record" />
                  <p className="text-sm text-gray-600 mt-2 mb-4">
                    Saves completed swap transaction to the database.
                  </p>
                  
                  <CodeBlock 
                    code={`/**
 * Swap işlemi kaydı oluştur
 * POST /swap/create
 * Body: Swap transaction data
 * Yanıt: { message, swap }
 */
const createSwap = async (req, res) => {
    const swap = new Swap(req.body);
    try {
        await swap.save();
        res.status(201).json({ message: 'Swap created successfully', swap });
    } catch (error) {
        res.status(500).json({ message: 'Swap creation failed', error });
    }
};

// Swap Model Schema
const swapSchema = new mongoose.Schema({
    walletAddress: { type: String, required: true, index: true },
    network: { type: String, required: true, enum: ['terra-classic'], default: 'terra-classic' },
    status: { type: String, required: true, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    txhash: { type: String, required: true, unique: true, index: true },
    timestamp: { type: Date, default: Date.now, index: true },
    type: { type: String, required: true, enum: ['swap'], default: 'swap' },
    
    // Fee Information
    fee: { type: Number, required: true },
    feeRate: { type: Number, required: true },
    feeCurrency: { type: String, required: true },
    networkFee: { type: Number, required: true },
    networkFeeCurrency: { type: String, required: true },
    currency: { type: String, required: true },
    
    // From Token Information
    fromToken: { type: String, required: true },
    fromTokenAmount: { type: Number, required: true },
    fromTokenDecimals: { type: Number, required: true },
    fromTokenSymbol: { type: String, required: true },
    fromTokenPrice: { type: Number, required: true },
    
    // To Token Information
    toToken: { type: String, required: true },
    toTokenAmount: { type: Number, required: true },
    toTokenDecimals: { type: Number, required: true },
    toTokenSymbol: { type: String, required: true },
    toTokenPrice: { type: Number, required: true },
    
    // Contract Information
    contractAddress: { type: String, required: true },
    provider: { type: String, default: 'yourwallet' },
    slippage: { type: Number, default: 0.01 }
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
                    title="controller/swap.controller.js & models/swap.model.js"
                  />
                </div>

                <div>
                  <ApiEndpoint method="GET" path="/api/v1/user/admin/swaps" description="Get swap list (Admin)" />
                  <p className="text-sm text-gray-600 mt-2 mb-4">
                    Retrieves paginated list of swap transactions with filtering options.
                  </p>
                  
                  <CodeBlock 
                    code={`/**
 * Swap İşlem Listesini Getir
 * GET /user/admin/swaps
 * Query: { address: "...", timeFrame: "...", page: "...", limit: "..." }
 * Yanıt: { swaps: [], totalCount: 0, success: true }
 */
const getSwapList = async (req, res) => {
    try {
        const { address, timeFrame, page = 1, limit = 10 } = req.query;

        const query = {};

        // Cüzdan adresine göre filtreleme
        if (address) {
            query.walletAddress = address;
        }

        // Zaman aralığına göre filtreleme
        if (timeFrame) {
            let startDate = new Date();
            if (timeFrame === '7d') {
                startDate.setDate(startDate.getDate() - 7);
            } else if (timeFrame === '30d') {
                startDate.setDate(startDate.getDate() - 30);
            } else if (timeFrame === '3m') {
                startDate.setMonth(startDate.getMonth() - 3);
            } else if (timeFrame === '1y') {
                startDate.setFullYear(startDate.getFullYear() - 1);
            }

            if (timeFrame && startDate && !isNaN(startDate.getTime())) {
                query.timestamp = { $gte: startDate };
            }
        }

        // Son 30 gün ve önceki 30 gün için başlangıç tarihlerini hesapla
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

        // Adrese özel filtre varsa, bu filtreyi 30 günlük hesaplamalara da dahil et
        const thirtyDayQuery = { ...query, timestamp: { $gte: thirtyDaysAgo } };
        const prevThirtyDayQuery = { ...query, timestamp: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } };

        // Son 30 gündeki ve önceki 30 gündeki toplam değerleri hesapla
        const [last30DaysTotals, prev30DaysTotals] = await Promise.all([
            Swap.aggregate([
                { $match: thirtyDayQuery },
                {
                    $group: {
                        _id: null,
                        totalValue: { $sum: '$fromTokenAmount' },
                        totalFee: { $sum: '$fee' }
                    }
                }
            ]),
            Swap.aggregate([
                { $match: prevThirtyDayQuery },
                {
                    $group: {
                        _id: null,
                        totalValue: { $sum: '$fromTokenAmount' },
                        totalFee: { $sum: '$fee' }
                    }
                }
            ])
        ]);

        const last30TotalValue = last30DaysTotals.length > 0 ? last30DaysTotals[0].totalValue : 0;
        const last30TotalFee = last30DaysTotals.length > 0 ? last30DaysTotals[0].totalFee : 0;
        const prev30TotalValue = prev30DaysTotals.length > 0 ? prev30DaysTotals[0].totalValue : 0;
        const prev30TotalFee = prev30DaysTotals.length > 0 ? prev30DaysTotals[0].totalFee : 0;

        // Yüzdelik değişimleri hesapla
        const calculatePercentageChange = (current, previous) => {
            if (previous === 0) {
                return current > 0 ? 100 : 0;
            }
            return ((current - previous) / previous) * 100;
        };

        const percentageChangeTotalValue = calculatePercentageChange(last30TotalValue, prev30TotalValue);
        const percentageChangeTotalFee = calculatePercentageChange(last30TotalFee, prev30TotalFee);

        // En çok kullanılan token istatistiği
        const mostUsedTokenStats = await Swap.aggregate([
            { $match: query },
            {
                $group: {
                    _id: '$fromTokenSymbol',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        // Sayfalama için skip ve limit hesapla
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        // Toplam swap sayısını al
        const totalCount = await Swap.countDocuments(query);

        // Swap işlemlerini veritabanından çek
        const swaps = await Swap.find(query)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(take)
            .lean();

        res.json({
            success: true,
            swaps,
            totalCount,
            percentageChangeTotalValue: {
                change: parseFloat(Math.abs(percentageChangeTotalValue).toFixed(1)),
                isPositive: percentageChangeTotalValue >= 0
            },
            percentageChangeTotalFee: {
                change: parseFloat(Math.abs(percentageChangeTotalFee).toFixed(1)),
                isPositive: percentageChangeTotalFee >= 0
            },
            mostUsedToken: mostUsedTokenStats.length > 0 ? mostUsedTokenStats[0] : null
        });

    } catch (error) {
        console.error('Swap listesi getirme hatası:', error);
        res.status(500).json({ error: 'Swap listesi alınamadı' });
    }
};`}
                    language="javascript"
                    title="controller/user.controller.js - getSwapList function"
                  />
                </div>
              </div>
            </div>

            {/* Terra Integration */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Terra Classic Integration</h2>
              <p className="text-gray-600 mb-4">
                Direct integration with Terra Classic blockchain using Terra SDK.
              </p>
              
              <CodeBlock 
                code={`const { Coins, MsgExecuteContract, RawKey, LCDClient, MnemonicKey, isTxError, Tx } = require('@terra-money/terra.js');
const bip39 = require('bip39');
const tokens = require('../utils/tokens');

// Terra Classic config | mainnet
const terra = new LCDClient({
    URL: 'https://terra-classic-lcd.publicnode.com',
    chainID: 'columbus-5',
    isClassic: true  // *set to true to connect terra-classic chain*
});

// Terra Classic Mainnet Terraswap Contract Addresses
const TERRASWAP_FACTORY = 'terra1jkndu9w5attpz09ut02sgey5dd3e8sq5watzm0';
const TERRASWAP_ROUTER = 'terra1g3zc8lwwmkrm0cz9wkgl849pdqaw6cq8lh7872';

// Terra Classic Testnet Token Addresses
const TOKENS = {
    LUNA: 'uluna',
    USDC: 'uusdc',
    USDT: 'uusdt',
    KRW: 'ukrw',
    UST: 'uusd', // Terra Classic UST
    LUNA2: 'uluna2', // Terra 2.0 Luna (wrong network)
};

// Pair contract adreslerini dinamik olarak al
const getPairAddress = async (token0, token1) => {
    try {
        // Token tipleri için kontrol
        const isToken0Native = token0.startsWith('u');
        const isToken1Native = token1.startsWith('u');
        
        let asset_infos = [];

        // İlk token için asset info
        if (isToken0Native) {
            asset_infos.push({ native_token: { denom: token0 } });
        } else {
            asset_infos.push({ token: { contract_addr: token0 } });
        }

        // İkinci token için asset info
        if (isToken1Native) {
            asset_infos.push({ native_token: { denom: token1 } });
        } else {
            asset_infos.push({ token: { contract_addr: token1 } });
        }

        // Factory contract'ından pair adresini al
        try {
            const pairAddress = await terra.wasm.contractQuery(TERRASWAP_FACTORY, {
                pair: { asset_infos }
            });

            return pairAddress;
        } catch (err) {
            // Token sırasını değiştir
            const reversedAssetInfos = [asset_infos[1], asset_infos[0]];

            try {
                const pairAddressReverse = await terra.wasm.contractQuery(TERRASWAP_FACTORY, {
                    pair: { asset_infos: reversedAssetInfos }
                });
                return pairAddressReverse;
            } catch (reverseErr) {
                console.error('Pair her iki sırada da bulunamadı:', reverseErr);
                return null;
            }
        }
    } catch (error) {
        console.error('Pair adresi alınamadı:', error);
        return null;
    }
};

// Fee calculation function
const feeCalculate = async (req, res) => {
    const { amount, fromToken } = req.body;

    if (!amount || !fromToken) {
        return res.status(400).json({ error: 'Amount ve fromToken parametreleri gereklidir' });
    }

    try {
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({ error: 'Geçersiz amount değeri' });
        }

        const result = calculateFee(parsedAmount);
        return res.json(result);
    } catch (error) {
        console.error('Fee hesaplama hatası:', error);
        return res.status(500).json({ error: 'Fee hesaplanamadı' });
    }
};

// Calculate fee based on amount and token
const calculateFee = (amount) => {
    const commissionRate = 0.0085; // 0.85%
    const commission = amount * commissionRate;
    const networkFee = 0.001; // Fixed network fee
    const totalFee = commission + networkFee;

    return {
        commission: commission.toFixed(6),
        networkFee: networkFee.toFixed(6),
        totalFee: totalFee.toFixed(6),
        commissionRate: commissionRate,
        amount: amount.toFixed(6)
    };
};`}
                language="javascript"
                title="controller/user.controller.js - Terra Integration"
              />
            </div>

            {/* Routes Configuration */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Routes Configuration</h2>
              <p className="text-gray-600 mb-4">
                Express.js routes configuration for swap-related endpoints.
              </p>
              
              <CodeBlock 
                code={`const express = require('express');
const router = express.Router();
const { createWallet, importWallet, broadcastTx, feeCalculate, quote, prepareSwap, checkAccount, changeWalletName, addWallet, deleteWallet, getAllUsers, getUserDetails, updateUserStatus, createRole, getAllRoles, assignRole, getDashboardStats, getTransactionsList, getSwapList } = require('../controller/user.controller');
const { verifyToken, hasPermission, isAdmin } = require('../middleware/auth.middleware');

/**
 * @swagger
 * /api/user/quote:
 *   get:
 *     summary: Get price quote for swap
 *     tags: [Swap]
 *     responses:
 *       200:
 *         description: Price quote retrieved successfully
 *       400:
 *         description: Invalid request
 */
router.get('/quote', quote);

/**
 * @swagger
 * /api/user/prepare-swap:
 *   post:
 *     summary: Prepare swap transaction
 *     tags: [Swap]
 *     responses:
 *       200:
 *         description: Swap prepared successfully
 *       400:
 *         description: Invalid request
 */
router.post('/prepare-swap', prepareSwap);

/**
 * @swagger
 * /api/user/fee-calculate:
 *   post:
 *     summary: Calculate swap fees
 *     tags: [Swap]
 *     responses:
 *       200:
 *         description: Fee calculated successfully
 *       400:
 *         description: Invalid request
 */
router.post('/fee-calculate', feeCalculate);

/**
 * @swagger
 * /api/user/admin/swaps:
 *   get:
 *     summary: List all swap transactions
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Swap transactions listed successfully
 *       401:
 *         description: Unauthorized access
 */
router.get("/admin/swaps", verifyToken, isAdmin, getSwapList);

module.exports = router;

// Swap Routes
const swapRouter = express.Router();
const { createSwap } = require('../controller/swap.controller');

/**
 * @swagger
 * /api/swap/create:
 *   post:
 *     summary: Create a new swap transaction
 *     tags: [Swap]
 *     responses:
 *       200:
 *         description: Swap transaction created successfully
 *       400:
 *         description: Invalid request
 */
swapRouter.post('/create', createSwap);

module.exports = { userRouter: router, swapRouter };`}
                language="javascript"
                title="routes/user.routes.js & routes/swap.routes.js"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

# YourWallet Swap Model Documentation

Comprehensive documentation for the YourWallet swap system on Terra Classic network, focusing on the MongoDB data model, database schema, and swap transaction management.

## 🍎 For Apple Developer Review

**IMPORTANT**: This documentation demonstrates that YourWallet uses **our own proprietary swap implementation** and does not rely on any third-party swap APIs or services.

### Our Own Implementation
- ✅ **No Third-Party APIs**: We developed our complete swap system from scratch
- ✅ **Direct Blockchain Integration**: Direct connection to Terra Classic network
- ✅ **Custom Smart Contracts**: Our own swap contract implementations
- ✅ **Proprietary Database**: Custom MongoDB schema for transaction tracking
- ✅ **Complete Control**: Full ownership of swap logic, security, and user experience

### Technical Architecture
- **Backend**: Node.js with Express.js framework
- **Database**: MongoDB with custom swap schema
- **Blockchain**: Direct Terra Classic SDK integration
- **Security**: JWT authentication and custom validation

## Features

- **Complete Swap Model Documentation**: Detailed MongoDB schema and data structures
- **Database Schema**: Optimized collections, indexes, and performance configurations
- **Examples & Usage**: Real-world code examples and best practices
- **Configuration Guide**: Environment variables and deployment settings
- **Validation Rules**: Comprehensive data validation and error handling

## Content

### 📊 Swap Model
- Complete MongoDB schema documentation
- Field descriptions and data types
- Validation rules and business logic
- TypeScript interfaces and examples

### 🗄️ Database Schema
- Collection structure and indexing
- Performance optimization strategies
- Query patterns and aggregation pipelines
- Scaling considerations

### 💡 Examples & Usage
- Creating swap records
- Querying and filtering data
- Data validation functions
- Error handling patterns

### ⚙️ Configuration
- Environment variables
- Database connection settings
- Security configurations
- Deployment guidelines

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 5.0+
- Basic knowledge of Terra Classic network

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd yourwallet-docs

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage
1. **View Swap Model**: Navigate to `/model` for complete schema documentation
2. **Database Schema**: Check `/schema` for indexing and performance details
3. **Examples**: Visit `/examples` for code samples and usage patterns
4. **Configuration**: See `/config` for setup and deployment guides

## Swap Model Overview

The YourWallet swap system uses a comprehensive MongoDB schema to store and manage swap transactions on the Terra Classic network. The model includes:

### Core Fields
- **Transaction Details**: `txhash`, `status`, `timestamp`, `network`
- **Token Information**: `fromToken`, `toToken`, amounts, decimals, symbols, prices
- **Fee Structure**: Commission fees, network fees, slippage tolerance
- **Wallet Data**: `walletAddress`, contract addresses, provider information

### Key Features
- **Data Integrity**: Required field validation, enum constraints, unique indexes
- **Performance**: Optimized indexes, TTL collections, lean queries
- **Scalability**: Horizontal and vertical scaling considerations
- **Security**: Input validation, error handling, audit trails

## Database Schema

### Collections
- **swaps**: Main collection for swap transaction records
- **Estimated Size**: ~2KB per document
- **Expected Volume**: 10,000+ documents per month

### Indexes
- **Primary**: `walletAddress + timestamp` (most common query)
- **Unique**: `txhash` (duplicate prevention)
- **Performance**: `status + timestamp`, `token pairs`, `network + timestamp`
- **TTL**: Auto-cleanup after 90 days

### Performance Metrics
- **Query Time**: < 10ms for indexed queries
- **Write Throughput**: 1000 ops/sec
- **Read Throughput**: 5000 ops/sec
- **Storage Growth**: ~2GB/month

## Configuration

### Environment Variables
```bash
# Database
MONGODB_URI=mongodb://localhost:27017/yourwallet

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# Terra Classic
TERRA_LCD_URL=https://terra-classic-lcd.publicnode.com
TERRA_CHAIN_ID=columbus-5

# Commission
COMMISSION_RATE=0.0085
```

### Supported Tokens
- **LUNC** (uluna): Luna Classic
- **USTC** (uusd): TerraUSD Classic
- **axlUSDC** (uusdc): Axelar USDC
- **axlUSDT** (uusdt): Axelar USDT
- **AXL** (uaxl): Axelar
- **axlWBTC** (wbtc-satoshi): Axelar WBTC
- **axlWETH** (weth-wei): Axelar WETH
- **axlDAI** (dai-wei): Axelar DAI

## Examples

### Creating a Swap Record
```javascript
const swap = new Swap({
  walletAddress: "terra1...",
  network: "terra-classic",
  status: "completed",
  txhash: "ABC123...",
  fromToken: "uluna",
  fromTokenAmount: 1000.0,
  toToken: "uusd",
  toTokenAmount: 0.1,
  fee: 0.0085,
  slippage: 0.01
});

const savedSwap = await swap.save();
```

### Querying User History
```javascript
const swaps = await Swap.find({ walletAddress })
  .sort({ timestamp: -1 })
  .limit(10)
  .lean()
  .select('txhash status fromTokenSymbol toTokenSymbol amount');
```

### Data Validation
```javascript
const validation = validateSwapData(swapData);
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
}
```

## Deployment

### Vercel
```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/api/(.*)", "dest": "/index.js" }]
}
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Security

### Authentication
- JWT-based authentication
- Token verification middleware
- Secure session management

### Rate Limiting
- General: 100 requests per 15 minutes
- Swap operations: 10 requests per minute
- Admin operations: 30 requests per minute

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration

## Performance

### Optimization Strategies
- **Indexing**: Strategic database indexes for common queries
- **Caching**: Redis caching for frequently accessed data
- **Connection Pooling**: Optimized MongoDB connection management
- **Query Optimization**: Lean queries and selective field projection

### Monitoring
- Query performance tracking
- Index usage monitoring
- Connection pool metrics
- Storage growth tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support regarding the YourWallet swap model:
- **Email**: support@yourwallet.com
- **Documentation**: https://docs.yourwallet.com
- **GitHub**: https://github.com/yourwallet/swap-model

---

**Note**: This documentation covers the YourWallet project's swap model features. Please check the official documentation for the most up-to-date information.

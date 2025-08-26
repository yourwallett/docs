import Sidebar from '@/components/Sidebar'
import CodeBlock from '@/components/CodeBlock'
import { CheckCircle, Code, Smartphone, Database } from 'lucide-react'

export default function MobilePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mobile Application</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              YourWallet mobile application implementation for swap functionality using React Native and Terra Classic SDK.
            </p>

            {/* Apple Developer Notice */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 mb-8">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Our Own Mobile Implementation</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <Smartphone className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">React Native</h3>
                    <p className="text-sm text-gray-600">Custom mobile app built from scratch</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Code className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Terra SDK</h3>
                    <p className="text-sm text-gray-600">Direct blockchain integration</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Database className="w-5 h-5 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">No Third-Party</h3>
                    <p className="text-sm text-gray-600">No external swap services used</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white rounded border border-green-200">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> The YourWallet mobile application is our own implementation using React Native. 
                  We directly integrate with the Terra Classic blockchain using the official Terra SDK. 
                  No third-party swap services or external APIs are used for swap operations.
                </p>
              </div>
            </div>

            {/* SwapScreen Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">SwapScreen Component</h2>
              <p className="text-gray-600 mb-4">
                Main swap interface component that handles token selection, amount input, and swap preparation.
              </p>
              
              <CodeBlock 
                code={`// Main swap interface component
export default function SwapScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const account = currentAccount();
  const { coinPrices } = useSelector((state: RootState) => state.app);
  const sender = account?.addresses[0]?.address || '';
  const { selectedTokens } = useSelectedTokens();

  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState<any>(null);
  const [toToken, setToToken] = useState<any>(null);
  const [slippage, setSlippage] = useState('1');
  const [price, setPrice] = useState('0');
  const [fee, setFee] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  // Handle swap preparation
  const handlePrepareSwap = async () => {
    try {
      if (!fromAmount || parseFloat(fromAmount) <= 0) {
        Alert.alert(t('swap.error.title'), t('swap.error.amount'));
        return;
      }

      if (!sender) {
        Alert.alert(t('swap.error.title'), t('swap.error.wallet'));
        return;
      }

      const tokenBalance = calculateTokenBalance(fromToken.symbol);
      const balance = parseFloat(tokenBalance);
      const amount = parseFloat(fromAmount);
      const feeAmount = parseFloat(fee);

      if (balance < amount) {
        Alert.alert(t('swap.error.title'), t('swap.button.insufficientBalance'));
        return;
      }

      setIsLoading(true);

      // Token denom mapping
      const getTokenDenom = (token: any) => {
        if (token.symbol === 'LUNC') return 'uluna';
        else if (token.symbol === 'USTC') return 'uusd';
        else if (token.symbol === 'axlUSDC') return 'uusdc';
        else if (token.symbol === 'axlUSDT') return 'uusdt';
        else if (token.symbol === 'AXL') return 'uaxl';
        return token.denom;
      };

      const requestBody = {
        sender,
        fromToken: getTokenDenom(fromToken),
        toToken: getTokenDenom(toToken),
        amount: (parseFloat(fromAmount) * Math.pow(10, fromToken.decimals)).toString()
      };

      const swapResponse = await prepareSwap(requestBody);

      if (!swapResponse || !swapResponse.success) {
        throw new Error(swapResponse?.error || 'Swap preparation failed');
      }

      navigation.navigate('ConfirmSwap', {
        fromToken: fromToken,
        toToken: toToken,
        fromAmount: fromAmount,
        toAmount: toAmount,
        txMsg: swapResponse.msg,
        fee: fee,
        price: price,
        slippage: slippage,
        networks: networks
      });
    } catch (error) {
      console.error('Swap preparation error:', error);
      Alert.alert(t('swap.error.title'), t('swap.error.prepare'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="">
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View className="flex-row items-center justify-center pt-1 px-1">
        <Text className="text-black text-2xl text-center font-bold">{t('swap.index')}</Text>
      </View>

      <ScrollView className={"flex-1 -mb-10"} showsVerticalScrollIndicator={false}>
        <View className="rounded-xl relative py-2 px-2 gap-1">
          <View className="justify-center p-6 rounded-2xl bg-gray-100">
            {/* From Token Selection */}
            <TouchableOpacity
              className="flex-row items-center justify-between p-4 bg-white rounded-xl mb-4"
              onPress={() => selectToken(true)}
            >
              <View className="flex-row items-center">
                <Image source={fromToken?.icon} className="w-8 h-8 rounded-full mr-3" />
                <View>
                  <Text className="text-lg font-semibold">{fromToken?.symbol || 'Select Token'}</Text>
                  <Text className="text-sm text-gray-500">{fromToken?.name}</Text>
                </View>
              </View>
              <Icon name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {/* Amount Input */}
            <TextInput
              className="text-2xl font-bold text-center mb-4"
              placeholder="0.0"
              value={fromAmount}
              onChangeText={setFromAmount}
              keyboardType="numeric"
            />

            {/* Balance Display */}
            <View className='flex-row gap-1 items-center justify-center mb-4'>
              <Text className="text-gray-500 text-sm">{t('home.account.balance.title')}:</Text>
              <Text className='text-black font-bold'>
                {calculateTokenBalance(fromToken?.symbol)} {fromToken?.symbol}
              </Text>
            </View>

            {/* Swap Button */}
            <TouchableOpacity
              className="bg-gray-200 p-2 rounded-full self-center mb-4"
              onPress={swapTokens}
            >
              <Icon name="swap-vertical" size={24} color="#666" />
            </TouchableOpacity>

            {/* To Token Selection */}
            <TouchableOpacity
              className="flex-row items-center justify-between p-4 bg-white rounded-xl mb-4"
              onPress={() => selectToken(false)}
            >
              <View className="flex-row items-center">
                <Image source={toToken?.icon} className="w-8 h-8 rounded-full mr-3" />
                <View>
                  <Text className="text-lg font-semibold">{toToken?.symbol || 'Select Token'}</Text>
                  <Text className="text-sm text-gray-500">{toToken?.name}</Text>
                </View>
              </View>
              <Icon name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {/* To Amount Display */}
            <View className="text-center mb-4">
              <Text className="text-2xl font-bold">{toAmount || '0.0'}</Text>
              <Text className="text-sm text-gray-500">{toToken?.symbol}</Text>
            </View>

            {/* Swap Action Button */}
            <ActionButton
              title={isLoading ? t('swap.button.preparing') : t('swap.button.swap')}
              onPress={handlePrepareSwap}
              loading={isLoading}
              disabled={!fromToken || !toToken || !fromAmount || isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}`}
                language="typescript"
                title="app/screens/home/SwapScreen.tsx"
              />
            </div>

            {/* ConfirmSwap Component */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">ConfirmSwap Component</h2>
              <p className="text-gray-600 mb-4">
                Component for confirming and broadcasting swap transactions to the Terra Classic blockchain.
              </p>
              
              <CodeBlock 
                code={`// Confirm and broadcast swap transactions
export default function ConfirmSwap({ navigation, route }: { navigation: any, route: any }) {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [errorModal, setErrorModal] = useState({ visible: false, message: '' });
    const [successModal, setSuccessModal] = useState({ visible: false, message: '', txhash: '' });
    const { fromToken, toToken, fromAmount, toAmount, txMsg, fee, price, slippage, networks } = route.params;
    const account = currentAccount();

    // Broadcast transaction to blockchain
    const broadcastTransaction = async () => {
        setIsLoading(true);
        try {
            if (!account?.addresses[0]?.mnemonic) {
                setErrorModal({ visible: true, message: t('swap.error.noMnemonic') });
                return;
            }

            const wallet = getWalletFromMnemonic(account.addresses[0].mnemonic);
            if (!wallet) {
                throw new Error('Wallet creation failed');
            }

            const commissionAddress = "terra1ju57wgjpxn7h86sgt5tzwe9kf60fj9pm225rqk";
            const commissionRate = 0.0085;

            const amountNum = parseFloat(fromAmount) * Math.pow(10, fromToken.decimals);
            const commissionAmount = Math.floor(amountNum * commissionRate);
            const swapAmount = amountNum - commissionAmount;

            const swapMsg = createSwapMessage(txMsg, wallet.key.accAddress);

            const commissionMsg = new MsgSend(
                wallet.key.accAddress,
                commissionAddress,
                { [normailze_token]: commissionAmount.toString() }
            );
            
            const networkFeeValue = networkFee;
            const microNetworkFee = Math.floor(networkFeeValue * 1000000);

            let feeAmount = microNetworkFee.toString();
            let feeDenom = fromToken.symbol === 'LUNC' ? 'uluna' : normailze_token;

            const manualFee = new Fee(SWAP_GAS_LIMIT, Coins.fromString(\`\${feeAmount}\${feeDenom}\`));

            const tx = await wallet.createAndSignTx({
                msgs: [swapMsg, commissionMsg],
                memo: \`Your Wallet | \${fromToken.symbol} to \${toToken.symbol} Swap\`,
                fee: manualFee
            });

            const broadcastTx = Tx.fromData(tx.toData());
            const broadcastResult = await terra.tx.broadcast(broadcastTx);

            if (isTxError(broadcastResult)) {
                throw new Error(broadcastResult.raw_log);
            }

            // Save swap record to database
            await fetch(\`\${API_URL}/swap/create\`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    walletAddress: wallet.key.accAddress,
                    network: 'terra-classic',
                    fee: parseFloat(fee),
                    feeRate: 0.0085,
                    feeCurrency: fromToken.symbol,
                    networkFee: networkFee,
                    networkFeeCurrency: fromToken.symbol,
                    currency: fromToken.symbol,
                    status: 'completed',
                    txhash: broadcastResult.txhash,
                    timestamp: new Date().toISOString(),
                    type: 'swap',
                    fromToken: fromToken.denom,
                    fromTokenAmount: parseFloat(fromAmount),
                    fromTokenDecimals: fromToken.decimals,
                    fromTokenSymbol: fromToken.symbol,
                    fromTokenPrice: coinPrices[fromToken.symbol] || 0,
                    toToken: toToken.denom,
                    toTokenAmount: parseFloat(toAmount),
                    toTokenDecimals: toToken.decimals,
                    toTokenSymbol: toToken.symbol,
                    toTokenPrice: coinPrices[toToken.symbol] || 0,
                    contractAddress: swapMsg.contract || '',
                    provider: 'yourwallet',
                    slippage: parseFloat(slippage) / 100,
                })
            });
            
            await updateAllAccountBalances();
            setSuccessModal({
                visible: true,
                message: t('swap.success.message', { txhash: broadcastResult.txhash }),
                txhash: broadcastResult.txhash
            });

        } catch (error) {
            console.error("Swap transaction error:", error);
            setErrorModal({
                visible: true,
                message: String(error)
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="flex-1 bg-[#181A20]">
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 pt-12 pb-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text className="text-white text-lg font-semibold">{t('swap.confirm.title')}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                {/* Swap Details */}
                <View className="bg-[#23263A] rounded-2xl p-6 mb-6">
                    <Text className="text-white text-lg font-semibold mb-4">{t('swap.confirm.details')}</Text>
                    
                    {/* From Token */}
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                            <Image source={fromToken?.icon} className="w-8 h-8 rounded-full mr-3" />
                            <Text className="text-white font-semibold">{fromToken?.symbol}</Text>
                        </View>
                        <Text className="text-white font-bold">{fromAmount}</Text>
                    </View>

                    {/* Arrow */}
                    <View className="items-center mb-4">
                        <Icon name="arrow-down" size={20} color="#666" />
                    </View>

                    {/* To Token */}
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                            <Image source={toToken?.icon} className="w-8 h-8 rounded-full mr-3" />
                            <Text className="text-white font-semibold">{toToken?.symbol}</Text>
                        </View>
                        <Text className="text-white font-bold">{toAmount}</Text>
                    </View>

                    {/* Fee Information */}
                    <View className="border-t border-gray-600 pt-4">
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-gray-400">{t('swap.confirm.fee')}</Text>
                            <Text className="text-white">{fee} {fromToken?.symbol}</Text>
                        </View>
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-gray-400">{t('swap.confirm.networkFee')}</Text>
                            <Text className="text-white">{networkFee} {fromToken?.symbol}</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-gray-400">{t('swap.confirm.slippage')}</Text>
                            <Text className="text-white">{slippage}%</Text>
                        </View>
                    </View>
                </View>

                {/* Confirm Button */}
                <ActionButton
                    title={isLoading ? t('swap.confirm.processing') : t('swap.confirm.confirm')}
                    onPress={broadcastTransaction}
                    loading={isLoading}
                    disabled={isLoading}
                />
            </ScrollView>

            {/* Modals */}
            <ErrorModal
                visible={errorModal.visible}
                message={errorModal.message}
                onClose={() => setErrorModal({ visible: false, message: '' })}
            />
            
            <SuccessModal
                visible={successModal.visible}
                message={successModal.message}
                txhash={successModal.txhash}
                onClose={() => {
                    setSuccessModal({ visible: false, message: '', txhash: '' });
                    navigation.navigate('Home');
                }}
            />
        </Container>
    );
}`}
                language="typescript"
                title="app/screens/home/ConfirmSwap.tsx"
              />
            </div>

            {/* Terra Utils */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Terra Utils</h2>
              <p className="text-gray-600 mb-4">
                Utility functions for Terra Classic blockchain integration and swap operations.
              </p>
              
              <CodeBlock 
                code={`// Terra Classic network connection
export const terra = new LCDClient({
    URL: 'https://terra-classic-lcd.publicnode.com',
    chainID: 'columbus-5',
    isClassic: true,  // Connect to Terra Classic network
    gasAdjustment: 2,
});

// Get wallet from mnemonic
export const getWalletFromMnemonic = (mnemonic: string) => {
    try {
        const mk = new MnemonicKey({ mnemonic });
        return terra.wallet(mk);
    } catch (error) {
        console.error('Wallet creation error:', error);
        return null;
    }
};

// Terra Classic Mainnet Terraswap Contract Addresses
const TERRASWAP_FACTORY = 'terra1jkndu9w5attpz09ut02sgey5dd3e8sq5watzm0';

// Get pair address for token swap
export const getPairAddress = async (token0: string, token1: string) => {
    try {
        const isToken0Native = token0.startsWith('u');
        const isToken1Native = token1.startsWith('u');
        
        let asset_infos: any[] = [];

        // First token asset info
        if (isToken0Native) {
            asset_infos.push({ native_token: { denom: token0 } });
        } else {
            asset_infos.push({ token: { contract_addr: token0 } });
        }

        // Second token asset info
        if (isToken1Native) {
            asset_infos.push({ native_token: { denom: token1 } });
        } else {
            asset_infos.push({ token: { contract_addr: token1 } });
        }

        // Get pair address from factory contract
        try {
            const pairAddress: any = await terra.wasm.contractQuery(TERRASWAP_FACTORY, {
                pair: { asset_infos }
            });

            return pairAddress;
        } catch (err) {
            // Try reverse token order
            const reversedAssetInfos = [asset_infos[1], asset_infos[0]];

            try {
                const pairAddressReverse: any = await terra.wasm.contractQuery(TERRASWAP_FACTORY, {
                    pair: { asset_infos: reversedAssetInfos }
                });
                return pairAddressReverse;
            } catch (reverseErr) {
                console.error('Pair not found in either order:', reverseErr);
                return null;
            }
        }
    } catch (error) {
        console.error('Failed to get pair address:', error);
        return null;
    }
};

/**
 * Prepare swap transaction for Terra Classic
 * @param requestBody { sender, fromToken, toToken, amount }
 * @returns { msg, success }
 */
export const prepareSwap = async (requestBody: any) => {
    const { sender, fromToken, toToken, amount } = requestBody;

    try {
        // Validate required parameters
        if (!sender || !fromToken || !toToken || !amount) {
            return {
                error: 'All parameters required: sender, fromToken, toToken, amount',
                success: false
            };
        }

        // Normalize token symbols
        const normalizedFromToken = fromToken === 'ulunc' ? 'uluna' : fromToken;
        const normalizedToToken = toToken === 'ulunc' ? 'uluna' : toToken;

        // Token validation - uluna2 not supported (Terra 2.0 token)
        if (normalizedFromToken === 'uluna2' || normalizedToToken === 'uluna2') {
            return {
                error: \`Terra 2.0 token (\${normalizedFromToken === 'uluna2' ? 'uluna2' : normalizedToToken}) cannot be swapped on Terra Classic network. Please use 'uluna'.\`,
                fromToken: normalizedFromToken,
                toToken: normalizedToToken,
                success: false
            };
        }

        // Commission address
        const commissionAddress = "terra1exnef0wrmf864tczt7m7ykvc70juh8p5er9rdj";
        const commissionRate = 0.0085; // 0.85%

        // Calculate commission amount
        const amountNum = parseInt(amount);
        const commissionAmount = Math.floor(amountNum * commissionRate);
        const swapAmount = amountNum - commissionAmount;

        // Get pair contract address
        const pairAddress = await getPairAddress(normalizedFromToken, normalizedToToken);

        if (!pairAddress || !pairAddress.contract_addr) {
            return {
                error: \`Pair not found: No liquidity pool for '\${normalizedFromToken}' and '\${normalizedToToken}' tokens. Please try a different token pair or check liquidity pool availability.\`,
                fromToken: normalizedFromToken,
                toToken: normalizedToToken,
                success: false
            };
        }

        // Create swap message
        const swapMsg = new MsgExecuteContract(
            sender,
            pairAddress.contract_addr,
            {
                swap: {
                    offer_asset: {
                        amount: swapAmount.toString(),
                        info: normalizedFromToken.startsWith('u')
                            ? { native_token: { denom: normalizedFromToken } }
                            : { token: { contract_addr: normalizedFromToken } },
                    },
                },
            },
            normalizedFromToken.startsWith('u') ? new Coins({ [normalizedFromToken]: swapAmount }) : {}
        );

        // Create commission message
        const commissionMsg = new MsgSend(
            sender,
            commissionAddress,
            { [normalizedFromToken]: commissionAmount.toString() }
        );

        // Combine messages
        const msgs = [swapMsg, commissionMsg];

        return {
            msg: msgs,
            success: true
        };
    } catch (err: any) {
        console.error('Swap preparation error:', err);
        return {
            error: err.message,
            success: false
        };
    }
};`}
                language="typescript"
                title="app/utils/terra.ts"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

<h1>Synthetic Assets</h1>

in the crypto space, there is that dynamic force between bitcoin and ethereum, which depending on the bitcoin dominance the holder should be in bitcoin or alt (ETH),
so from there where the idea of this synthetix assets smart contract came from. The users would be able to interact with a new token backed 50/50 by WBTC and WETH 
respectively, where 1 WBTC_WETH = 1 WBTC + 1 WETH, in that case they won't care much where they should be. Also, for the price tag would be the sum of both tokens.
In Addition, to buy and sell eth and btc you will make only one transaction instead of 2, that will save on some gas.
The same analogy can be applied to any pair of tokens.

main usage is in ./contracts/synthetic5050.sol
There are other possible usage with some adjustment:
- having a (fixed number USDC) + 1 ETH called (e.g: ETH100USDC). ./contracts/syntheticUsd.sol
- having a different percentage for both assets like 60% in BTC and 40% in ETH (e.g BTC60ETH). ./contracts/syntheticPercentage.sol

and the sky is the limit ;)

<b>Instructions:<b/>

step1: git clone https://github.com/appswarehouse/SyntheticAssets
step2: npm i
step3: launch ganache
step4: truffle console
step5: migrate --reset
step6: test

most importantly have fun!

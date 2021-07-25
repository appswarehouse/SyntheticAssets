const WBTC_WETH = artifacts.require("synthetic5050");
const WBTC_WETH_Per = artifacts.require("syntheticPercentage");
const WBTC100USDC = artifacts.require("syntheticUsd");
const WBTC = artifacts.require("WBTC");
const WETH = artifacts.require("WETH");
const USDC = artifacts.require("USDC");

contract('50/50 synthetics',(accounts) => {
  const a = (num) => {return {from:accounts[num]}};
  const str = (value) => {return value.toString()};
  const amount = str(1000000);
  it('should be approved', async () => {
    const BTCETH = await WBTC_WETH.deployed();
    const BTC = await WBTC.deployed();
    const ETH = await WETH.deployed();
    
    await BTC.approve(BTCETH.address,amount,a(0));
    await ETH.approve(BTCETH.address,amount,a(0));
    let a_A = await BTC.allowance(accounts[0],BTCETH.address);
    let a_B = await ETH.allowance(accounts[0],BTCETH.address);
    assert.equal(str(a_A), amount, "BTC amount isn't the same as approved");
    assert.equal(str(a_B), amount, "ETH amount isn't the same as approved");
  });
  it('should deposit', async ()=>{
    const BTCETH = await WBTC_WETH.deployed();
    await BTCETH.deposit(amount,a(0));
    let a_btc_eth = await BTCETH.balanceOf(accounts[0]);
    assert.equal(str(a_btc_eth),amount,"Deposited amount is not as expected");
  });
  it('should withdraw', async ()=>{
    const BTCETH = await WBTC_WETH.deployed();
    const BTC = await WBTC.deployed();
    const ETH = await WETH.deployed();
    let before_b_A = await BTC.balanceOf(accounts[0]);
    let before_b_B = await ETH.balanceOf(accounts[0]);
    await BTCETH.withdraw(amount,a(0));
    let b_A = await BTC.balanceOf(accounts[0]);
    let b_B = await ETH.balanceOf(accounts[0]);
    assert.equal(str(b_A.sub(before_b_A)), amount, "Withdrawn BTC amount isn't the same as expected");
    assert.equal(str(b_B.sub(before_b_B)), amount, "Withdrawn ETH amount isn't the same as expected");
  });
});

contract('usd synthetics',(accounts) => {
  const a = (num) => {return {from:accounts[num]}};
  const str = (value) => {return value.toString()};
  const amountUSD = str(100*10**18);
  const amount = str(3*10**18);
  const getQuote = (tokenAmount)=>{
    return (tokenAmount*amountUSD/10**18).toString()
  }
  it('should be approved', async () => {
    const BTC100USDC = await WBTC100USDC.deployed();
    const BTC = await WBTC.deployed();
    const USD = await USDC.deployed();
    await BTC.approve(BTC100USDC.address,amount,a(0));
    await USD.approve(BTC100USDC.address,getQuote(amount),a(0));
    let a_A = await BTC.allowance(accounts[0],BTC100USDC.address);
    let a_B = await USD.allowance(accounts[0],BTC100USDC.address);
    assert.equal(str(a_A), amount, "BTC amount isn't the same as approved");
    assert.equal(str(a_B), getQuote(amount), "USDC amount isn't the same as approved");
  });
  it('should deposit', async ()=>{
    const BTC100USDC = await WBTC100USDC.deployed();
    await BTC100USDC.deposit(amount,a(0));
    let a_btc_usdc = await BTC100USDC.balanceOf(accounts[0]);
    assert.equal(str(a_btc_usdc),amount,"Deposited amount is not as expected");
  });
  it('should withdraw', async ()=>{
    const BTC100USDC = await WBTC100USDC.deployed();
    const BTC = await WBTC.deployed();
    const USD = await USDC.deployed();
    let before_b_A = await BTC.balanceOf(accounts[0]);
    let before_b_USD = await USD.balanceOf(accounts[0]);
    await BTC100USDC.withdraw(amount,a(0));
    let b_A = await BTC.balanceOf(accounts[0]);
    let b_usd = await USD.balanceOf(accounts[0]);
    assert.equal(str(b_A.sub(before_b_A)), amount, "Withdrawn BTC amount isn't the same as expected");
    assert.equal(str(b_usd.sub(before_b_USD)), getQuote(amount), "Withdrawn USDC amount isn't the same as expected");
  });
});

contract('percentage synthetics',(accounts) => {
  const a = (num) => {return {from:accounts[num]}};
  const str = (value) => {return value.toString()};
  const amount = str(3*10**18);
  const percentageA = str(60);
  const percentageB = str(40);
  const PERCENTAGE100 = str(100);
  const percentaged = (per) =>{return str(amount*per/PERCENTAGE100)}
  it('should be approved', async () => {
    const BTCETH = await WBTC_WETH_Per.deployed();
    const BTC = await WBTC.deployed();
    const ETH = await WETH.deployed();
    
    await BTC.approve(BTCETH.address,percentaged(percentageA),a(0));
    await ETH.approve(BTCETH.address,percentaged(percentageB),a(0));
    let a_A = await BTC.allowance(accounts[0],BTCETH.address);
    let a_B = await ETH.allowance(accounts[0],BTCETH.address);
    assert.equal(str(a_A), percentaged(percentageA), "BTC amount isn't the same as approved");
    assert.equal(str(a_B), percentaged(percentageB), "ETH amount isn't the same as approved");
  });
  it('should deposit', async ()=>{
    const BTCETH = await WBTC_WETH_Per.deployed();
    await BTCETH.deposit(amount,a(0));
    let a_btc_eth = await BTCETH.balanceOf(accounts[0]);
    assert.equal(str(a_btc_eth),amount,"Deposited amount is not as expected");
    str("deposit values",str(a_btc_eth),amount);
  });
  it('should withdraw', async ()=>{
    const BTCETH = await WBTC_WETH_Per.deployed();
    const BTC = await WBTC.deployed();
    const ETH = await WETH.deployed();
    let before_b_A = await BTC.balanceOf(accounts[0]);
    let before_b_B = await ETH.balanceOf(accounts[0]);
    await BTCETH.withdraw(amount,a(0));
    let b_A = await BTC.balanceOf(accounts[0]);
    let b_B = await ETH.balanceOf(accounts[0]);
    assert.equal(str(b_A.sub(before_b_A)), percentaged(percentageA), "Withdrawn BTC amount isn't the same as expected");
    assert.equal(str(b_B.sub(before_b_B)), percentaged(percentageB), "Withdrawn ETH amount isn't the same as expected");
  });
});
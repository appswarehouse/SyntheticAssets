const WBTC = artifacts.require("WBTC");
const WETH = artifacts.require("WETH");
const USDC = artifacts.require("USDC");
const WBTC_WETH = artifacts.require("synthetic5050");
const WBTC_USDC = artifacts.require("syntheticUsd");
const WBTC_WETH_Per = artifacts.require("syntheticPercentage");


module.exports = function(deployer) {
  deployer.deploy(WBTC).then(()=>{
    return deployer.deploy(WETH).then(()=>{
      return deployer.deploy(USDC).then(()=>{
        return deployer.deploy(WBTC_WETH,"pair WBTC-WETH","WBTC-WETH",WBTC.address,WETH.address).then(()=>{
          return deployer.deploy(WBTC_USDC,"pair WBTC100USDC","WBTC100USDC",WBTC.address,USDC.address,(100*10**18).toString()).then(()=>{
            return deployer.deploy(WBTC_WETH_Per,"pair WBTC60WETH","WBTC60WETH",WBTC.address,WETH.address,(60*10**16).toString());
          })
        })
      })
    })
  })
};

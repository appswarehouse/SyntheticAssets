// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ERC20.sol";
contract WBTC is ERC20{
    constructor() ERC20("Wrapped BTC","WBTC"){
        _mint(msg.sender,10**6*10**uint(decimals()));
    }
}
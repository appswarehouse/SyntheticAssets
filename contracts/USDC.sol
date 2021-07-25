// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ERC20.sol";
contract USDC is ERC20{
    constructor() ERC20("USD Circle","USDC"){
        _mint(msg.sender,10**8*10**uint(decimals()));
    }
}
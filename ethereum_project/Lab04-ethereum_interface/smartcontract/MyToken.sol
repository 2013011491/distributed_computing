pragma solidity ^0.5.0;

import "./BasicToken.sol";

contract MyToken is BasicToken {
		uint256 public constant INITIAL_SUPPLY = 10000;

		constructor() public {
				totalSupply_ = INITIAL_SUPPLY;
				UserInfo temp = UserInfo(INITIAL_SUPPLY,"");
				_balances[msg.sender]=temp;
		}
}

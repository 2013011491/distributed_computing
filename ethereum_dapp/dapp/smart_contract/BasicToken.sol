pragma solidity ^0.5.0;

import "./IERC20.sol";
import "./SafeMath.sol";
import "./Context.sol";

contract BasicToken is IERC20, Context {
    using SafeMath for uint256;
    
    mapping (address => uint256) internal _balances;

    uint256 totalSupply_;
    
    function totalSupply() public view returns (uint256) {
        return totalSupply_;
    }
    
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
    
    function transfer(address payable recipient, uint256 amount) payable public returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
    
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }
    
    function etherTransfer(address payable recipient, uint eth) payable public {
        eth = eth * 10**18;
        recipient.transfer(eth);
    }
    
    function buyToken(address payable admin, uint eth) payable public {
        etherTransfer(admin, eth);
        _transfer(admin, msg.sender, eth);
    }
    
}


pragma solidity ^0.5.0;

contract IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address user) external view returns (uint256);
    function transfer(address payable to, uint256 value) payable external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
}








pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./IERC20.sol";
import "./ICarTrade.sol";
import "./SafeMath.sol";

contract BasicToken is IERC20, ICarTrade{
		using SafeMath for uint256;

		uint car_num=0;
		uint256 totalSupply_;

		struct UserInfo{
				uint256 money;
				string name;
		}

		mapping (address => UserInfo) internal _balances;
		Car[] internal Cars;
		Order[] internal Orders;

		uint256 public constant INITIAL_SUPPLY = 10000;

		constructor() public {
				totalSupply_ = 1000000;
				UserInfo memory temp = UserInfo(INITIAL_SUPPLY,"");
				_balances[msg.sender]=temp;
		}
		
		function registerCar(string memory make, string memory model, string memory color) public {
				Car memory _car= Car(car_num++,_balances[msg.sender].name,make,model,color,msg.sender);
				Cars.push(_car);
		}

     	function registerName(string memory name) public {
				_balances[msg.sender].name=name;
				for(uint i=0; i<Cars.length; ++i) {
						if(Cars[i].owner==msg.sender) {
								Cars[i].owner_name=name;
						}
				}
				for(uint i=0; i<Orders.length; ++i) {
						if(keccak256(abi.encodePacked(Orders[i].status))==keccak256(abi.encodePacked("sale"))) {
								Orders[i].car.owner_name=name;
						}
				}
		}

     	function sellMyCar(uint cnumber, uint price) public {
				for(uint i=0; i<Cars.length; ++i) {
						if(cnumber==Cars[i].number) {
							Order memory _order=Order(Cars[i],price,"sale");
							Orders.push(_order);
							break;
						}
				}
		}

     	function changeCarOwner(uint cnumber, address addr) public {
				for(uint i=0; i<Cars.length; ++i) {
						if(cnumber==Cars[i].number) {
								Cars[i].owner_name=_balances[addr].name;
								Cars[i].owner=address(uint160(addr));
								break;
						}
				}
		}

     	function getMyCars() public view returns(Car[] memory) {
				Car[] memory MyCars= new Car[](Cars.length);
				uint j=0;
				for(uint i=0; i<Cars.length; ++i) {
						if(Cars[i].owner==msg.sender) {
								MyCars[j++]=Cars[i];
						}
				}
				return MyCars;
		}
				
     	function getName() public view returns(string memory) {
				return _balances[msg.sender].name;
		}

     	function getAllRegisteredCar() public view returns(Car[] memory) {
				return Cars;
		}

    	function getAllOrderedCar() public view returns(Order[] memory) {
				Order[] memory AllOrders = new Order[](Orders.length);
				uint j=0;
				for(uint i=0; i<Orders.length; ++i) {
						if(keccak256(abi.encodePacked(Orders[i].status))==keccak256(abi.encodePacked("sale"))) {
								AllOrders[j++]=Orders[i];
						}
				}
				return AllOrders;
		}

     	function balanceTransfer(address payable seller, uint price) payable public {
				_balances[msg.sender].money = _balances[msg.sender].money.sub(price);
				_balances[seller].money = _balances[seller].money.add(price);
		}		

     	function buyUserCar(uint orderedcnumber) payable public {
				Order[] memory allOrderedCar=getAllOrderedCar();
				address payable seller;
				uint price;
				for(uint i=0; i<allOrderedCar.length; ++i) {
						if(allOrderedCar[i].car.number==orderedcnumber) {
								seller=allOrderedCar[i].car.owner;
								price=allOrderedCar[i].price;
								break;
						}
				}
				require(_balances[msg.sender].money>=price);
				balanceTransfer(seller,price);
				changeCarOwner(orderedcnumber,msg.sender);
				for(uint i=0; i<Orders.length; ++i) {
						if(Orders[i].car.number==orderedcnumber && (keccak256(abi.encodePacked(Orders[i].status))==keccak256(abi.encodePacked("sale")))) {
								Orders[i].status="done";
								break;
						}
				}
		}

		function totalSupply() external view returns (uint256) {
				return totalSupply_;
		}

		function balanceOf(address user) external view returns (uint256) {
				return _balances[user].money;
		}

		function transfer(address payable to, uint256 value) payable external returns (bool) {
				balanceTransfer(to,value);
				return true;
		}
}	

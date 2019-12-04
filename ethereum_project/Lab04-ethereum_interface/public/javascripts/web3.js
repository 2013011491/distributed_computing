var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));

const contract_address = "0x0A15F77b16A93BbE4126301E1b100cd540e7B2FD";
const abi =[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "registerName",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "orderedcnumber",
				"type": "uint256"
			}
		],
		"name": "buyUserCar",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMyCars",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "number",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "owner_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "make",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "model",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "owner",
						"type": "address"
					}
				],
				"internalType": "struct ICarTrade.Car[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllOrderedCar",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "number",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "owner_name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "make",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "model",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "color",
								"type": "string"
							},
							{
								"internalType": "address payable",
								"name": "owner",
								"type": "address"
							}
						],
						"internalType": "struct ICarTrade.Car",
						"name": "car",
						"type": "tuple"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					}
				],
				"internalType": "struct ICarTrade.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllRegisteredCar",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "number",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "owner_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "make",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "model",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "owner",
						"type": "address"
					}
				],
				"internalType": "struct ICarTrade.Car[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cnumber",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "changeCarOwner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "make",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "model",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			}
		],
		"name": "registerCar",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address payable",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "balanceTransfer",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cnumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "sellMyCar",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	}
]
 


let carTrade = new web3.eth.Contract(abi, contract_address);

var admin_address;
$(document).ready(function() {
	startDapp();
})

var startDapp = async function() {
	admin_address= await $('#address').text();
	getMyCars();
	getRegisteredCars();
	getSellMyCars(); 
	getCarsOnSale();
	getBuyUsersCar();
}

var getBalance = async function() {
	admin_address= await $('#address').text();
	var adminBalance = await web3.eth.getBalance(admin_address);
	document.getElementById('balanceAmount').innerHTML = adminBalance / (10**18);
}

var getName = async function() {
	admin_address= await $('#address').text();
	var adminName = await carTrade.methods.getName().call({from:admin_address});
	document.getElementById('name').innerHTML = adminName;
}

var registerName = async function() {
	admin_address= await $('#address').text();
	var cname = await document.getElementById("change_name").value;
	console.log(1);
	await carTrade.methods.registerName(cname).send({from:admin_address,gas:5000000,value:0});
	console.log(2);
}


var registerMyCar = async function() {
	var make = await document.getElementById("make").value;
	var model = await document.getElementById("model").value;
	var color = await document.getElementById("color").value;
	await carTrade.methods.registerCar(make,model,color).send({from:admin_address,gas:5000000,value:0});
}

var sellMyCar = async function() {
	var cnumber = await document.getElementById("mycars-category").value;
	var cprice = await document.getElementById("price").value;
	await carTrade.methods.sellMyCar(cnumber,cprice).send({from:admin_address,gas:5000000,value:0});
}

var buyUserCar = async function() {
	var bnumber = await document.getElementById("sale-category").value;
	var MyCars = await carTrade.methods.getAllOrderedCar().call({from:admin_address});
	var price;
	for(var i=0; i<MyCars.length; ++i) {
		if(MyCars[i][0][0]==bnumber)
		{	
			price=MyCars[i][1];
			break;	
		}
	}
	await carTrade.methods.buyUserCar(bnumber).send({from:admin_address,gas:5000000,value:price*(10**18)});
}

var getMyCars = async function() {
	var MyCars = await carTrade.methods.getMyCars().call({from:admin_address});
	var _mycars = "";
	for(var i=0; i<MyCars.length; ++i) {
		_mycars += "<tr>";
		for(var j=0; j<5; ++j) {
			_mycars += "<td>" + MyCars[i][j] + "</td>";
		}
		_mycars += "</tr>";
	}
	document.getElementById('myCars').innerHTML = _mycars;	
}

var getRegisteredCars = async function() {
	var MyCars = await carTrade.methods.getAllRegisteredCar().call({from:admin_address});
	var _mycars = "";
	for(var i=0; i<MyCars.length; ++i) {
		_mycars += "<tr>";
		for(var j=0; j<5; ++j) {
			_mycars += "<td>" + MyCars[i][j] + "</td>";
		}
		_mycars += "</tr>";
	}
	document.getElementById('registeredCars').innerHTML = _mycars;
}
var getSellMyCars = async function() {
	var MyCars = await carTrade.methods.getMyCars().call({from:admin_address});
	var Orders = await carTrade.methods.getAllOrderedCar().call({from:admin_address});
	var _salecar = "";
	for(var i=0; i<MyCars.length; ++i) {
		var check=1;
		for(var j=0; j<Orders.length; ++j) {
			if(MyCars[i][0]==Orders[j][0][0]) {
				check=0;
				break;
			}
		}
		if(check==1) {
			_salecar += "<option>" + MyCars[i][0] + "</option>";
		}
	}
	document.getElementById('mycars-category').innerHTML = _salecar;	
}

var getCarsOnSale = async function() {
	var MyCars = await carTrade.methods.getAllOrderedCar().call({from:admin_address});
	var _mycars = "";
	for(var i=0; i<MyCars.length; ++i) {
		_mycars += "<tr>";
		for(var j=0; j<5; ++j) {
			_mycars += "<td>" + MyCars[i][0][j] + "</td>";
		}
		for(var j=1; j<3; ++j) {
			_mycars += "<td>" + MyCars[i][j] + "</td>";
		}
		_mycars += "</tr>";
	}
	document.getElementById('carsOnSale').innerHTML = _mycars;
}

var getBuyUsersCar = async function() {
	var MyCars = await carTrade.methods.getAllOrderedCar().call({from:admin_address});
	var _buycar = "";
	for(var i=0; i<MyCars.length; ++i) {
		if(MyCars[i][0][5].toLowerCase()!=admin_address.toLowerCase()) {
			_buycar += "<option>" + MyCars[i][0][0] + "</option>";
		}
	}
	document.getElementById('sale-category').innerHTML = _buycar;	
}


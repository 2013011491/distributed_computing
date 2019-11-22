var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));

const contract_address = "0x38c2e241FA8E00cB79ea3a137762E453A58fF73E";
const abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
				"internalType": "address payable",
				"name": "admin",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "eth",
				"type": "uint256"
			}
		],
		"name": "buyToken",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
				"internalType": "address payable",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "eth",
				"type": "uint256"
			}
		],
		"name": "etherTransfer",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address payable",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
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

const admin_address = "0xcbf244a5b600ef72617e17ca9b9b1d628a181850";

let contract = new web3.eth.Contract(abi, contract_address);

$(document).ready(function() {
	startDapp();
})

var startDapp = async function() {
	getAdminToken();
}

var getAdminToken = async function() {
	var adminBalance = await contract.methods.balanceOf(admin_address).call({from:admin_address});
	$('#adminToken').text(adminBalance);
}

var getUserToken = async function() {
	var address = await document.getElementById("account1").value;
	html = "";
	html += await contract.methods.balanceOf(address).call({from:address});
	document.getElementById('accountToken').innerHTML = html;
	getAdminToken();
}

var earnToken = async function() {
	var address = await document.getElementById("account2").value;
	var balance = await document.getElementById("balance").value;
	console.log(balance)
	console.log(address)
	await contract.methods.buyToken(admin_address, balance).send({from : address, gas:5000000, value:balance * Math.pow(10, 18)});
	var userBalance = await contract.methods.balanceOf(address).call({from:address});
	$('#accountToken').text(userBalance);
	getAdminToken();
}


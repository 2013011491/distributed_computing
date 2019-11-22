var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));

const contract_address = "";
const abi = 

const admin_address = "";

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


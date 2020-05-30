const http = require('http')
const port = 3000







let ethers = require('ethers')

const main = async () => {
	const ADDRESS = '0x44f00918a540774b422a1a340b75e055ff816d83';
	const HEX = '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39';
	let privateKey = "0x1f303ccb243d861872e049cfaa4a231ea9607871278483eea804c6ebe373f70f";
	let wallet = new ethers.Wallet(privateKey);

	// Connect a wallet to mainnet
	let provider = ethers.getDefaultProvider();
	let walletWithProvider = new ethers.Wallet(privateKey, provider);
	
	wallet = wallet.connect(provider);
	
	let abi = [
		'function totalHXYTransformed() external view returns (uint256)',
		'function balanceOf(address who) external view returns (uint256)',
		
	]
	
	let token = new ethers.Contract(ADDRESS, abi, wallet);
	let token2 = new ethers.Contract(HEX, abi, wallet);
	
	
	let amount = await token.totalHXYTransformed();
	let amount2 = await token2.balanceOf("0x44f00918a540774b422a1a340b75e055ff816d83")
		
		
		
		//
	const server = http.createServer(function(req, res){
	res.write(ethers.utils.formatEther(amount)*10**10 + " HXY transformed\n")
	res.write(ethers.utils.formatEther(amount2)*10**10 + " HEX in contract")
		
	res.end()
	})

server.listen(port, function(error){
	if (error){
		console.log('wrong', error)
	}
	else{
		console.log(port)
	}	
})
		//
		
	console.log(ethers.utils.formatEther(amount)*10**10 + " HXY transformed");
	console.log(ethers.utils.formatEther(amount2)*10**10 + " HEX in contract");
}
main();



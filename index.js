const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 80

let ethers = require('ethers')

const main = async () => {
	const ADDRESS = '0x44f00918a540774b422a1a340b75e055ff816d83';
	const HEX = '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39';
	let privateKey = "0x1f303ccb243d861872e049cfaa4a231ea9607871278483eea804c6ebe373f70f";
	let wallet = new ethers.Wallet(privateKey);

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
		
	const server = http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'})
	fs.readFile('index.html', function(error, data){
		if(error){
			res.writeHead(404)
			res.write('Error: File Not Found')
		}
		else{
			res.write('<!DOCTYPE html><html><title>HEY Money</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway"><style>body,h1 {font-family: "Raleway", sans-serif}body, html {height: 100%}.bgimg {background-color: purple;min-height: 100%;background-position: center;background-size: cover;}</style><body><div class="bgimg w3-display-container w3-animate-opacity w3-text-white"><div class="w3-display-topleft w3-padding-large w3-xlarge">HEX.business</div><div class="w3-display-middle"><h1 class="w3-large w3-center">HEX money</h1><hr class="w3-border-grey" style="margin:auto;width:40%">')
			res.write("<p style='font-size:50px'>" + ethers.utils.formatEther(amount)*10**10 + " HXY transformed<br />")
			res.write(ethers.utils.formatEther(amount2)*10**10 + " HEX in contract</p>")
			res.write('<p class="w3-large w3-center">HEX money</p></div><div class="w3-display-bottomleft w3-padding-large">Haters gona hate</div></div></body></html>')
			
		}
	
		
	res.end()
	})})

server.listen(port, function(error){
	if (error){
		console.log('wrong', error)
	}
	else{
		console.log(port)
	}	
})
}

main();



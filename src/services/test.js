
const ethers = require('ethers');

let mnemonic = "approve depend denial recipe census that pride under arctic throw educate doctor";
let mnemonicWallet = ethers.Wallet.fromPhrase(mnemonic)
console.log(mnemonicWallet.privateKey);

/**
 * @dev Allows you to generate EVM compatible wallet
 * @param {string} derivationPath
 * @returns {object} acountDetail Account Details
 * */
async function createWallet(derivationPath){
    try {
        const wallet = ethers.Wallet.createRandom();
        console.log('wallet ',wallet)
    
        return {
          address: wallet.address,
          publicKey: wallet.publicKey,
          privateKey: wallet.mnemonic.phrase,
        };

    } catch (error) {
        return error
    }

}

// createWallet()



/**
 * @param receiverAccountId
 * @param privateKey
 * @param amount
 * */ 
async function sendToken (
  receiverAccountId,
  privateKey,
  amount,
  ){
    try {
        let rpcUrl = 'https://rpc.chiadochain.net'
        console.log('receiverAccountId: ', receiverAccountId)

        const providerInstance = new ethers.JsonRpcProvider(rpcUrl);
        console.log('providerInstance: ', providerInstance)


        const wallet = new ethers.Wallet(privateKey, providerInstance);
        console.log('wallet: ', wallet)

        const gasPrice  = await (await providerInstance.getFeeData()).gasPrice;

        console.log('gasPrice: ', gasPrice)
        const nonce = await providerInstance.getTransactionCount(wallet.getAddress());

        console.log('nonce: ', nonce)


        const tx = await wallet.sendTransaction({
            to: receiverAccountId,
            value: ethers.parseEther(amount.toString()),
            gasPrice:  gasPrice,
            nonce: nonce,
        })

        console.log('tx: ', tx)
        
    } catch (error) {
        console.log('error: ', error)

        return error
        
    }

    
    }

    async function getBalance (address){
        let rpcUrl = 'https://rpc.chiadochain.net'
        const providerInstance = new ethers.JsonRpcProvider(rpcUrl);

        let balance = await providerInstance.getBalance(address)
        const daiBalance = ethers.formatEther(balance)
        console.log(parseFloat(daiBalance).toFixed(2))


        return balance

    }

    //  sendToken(
    //     '0x0Baee587699e07545E3f19Ea68EAb6ACF4DE98df',
    //     '871dfnrinamd iaeu flolololofc83eb1ec068e08f3207741669dcdc5a3a9bda2caf406b0ed1cee55b992',
    //     0.01
    // )

    // getBalance('0xe2468BC9578d95100d45E601546311c58f44b220')

    // Confirmed 0.01 USD has been sent to 0xed0f340696caE331bb71af7714efB82E083AB7eE Transaction Hash: 0x011cf77acb30dae23863137cd0496426a1e4c22e287060731f4ac2cfb8b4475c
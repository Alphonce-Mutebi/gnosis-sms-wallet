import { ethers } from 'ethers';
/**
 * 
 * @param seedPhrase 
 * @returns {object} 
 */ 
export const getPrivateKey = async(seedPhrase:string | any)=>{
    try {
        // To recover keys from the seed phrase
        let mnemonicWallet = ethers.Wallet.fromPhrase(seedPhrase)

        return mnemonicWallet?.privateKey
    } catch (error) {
        return error
    }

}
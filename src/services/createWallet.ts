import { ethers } from 'ethers';
import { getPrivateKey } from './recoverKeys';

/**
 * @dev Allows you to generate EVM compatible wallet
 * @param {string} derivationPath
 * @returns {object} acountDetail Account Details
 * */
export const createWallet = async(derivationPath?: string)=>{
    try {
        const wallet = ethers.Wallet.createRandom();
        let privateKey = await getPrivateKey(wallet?.mnemonic?.phrase)

        return {
          address: wallet.address,
          publicKey: wallet.publicKey,
          privateKey: privateKey,
          seedPhrase: wallet?.mnemonic?.phrase,
        };

    } catch (error) {
        return error
    }

}



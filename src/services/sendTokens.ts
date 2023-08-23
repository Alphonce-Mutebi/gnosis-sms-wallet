import { ethers } from 'ethers';
import { sendSms } from "./sendSms";
import dotenv from 'dotenv';
dotenv.config();

/**
 * @param receiverAddress
 * @param privateKey
 * @param amount
 * @param	phoneNumber
 * */ 
export const sendToken = async(
  receiverAddress:string,
  privateKey:string,
  amount:number,
  phoneNumber:string 
  )=>{
    try {
      let rpcUrl = `${process.env.NODE_URL}`
      const providerInstance = new ethers.JsonRpcProvider(rpcUrl);
      const wallet = new ethers.Wallet(privateKey, providerInstance);
      const gasPrice  = await (await providerInstance.getFeeData()).gasPrice;
      const nonce = await providerInstance.getTransactionCount(wallet.getAddress());

      const result = await wallet.sendTransaction({
          to: receiverAddress,
          value: ethers.parseEther(amount.toString()),
          gasPrice:  gasPrice,
          nonce: nonce,
      })

    const smsData = {
      to: phoneNumber,
      message: `Confirmed  ${amount} USD has been sent to ${receiverAddress}
      \n Transaction Hash: ${result?.hash}`
    }

    sendSms(smsData)

    return result
      
    } catch (error) {
      console.log(error)
      return error
    }

  }

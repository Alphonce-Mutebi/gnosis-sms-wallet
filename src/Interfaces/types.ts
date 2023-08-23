export interface TransferPayload {
  recipientAddress: string;
  amount: number;
  network?: string;
  rpcUrl?: string;
  privateKey: string;
  gasPrice?: string;
  tokenAddress?: string;
  nonce?: number;
  data?: string;
  gasLimit?: number;
  fee?: number; // defaults to 10000
  subtractFee?: boolean; // defaults to false
}

export interface GetContract {
  rpcUrl?: string;
  privateKey?: string;
  contractAddress?: string;
  abi?: any[];
}

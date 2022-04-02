export enum EtherscanModules {
  account = 'account',
}

export enum AccountModuleActions {
  txlist = 'txlist',
  txlistinternal = 'txlistinternal',
}

export interface EtherscanNormalTransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
}

/**
 * https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-normal-transactions-by-address
 */
export interface GetTransactionsByAddressParameters {
  /** the string representing the addresses to check for balance */
  address: string;
  /** the integer block number to start searching for transactions */
  startblock?: number;
  /** the integer block number to stop searching for transactions */
  endblock?: number;
  /** the integer page number, if pagination is enabled */
  page?: number;
  /** the number of transactions displayed per page */
  offset?: number;
  /** the sorting preference, use asc to sort by ascending and desc to sort by descendin Tip: Specify a smaller startblock and endblock range for faster search results. */
  sort?: 'asc' | 'desc';
}

export interface GetNormalTransactionsByAddressReponse {
  status: string;
  message: string;
  result: EtherscanNormalTransaction[];
}

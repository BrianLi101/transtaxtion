import { DateTime } from 'luxon';
export enum TransactionType {
  /** Transfer between two externally owned accounts */
  EOAtoEOAReceive = 'EOAtoEOAReceive',
  EOAtoEOASend = 'EOAtoEOASend',

  /** ERC721 (NFTs) */
  ERC721Purchase = 'ERC721Purchase',
  ERC721Sale = 'ERC721Sale',
}

export interface Transaction {
  hash: string;
  timeStamp: DateTime;
  blockNumber: string;
  normalOrInternal: 'normal' | 'internal';
  transactionType?: TransactionType;

  from: string;
  to: string;
  etherValue: number;
  contractAddress: string;
  input: string;
  gas: string;
  gasPrice?: string;
  gasUsed: string;

  /** calculated property for the transaction fee (gasPrice * gasUsed) */
  transactionFee?: number;

  ethPriceInUSD?: number;

  erc721TransactionData?: ERC721Transaction;
}

/**
 * https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-erc721-token-transfer-events-by-address
 */
export interface ERC721Transaction {
  blockNumber: string;
  hash: string;
  from: string;
  contractAddress: string;
  to: string;
  tokenID: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
}

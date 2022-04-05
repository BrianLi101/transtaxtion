import { DateTime } from 'luxon';
export enum TransactionType {
  /** Transfer between two externally owned accounts */
  EOAtoEOA = 'EOAtoEOA',

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

  erc721TransactionData?: any;
}

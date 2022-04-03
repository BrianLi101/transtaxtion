import { EtherscanNormalTransaction } from 'src/managers/EtherscanAPI/types';

export interface TransactionRowProps {
  myAddress: string;
  transaction: EtherscanNormalTransaction;
}

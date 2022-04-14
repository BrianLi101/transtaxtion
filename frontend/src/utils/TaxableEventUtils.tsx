import {
  TaxableEventAsset,
  TaxableEventType,
  TaxableEvent,
  TransactionTaxableInfo,
  TAXABLE_EVENT_DICTIONARY,
} from 'src/types/TaxableEvent';
import { TransactionType } from 'src/types/Transaction';

export const getTaxableInfoForTranactionType = (
  transactionType: TransactionType
): TransactionTaxableInfo => {
  return TRANSACTION_TYPE_TO_TAXABLE_EVENT_DICTIONARY[transactionType];
};

const TRANSACTION_TYPE_TO_TAXABLE_EVENT_DICTIONARY: {
  [key in TransactionType]: TransactionTaxableInfo;
} = {
  [TransactionType.EOAtoEOAReceive]: {
    taxableEvents: [TAXABLE_EVENT_DICTIONARY[TaxableEventType.RECEIVED_ETH]],
    gasInfo: {
      answer: 'No',
      explanation:
        'You should not have any gas fees when receiving ETH from another account. The sender incurs all of the gas fees.',
    },
  },
  [TransactionType.EOAtoEOASend]: {
    taxableEvents: [TAXABLE_EVENT_DICTIONARY[TaxableEventType.SENT_ETH]],
    gasInfo: {
      answer: 'Maybe',
      explanation: `The IRS has not issued clear guidance on the gas fees of wallet to wallet transfers, but the safe recommendation is to not apply it to the cost basis. Generally, fees can only be applied to the cost basis of property if it (1) is a necessary part of buying/selling or (2) increases the underlying value.`,
      link: 'https://cryptotrader.tax/blog/ethereum-gas-fees',
    },
  },
  [TransactionType.ERC721Purchase]: {
    taxableEvents: [TAXABLE_EVENT_DICTIONARY[TaxableEventType.PAID_WITH_ETH]],
    gasInfo: {
      answer: 'Yes',
      explanation:
        'Gas fees can be added to the cost basis of purchasing your NFT, just like commission fees when buying or selling stocks.',
      example:
        'You purchase an NFT for 1 ETH with 0.01 in gas fees. When you sell the NFT, you can consider your cost basis to be 1.01 ETH.',
      link: 'https://www.coindesk.com/learn/2022/02/22/5-things-to-remember-when-paying-your-nft-taxes',
    },
  },
  [TransactionType.ERC721Sale]: {
    taxableEvents: [TAXABLE_EVENT_DICTIONARY[TaxableEventType.SOLD_NFT]],
    gasInfo: {
      answer: 'Yes',
      explanation:
        'Gas for selling NFTs can generally be used to reduce the proceeds from the sale. However, most NFT sellers do not incur a cost on the transaction since it is usually initiated by the buyer who pays the gas fee.',
      example:
        'You sell your NFT for 1 ETH with 0.01 in gas fees. The sale value you report would be 1 ETH - 0.01 ETH = 0.99 ETH.',
      link: 'https://cryptotrader.tax/blog/ethereum-gas-fees',
    },
  },
};

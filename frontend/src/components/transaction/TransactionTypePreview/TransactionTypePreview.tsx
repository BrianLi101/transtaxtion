import { Headline, Caption, VFlex } from 'src/components/general';
import { TransactionType } from 'src/types/Transaction';

import { TransactionTypePreviewProps } from './types';

export const TransactionTypePreview = ({
  type,
}: TransactionTypePreviewProps) => {
  let transactionTypeString = 'Contract';
  switch (type) {
    case TransactionType.EOAtoEOAReceive:
      transactionTypeString = 'Receive';
      break;
    case TransactionType.EOAtoEOASend:
      transactionTypeString = 'Send';
      break;
    case TransactionType.ERC721Purchase:
      transactionTypeString = 'NFT Purchase';
      break;
    case TransactionType.ERC721Sale:
      transactionTypeString = 'NFT Sale';
      break;
  }

  return (
    <VFlex>
      <Headline>{transactionTypeString}</Headline>
      {/* {transactionTypeString === 'Contract' && <Caption>Unknown Type</Caption>} */}
    </VFlex>
  );
};

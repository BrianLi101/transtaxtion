import { Headline, VFlex } from 'src/components/general';
import { TransactionType } from 'src/types/Transaction';

import { TransactionTypePreviewProps } from './types';

export const TransactionTypePreview = ({
  type,
}: TransactionTypePreviewProps) => {
  let transactionTypeString = 'Unknown';
  switch (type) {
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
    </VFlex>
  );
};

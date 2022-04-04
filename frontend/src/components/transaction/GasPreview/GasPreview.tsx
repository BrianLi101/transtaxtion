import { GasPreviewProps } from './types';

import { VFlex } from 'src/components/general';
import { weiToEther } from 'src/utils/EthereumUtils';

export const GasPreview = ({ transactionFee }: GasPreviewProps) => {
  const etherTransactionFee = weiToEther(transactionFee);
  return (
    <VFlex>
      <p>{etherTransactionFee}</p>
    </VFlex>
  );
};

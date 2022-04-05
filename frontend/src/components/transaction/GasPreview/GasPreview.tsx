import { GasPreviewProps } from './types';

import { VFlex } from 'src/components/general';
import { weiToEther } from 'src/utils/EthereumUtils';

import { Caption } from 'src/components/general';

export const GasPreview = ({
  transactionFee,
  ethPriceInUSD,
}: GasPreviewProps) => {
  const etherTransactionFee = weiToEther(transactionFee);
  const etherTransactionFeeAbbrev = weiToEther(transactionFee, 6);
  let usdTransactionFee = '$';
  if (ethPriceInUSD) {
    usdTransactionFee += (ethPriceInUSD * etherTransactionFee).toFixed(2);
  } else {
    usdTransactionFee += 'x.xx';
  }

  return (
    <VFlex>
      <p>{usdTransactionFee}</p>
      <Caption>
        {etherTransactionFeeAbbrev}
        {' Ether'}
      </Caption>
    </VFlex>
  );
};

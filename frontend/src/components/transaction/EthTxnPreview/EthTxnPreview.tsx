import { HFlex, VFlex } from 'src/components/general';
import { Caption, Headline } from 'src/components/general';

// @ts-ignore
import EthIcon from './EthIcon.png';
import { EthTxnPreviewProps } from './types';

export const EthTxnPreview = ({
  value,
  ethPriceInUSD,
  iconSize = 40,
}: EthTxnPreviewProps) => {
  let usdValue = '$';
  if (ethPriceInUSD) {
    usdValue += (ethPriceInUSD * value).toFixed(2);
  } else {
    usdValue += 'x.xx';
  }
  return (
    <HFlex style={{ alignItems: 'center' }}>
      <VFlex>
        <Headline>{value.toFixed(6)} ETH</Headline>
        <Caption>{usdValue}</Caption>
      </VFlex>
      <img
        src={EthIcon}
        height={iconSize}
        width={iconSize}
        style={{ margin: 10 }}
      />
    </HFlex>
  );
};

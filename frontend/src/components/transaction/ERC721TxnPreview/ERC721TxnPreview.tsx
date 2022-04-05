import { HFlex, VFlex } from 'src/components/general';
import { Caption, Headline } from 'src/components/general';

import { ERC721TxnPreviewProps } from './types';

export const NFTPreview = ({
  contractAddress,
  tokenID,
  tokenName,
  tokenSymbol,
  iconSize,
}: ERC721TxnPreviewProps) => {
  return (
    <HFlex style={{ alignItems: 'center' }}>
      <VFlex>
        <Caption>{tokenName}</Caption>
        <Headline>
          {tokenSymbol} #{tokenID}
        </Headline>
      </VFlex>
      {/* <img
        src={EthIcon}
        height={iconSize}
        width={iconSize}
        style={{ margin: 10 }}
      /> */}
    </HFlex>
  );
};

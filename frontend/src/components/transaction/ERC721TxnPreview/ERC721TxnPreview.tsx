import { HFlex, VFlex } from 'src/components/general';
import { Caption, Headline } from 'src/components/general';

import { NFTIcon } from 'src/components/nfts/NFTIcon';

import { ERC721TxnPreviewProps } from './types';

export const ERC721TxnPreview = ({
  contractAddress,
  tokenID,
  tokenName,
  tokenSymbol,
  iconSize = 40,
}: ERC721TxnPreviewProps) => {
  return (
    <HFlex style={{ alignItems: 'center' }}>
      <VFlex>
        <Caption>NFT {tokenName}</Caption>
        <Headline>
          {tokenSymbol} #{tokenID}
        </Headline>
      </VFlex>
      <NFTIcon
        address={contractAddress}
        id={tokenID}
        size={iconSize}
        style={{ margin: 10 }}
      />
    </HFlex>
  );
};

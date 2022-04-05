import { getDefaultProvider } from 'ethers';
import { NftProvider, useNft } from 'use-nft';

import { VFlex } from 'src/components/general';

// @ts-ignore
import NFTDefaultIcon from './NFTDefaultIcon.png';
import { NFTIconProps } from './types';

// We are using the "ethers" fetcher here.
const ethersConfig = {
  provider: getDefaultProvider('homestead'),
};

export const NFTIcon = ({ address, id, size = 60, style }: NFTIconProps) => {
  const { loading, error, nft } = useNft(address, id);

  let content = <img src={NFTDefaultIcon} />;
  if (nft && nft.image) {
    content = <img src={nft.image} alt="" />;
  }
  return (
    <VFlex
      style={{
        height: size,
        width: size,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#3BD2F0',
        borderWidth: 4,
        borderStyle: 'solid',
        ...style,
      }}
    >
      {content}
    </VFlex>
  );
};

import { Chip, Tooltip } from '@mui/material';

import { HFlex } from 'src/components/general';

import { Contract } from 'src/types/Contract';
import {
  getEtherscanLinkForContract,
  getKnownContract,
  getReadableNameForKnownContract,
} from 'src/utils/ContractUtils';
import { isSameEthereumAddress } from 'src/utils/EthereumUtils';

import { AddressPreviewProps } from './types';

export const AddressPreview = ({ address, myAddress }: AddressPreviewProps) => {
  if (!address) return null;

  let contract = getKnownContract(address);
  let readableName: string =
    getReadableNameForKnownContract(address) || address;
  const isMyWalletAddress =
    myAddress && isSameEthereumAddress(address, myAddress);
  if (isMyWalletAddress) {
    readableName = 'My Wallet';
  }
  let tooltipTitle: string = '';

  if (contract && contract.description) {
    tooltipTitle += contract.description;
  }

  tooltipTitle += '\n Click to View on Etherscan';

  return (
    <HFlex>
      <Tooltip title={tooltipTitle}>
        <Chip
          label={readableName}
          style={{
            backgroundColor: isMyWalletAddress ? 'lightblue' : 'lightgray',
          }}
          onClick={() => {
            window.open(getEtherscanLinkForContract(address), '_blank');
          }}
        />
      </Tooltip>
    </HFlex>
  );
};

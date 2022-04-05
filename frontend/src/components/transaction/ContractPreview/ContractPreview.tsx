import { Chip, Tooltip } from '@mui/material';

import { HFlex } from 'src/components/general';

import { Contract } from 'src/types/Contract';
import {
  getEtherscanLinkForContract,
  getKnownContract,
  getReadableNameForKnownContract,
} from 'src/utils/ContractUtils';

import { ContractPreviewProps } from './types';

export const ContractPreview = ({ address }: ContractPreviewProps) => {
  if (!address) return null;

  let contract = getKnownContract(address);
  let readableName: string =
    getReadableNameForKnownContract(address) || address;
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
          onClick={() => {
            window.open(getEtherscanLinkForContract(address), '_blank');
          }}
        />
      </Tooltip>
    </HFlex>
  );
};

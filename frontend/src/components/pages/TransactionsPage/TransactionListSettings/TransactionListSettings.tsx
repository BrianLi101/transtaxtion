import { Checkbox, FormControlLabel } from '@mui/material';

import { TransactionListSettingsContainer } from './styled';
import { TransactionListSettingsProps } from './types';

export const TransactionListSettings = ({
  showAllTaxInfo,
  onChangeShowAllTaxInfo,
}: TransactionListSettingsProps) => {
  return (
    <TransactionListSettingsContainer>
      <FormControlLabel
        control={
          <Checkbox
            value={showAllTaxInfo}
            onChange={(event, checked) => onChangeShowAllTaxInfo(checked)}
          />
        }
        label="Show all tax info"
      />
    </TransactionListSettingsContainer>
  );
};

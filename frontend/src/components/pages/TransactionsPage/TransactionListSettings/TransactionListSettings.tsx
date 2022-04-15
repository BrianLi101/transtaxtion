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
            defaultChecked={showAllTaxInfo}
            value={showAllTaxInfo}
            onChange={(event, checked) => onChangeShowAllTaxInfo(checked)}
          />
        }
        label="Show all tax info"
      />
    </TransactionListSettingsContainer>
  );
};

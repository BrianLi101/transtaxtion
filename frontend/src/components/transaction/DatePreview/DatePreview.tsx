import { Body, Caption, HFlex } from 'src/components/general';

import { DatePreviewProps } from './types';

export const DatePreview = ({ timestamp }: DatePreviewProps) => {
  return (
    <HFlex style={{ alignItems: 'flex-end' }}>
      <Body>{timestamp.toFormat('DD')}</Body>
      <Caption style={{ marginLeft: 3, marginBottom: 2 }}>
        @{timestamp.toFormat('h:mm a')}
      </Caption>
    </HFlex>
  );
};

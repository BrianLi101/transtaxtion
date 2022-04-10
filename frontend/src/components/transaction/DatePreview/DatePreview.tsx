import { Headline, VFlex } from 'src/components/general';

import { DatePreviewProps } from './types';

export const DatePreview = ({ timestamp }: DatePreviewProps) => {
  return (
    <VFlex>
      <Headline>{timestamp.toFormat('DD')}</Headline>
    </VFlex>
  );
};

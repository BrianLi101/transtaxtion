import { Chip } from '@mui/material';

import { HFlex, VFlex, Body, Caption, Headline } from 'src/components/general';

import { getTaxableInfoForTranactionType } from 'src/utils/TaxableEventUtils';
import { TaxableEvent, GasInfo } from 'src/types/TaxableEvent';

import { TaxInfoPreviewContainer } from './styled';
import { TaxInfoPreviewProps } from './types';

export const TaxInfoPreview = ({ transaction, show }: TaxInfoPreviewProps) => {
  if (!show) return null;

  let taxableEventInfo =
    transaction.transactionType &&
    getTaxableInfoForTranactionType(transaction.transactionType);

  const renderTitle = (title: string) => {
    return (
      <Body style={{ textDecoration: 'underline', marginBottom: 10 }}>
        {title}
      </Body>
    );
  };

  const renderTaxableEvent = (taxableEvent: TaxableEvent) => {
    return (
      <VFlex style={{ alignItems: 'flex-start' }}>
        <Body style={{ fontWeight: 'bold' }}>{taxableEvent.type}</Body>
        <Body style={{ fontWeight: 'normal' }}>{taxableEvent.explanation}</Body>

        {taxableEvent.example && <Caption>{taxableEvent.example}</Caption>}
        {taxableEvent.link && (
          <Caption>
            <a href={taxableEvent.link} target="_blank" rel="noreferrer">
              more
            </a>
          </Caption>
        )}
      </VFlex>
    );
  };

  const renderDefaultTaxableEvent = () => {
    return (
      <VFlex style={{ alignItems: 'flex-start' }}>
        <Body style={{ fontWeight: 'bold' }}>Contract Interaction</Body>
        <Body style={{ fontWeight: 'normal' }}>
          We don't the tax status of this particular type of transaction.
        </Body>
      </VFlex>
    );
  };

  const renderGasInfo = () => {
    let gasInfo: GasInfo = taxableEventInfo?.gasInfo || {
      answer: 'Maybe',
      explanation: 'It depends.',
    };

    let gasChipColor = 'lightgray';
    switch (gasInfo.answer) {
      case 'Yes':
        gasChipColor = 'aquamarine';
        break;
      case 'No':
        gasChipColor = 'lightcoral';
        break;
    }

    return (
      <VFlex style={{ alignItems: 'flex-start' }}>
        <Body style={{ fontWeight: 'normal' }}>
          <Chip
            label={gasInfo.answer}
            style={{ backgroundColor: gasChipColor, marginRight: 10 }}
          />
          {gasInfo.explanation}
        </Body>
      </VFlex>
    );
  };

  return (
    <TaxInfoPreviewContainer>
      <HFlex>
        <VFlex style={{ flex: 3, alignItems: 'flex-start' }}>
          {renderTitle('Taxable Events')}
          {taxableEventInfo
            ? taxableEventInfo.taxableEvents.map((t) => renderTaxableEvent(t))
            : renderDefaultTaxableEvent()}
        </VFlex>
        <VFlex style={{ flex: 1 }} />
        <VFlex style={{ flex: 2, alignItems: 'flex-start' }}>
          {renderTitle('Is Gas deductible?')}
          {renderGasInfo()}
        </VFlex>
      </HFlex>
    </TaxInfoPreviewContainer>
  );
};

import {
  Accordion,
  AccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { HFlex, VFlex, Body, Caption, Headline } from 'src/components/general';

import { getTaxableInfoForTranactionType } from 'src/utils/TaxableEventUtils';
import { TaxableEvent, GasInfo } from 'src/types/TaxableEvent';

import { TaxInfoPreviewContainer } from './styled';
import { TaxInfoPreviewProps } from './types';

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<KeyboardArrowDownRoundedIcon />}
    {...props}
  />
))(({ theme }) => ({
  // backgroundColor: 'lightcyan',
  minHeight: 0,
  borderRadius: 10,
  '& .MuiAccordionSummary-root': {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
  },
  '& .MuiAccordionSummary-content': {
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: 0,
  },
}));

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

    let gasChipColor = 'lightskyblue';
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

  const renderBody = () => {
    return (
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
    );
  };

  return (
    <TaxInfoPreviewContainer>
      <Accordion
        disableGutters
        style={{ boxShadow: 'none', padding: 0, margin: 0 }}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary
        // style={{ minHeight: 0, backgroundColor: 'lightgray' }}
        >
          <Caption>Tax Info</Caption>
        </AccordionSummary>
        <AccordionDetails style={{}}>
          <div
            style={{
              height: 1,
              backgroundColor: 'lightgray',
              marginBottom: 20,
            }}
          />
          {renderBody()}
        </AccordionDetails>
      </Accordion>
    </TaxInfoPreviewContainer>
  );
};

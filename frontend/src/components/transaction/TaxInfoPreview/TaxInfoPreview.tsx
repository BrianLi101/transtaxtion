import { useEffect, useState } from 'react';
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
  const [showTaxInfo, setShowTaxInfo] = useState<boolean>(!!show);
  useEffect(() => {
    setShowTaxInfo(!!show);
  }, [show]);

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
    let onClick;
    if (taxableEvent.link) {
      onClick = () => {
        window.open(taxableEvent.link, '_blank');
      };
    }
    return (
      <VFlex style={{ alignItems: 'flex-start' }}>
        <Chip
          label={taxableEvent.type}
          style={{
            backgroundColor: 'lightsteelblue',
            marginRight: 5,
            borderRadius: 5,
            fontWeight: 'bold',
          }}
          size="small"
          onClick={onClick}
        />
        <Body style={{ fontWeight: 'normal' }}>{taxableEvent.explanation}</Body>

        {taxableEvent.example && <Caption>{taxableEvent.example}</Caption>}
      </VFlex>
    );
  };

  const renderDefaultTaxableEvent = () => {
    return (
      <VFlex style={{ alignItems: 'flex-start' }}>
        <Chip
          label={'Contract Interaction'}
          style={{
            backgroundColor: 'lightsteelblue',
            marginRight: 5,
            borderRadius: 5,
            fontWeight: 'bold',
          }}
          size="small"
          onClick={() => {
            window.open('https://koinly.io/cryptocurrency-taxes/', '_blank');
          }}
        />
        <Body style={{ fontWeight: 'normal' }}>
          We don't the tax status of this particular type of transaction.
          Generally, the following types of contract interactions are taxable:
          <br />• Any form of purchase using a cryptocurrency
          <br />• Token swaps (e.g. ETH to USDC on Uniswap)
          <br />• Most DeFi contract interactions involving the movement of an
          asset
        </Body>
      </VFlex>
    );
  };

  const renderGasInfo = () => {
    let gasInfo: GasInfo = taxableEventInfo?.gasInfo || {
      answer: 'Maybe',
      explanation:
        'Gas fees can generally be applied to the cost basis of the following types of transactions: buying/selling an asset (ETH, NFTs), trades or swaps (Uniswap), or claiming rewards (staking, airdrops).',
      link: 'https://tokentax.co/blog/are-ethereum-gas-fees-tax-deductible',
    };

    let onClick;
    if (gasInfo.link) {
      onClick = () => {
        window.open(gasInfo.link, '_blank');
      };
    }

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
            style={{
              backgroundColor: gasChipColor,
              marginRight: 5,
              borderRadius: 5,
            }}
            // variant="outlined"
            size="small"
            onClick={onClick}
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
        expanded={showTaxInfo}
        onChange={(event, expanded) => setShowTaxInfo(expanded)}
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

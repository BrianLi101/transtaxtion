import { Body } from 'src/components/general';

export enum TaxableEventAsset {
  NFT = 'NFT',
  ETH = 'ETH',
}

export enum TaxableEventType {
  RECEIVED_ETH = 'Received ETH',
  SENT_ETH = 'Sent ETH',
  PAID_WITH_ETH = 'Paid with ETH',
  SOLD_NFT = 'Sold NFT',
}

export interface TaxableEvent {
  type: TaxableEventType;
  explanation: string | React.ReactNode;
  example?: string;
  asset: TaxableEventAsset;
  taxedAs: 'property' | 'income';
  link?: string;
}

export interface TransactionTaxableInfo {
  taxableEvents: TaxableEvent[];
  gasInfo: GasInfo;
}

export interface GasInfo {
  answer: 'Yes' | 'No' | 'Maybe';
  explanation: string | React.ReactNode;
  example?: string;
  link?: string;
}

/**
 *
 */
export const TAXABLE_EVENT_DICTIONARY: {
  [key in TaxableEventType]: TaxableEvent;
} = {
  [TaxableEventType.RECEIVED_ETH]: {
    type: TaxableEventType.RECEIVED_ETH,
    explanation: (
      <Body>
        • If you are transferring cryptocurrency between your own wallets,
        receiving is not considered a taxable event.
        <br />• If you are receiving ETH as a gift from another party, you will
        inherit the cost basis from the gifter or the fair market value if not
        known. You do not need to pay taxes upon receiving, but disposing the
        crypto will be subject to capital gains taxes.
      </Body>
    ),
    asset: TaxableEventAsset.ETH,
    taxedAs: 'property',
    link: 'https://koinly.io/cryptocurrency-taxes/',
  },
  [TaxableEventType.SENT_ETH]: {
    type: TaxableEventType.SENT_ETH,
    explanation: (
      <Body>
        • If you are transferring cryptocurrency between your own wallets,
        sending is not considered a taxable event.
        <br />
        • If you are gifting cryptocurrency (e.g. to a friend), up to $15,000 is
        tax free!
        <br />
        • Donating to a 501(c)3 charity is tax deductible.
        <br />• Most other forms of sending are taxible as capital gains or
        losses.
      </Body>
    ),
    example: '',
    asset: TaxableEventAsset.ETH,
    taxedAs: 'property',
    link: 'https://koinly.io/cryptocurrency-taxes/',
  },
  [TaxableEventType.PAID_WITH_ETH]: {
    type: TaxableEventType.PAID_WITH_ETH,
    explanation:
      'Making a purchase using ETH is considered a disposal of the cryptocurrency, which is subject to a capital gain or loss.',
    asset: TaxableEventAsset.ETH,
    taxedAs: 'property',
    link: 'https://taxbit.com/blog/nft-tax-guide-what-creators-and-investors-need-to-know-about-nft-taxes',
  },
  [TaxableEventType.SOLD_NFT]: {
    type: TaxableEventType.SOLD_NFT,
    explanation:
      'Selling an NFT for ETH is subject to a capital gain or loss based on the fiat value (US dollar value) of ETH at the time of purchase and time of sale.',
    asset: TaxableEventAsset.NFT,
    taxedAs: 'property',
    link: 'https://taxbit.com/blog/nft-tax-guide-what-creators-and-investors-need-to-know-about-nft-taxes',
  },
};

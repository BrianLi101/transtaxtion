import { DateTime } from 'luxon';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import { Contract } from 'src/types/Contract';
import { getKnownContract } from 'src/utils/ContractUtils';
import {
  isSameEthereumAddress,
  getShortenedEthereumAddress,
} from 'src/utils/EthereumUtils';

import { ContractPreview } from '../ContractPreview';
import { EthTxnPreview } from '../EthTxnPreview';
import { GasPreview } from '../GasPreview';
import { TransactionTypePreview } from '../TransactionTypePreview';

import { TransactionRowContainer, HFlex, VFlex } from './styled';
import { TransactionRowProps } from './types';

export const TransactionRow = ({
  transaction,
  myAddress,
}: TransactionRowProps) => {
  let fromMe = isSameEthereumAddress(transaction.from, myAddress);
  let inOrOut = fromMe ? 'Out' : 'In';
  let signMultiplier = fromMe ? -1 : 1;

  let otherAddress = fromMe ? transaction.from : transaction.to;
  let otherAddressContractInfo: Contract | undefined;
  if (otherAddress) {
    otherAddressContractInfo = getKnownContract(otherAddress);
  }

  const renderOut = () => {
    let leftHalf: React.ReactNode | undefined;
    let rightHalf: React.ReactNode | undefined;
    if (fromMe && transaction.etherValue) {
      leftHalf = (
        <EthTxnPreview
          value={transaction.etherValue}
          ethPriceInUSD={transaction.ethPriceInUSD}
        />
      );
    }
    const columnStyle: React.CSSProperties = {
      flex: 1,
    };
    return (
      <HFlex style={{ flex: 1, alignItems: 'center' }}>
        <VFlex style={{ ...columnStyle, alignItems: 'flex-end' }}>
          {leftHalf}
        </VFlex>
        <ArrowForwardRoundedIcon />
        <VFlex style={{ ...columnStyle, alignItems: 'flex-start' }}>
          {rightHalf}
        </VFlex>
      </HFlex>
    );
  };

  const renderIn = () => {
    return (
      <HFlex>
        <ArrowBackRoundedIcon />
      </HFlex>
    );
  };

  return (
    <TransactionRowContainer>
      <HFlex>
        <p>{transaction.timeStamp.toString()}</p>
        <p>{transaction.transactionType}</p>
        <p>{signMultiplier * parseFloat(transaction.etherValue.toFixed(3))}</p>
        <p>{getShortenedEthereumAddress(myAddress, 12, 'middle')}</p>
      </HFlex>
      <HFlex>
        <p>{transaction.from}</p>
        <ContractPreview address={transaction.from} />
        <p>{inOrOut}</p>
        <p>{transaction.to}</p>
        <ContractPreview address={transaction.to} />
        <p>{transaction.contractAddress}</p>
        <ContractPreview address={transaction.contractAddress} />
      </HFlex>
      <HFlex>
        <TransactionTypePreview type={transaction.transactionType} />
        <VFlex style={{ flex: 1 }}>
          {renderOut()}
          {renderIn()}
        </VFlex>
        <GasPreview
          transactionFee={transaction.transactionFee || 0}
          ethPriceInUSD={transaction.ethPriceInUSD}
        />
      </HFlex>
      <p>{JSON.stringify(transaction)}</p>
    </TransactionRowContainer>
  );
};

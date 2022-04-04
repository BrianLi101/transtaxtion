import { DateTime } from 'luxon';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import {
  isSameEthereumAddress,
  getShortenedEthereumAddress,
} from 'src/utils/EthereumUtils';

import { GasPreview } from '../GasPreview';

import { TransactionRowContainer, HFlex, VFlex } from './styled';
import { TransactionRowProps } from './types';

export const TransactionRow = ({
  transaction,
  myAddress,
}: TransactionRowProps) => {
  let fromMe = isSameEthereumAddress(transaction.from, myAddress);
  let inOrOut = fromMe ? 'Out' : 'In';
  let signMultiplier = fromMe ? -1 : 1;

  const renderOut = () => {
    if (fromMe && transaction.etherValue) {
    }
    return (
      <HFlex>
        <ArrowForwardRoundedIcon />
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
        <p>{inOrOut}</p>
        <p>{transaction.to}</p>
        <p>{transaction.contractAddress}</p>
      </HFlex>
      <HFlex>
        <p>{transaction.gas}</p>
        <p>{transaction.gasPrice}</p>
        <p>{transaction.gasUsed}</p>
        <p>
          {parseInt(transaction.gasPrice || '0') *
            parseInt(transaction.gasUsed)}
        </p>
      </HFlex>
      <HFlex>
        <VFlex style={{ flex: 1 }}>
          {renderOut()}
          {renderIn()}
        </VFlex>
        <GasPreview transactionFee={transaction.transactionFee || 0} />
      </HFlex>
      <p>{JSON.stringify(transaction)}</p>
    </TransactionRowContainer>
  );
};

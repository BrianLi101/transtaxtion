import { DateTime } from 'luxon';

import { TransactionRowContainer, HorizontalFlexContainer } from './styled';
import { TransactionRowProps } from './types';

export const TransactionRow = ({
  transaction,
  myAddress,
}: TransactionRowProps) => {
  let dateTime = DateTime.fromSeconds(parseInt(transaction.timeStamp));

  let fromMe = transaction.from === myAddress;
  let signMultiplier = fromMe ? -1 : 1;
  let etherValue = parseFloat(transaction.value) * 0.000000000000000001;

  return (
    <TransactionRowContainer>
      <HorizontalFlexContainer>
        <p>{dateTime.toString()}</p>
        <p>{signMultiplier * parseFloat(etherValue.toFixed(3))}</p>
      </HorizontalFlexContainer>
      <p>{JSON.stringify(transaction)}</p>
    </TransactionRowContainer>
  );
};

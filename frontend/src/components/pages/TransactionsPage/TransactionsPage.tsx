import { useState } from 'react';
import { Button } from '@mui/material';

import EtherscanAPI from 'src/managers/EtherscanAPI';
import { EtherscanNormalTransaction } from 'src/managers/EtherscanAPI/types';

import BlockCypherAPI from 'src/managers/BlockCypherAPI';
import {} from 'src/managers/BlockCypherAPI/types';

import { TransactionRow } from 'src/components/transaction/TransactionRow';

import { Page } from '../styled';

export const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>();

  let walletAddress = process.env.REACT_APP_TEST_WALLET_ADDRESS!;
  return (
    <Page>
      <Button
        onClick={() => {
          EtherscanAPI.getNormalTransactionsByAddress(walletAddress).then(
            (data) => {
              setTransactions(data.result);
            }
          );
          // BlockCypherAPI.getAddressFullTransactions(walletAddress).then(
          //   (data) => {
          //     setTransactions(data.txs);
          //   }
          // );
        }}
      >
        Get Transactions
      </Button>
      {transactions?.map((t) => {
        return <p>{JSON.stringify(t)}</p>;
      })}
      {/* {transactions?.map((t) => {
        return (
          <TransactionRow
            key={t.timeStamp}
            transaction={t}
            myAddress={walletAddress}
          />
        );
      })} */}
    </Page>
  );
};

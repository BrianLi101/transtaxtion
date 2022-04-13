import { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import EtherscanAPI from 'src/managers/EtherscanAPI';
import { EtherscanNormalTransaction } from 'src/managers/EtherscanAPI/types';
import { Transaction } from 'src/types/Transaction';

import { Header } from 'src/components/header';
import { PageColumn } from 'src/components/general';

import { TransactionRow } from 'src/components/transaction/TransactionRow';

import { Page } from '../styled';

export const TransactionsPage: React.FC = () => {
  const [normalTransactions, setNormalTransactions] = useState<any[]>();
  const [internalTransactions, setInternalTransactions] = useState<any[]>();
  const [nftTransfers, setNFTTransfers] = useState<any[]>();
  const [transactions, setTransactions] = useState<Transaction[]>();

  const [loading, setLoading] = useState<boolean>(false);
  const { address } = useParams();
  let walletAddress = address!;

  useEffect(() => {
    if (address) {
      setLoading(true);
      EtherscanAPI.getFormattedTransactionsByAddress(address)
        .then((data) => {
          setTransactions(data);
          console.log(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [address]);

  return (
    <Page>
      <Header />
      {loading && (
        <PageColumn style={{ alignItems: 'center' }}>
          <CircularProgress />
        </PageColumn>
      )}
      {/* <Button
        onClick={() => {
          EtherscanAPI.getNormalTransactionsByAddress(walletAddress).then(
            (data) => {
              setNormalTransactions(data.result);
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
      <Button
        onClick={() => {
          EtherscanAPI.getInternalTransactionsByAddress(walletAddress).then(
            (data) => {
              setInternalTransactions(data.result);
            }
          );
        }}
      >
        Get Internal Transactions
      </Button>
      <Button
        onClick={() => {
          EtherscanAPI.getERC721TransferEventsByAddress(walletAddress).then(
            (data) => {
              setNFTTransfers(data.result);
            }
          );
        }}
      >
        Get ERC721 Transfer Events
      </Button>
      <Button
        onClick={() => {
          EtherscanAPI.getFormattedTransactionsByAddress(walletAddress).then(
            (data) => {
              setTransactions(data);
            }
          );
        }}
      >
        Get All
      </Button> */}

      {normalTransactions?.map((t) => {
        return <p>{JSON.stringify(t)}</p>;
      })}
      {internalTransactions?.map((t) => {
        return <p>{JSON.stringify(t)}</p>;
      })}
      {nftTransfers?.map((t) => {
        return <p>{JSON.stringify(t)}</p>;
      })}
      {transactions?.map((t) => {
        return (
          <TransactionRow
            key={t.hash}
            transaction={t}
            myAddress={walletAddress}
          />
        );
      })}
    </Page>
  );
};

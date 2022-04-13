import { DateTime } from 'luxon';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import { Contract } from 'src/types/Contract';
import { getKnownContract } from 'src/utils/ContractUtils';
import {
  isSameEthereumAddress,
  getShortenedEthereumAddress,
} from 'src/utils/EthereumUtils';
import { TaxableIcon } from 'src/components/icons/TaxableIcon';

import { AddressPreview } from '../AddressPreview';
import { DatePreview } from '../DatePreview';
import { ERC721TxnPreview } from '../ERC721TxnPreview';
import { EthTxnPreview } from '../EthTxnPreview';
import { GasPreview } from '../GasPreview';
import { TaxInfoPreview } from '../TaxInfoPreview';
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

  const renderOutTxn = () => {
    let txnNodes: React.ReactNode[] = [];

    if (fromMe && transaction.etherValue > 0) {
      let ethTransaction = (
        <HFlex style={{ alignItems: 'center' }}>
          <EthTxnPreview
            value={transaction.etherValue}
            ethPriceInUSD={transaction.ethPriceInUSD}
          />
          <ArrowForwardRoundedIcon />
        </HFlex>
      );
      txnNodes.push(ethTransaction);
    }

    const { erc721TransactionData } = transaction;
    if (
      !fromMe &&
      erc721TransactionData &&
      isSameEthereumAddress(erc721TransactionData.from, myAddress)
    ) {
      let erc721Transaction = (
        <HFlex style={{ alignItems: 'center' }}>
          <ERC721TxnPreview
            tokenID={erc721TransactionData.tokenID}
            contractAddress={erc721TransactionData.contractAddress}
            tokenName={erc721TransactionData.tokenName}
            tokenSymbol={erc721TransactionData.tokenSymbol}
          />
          <ArrowForwardRoundedIcon />
        </HFlex>
      );
      txnNodes.push(erc721Transaction);
    }

    return (
      <VFlex style={{ width: '100%', alignItems: 'flex-end' }}>
        {txnNodes.map((n) => n)}
      </VFlex>
    );
  };

  const renderInTxn = () => {
    let txnNodes: React.ReactNode[] = [];

    if (!fromMe && transaction.etherValue > 0) {
      let ethTransaction = (
        <HFlex style={{ alignItems: 'center' }}>
          <EthTxnPreview
            value={transaction.etherValue}
            ethPriceInUSD={transaction.ethPriceInUSD}
          />
          <ArrowBackRoundedIcon />
        </HFlex>
      );
      txnNodes.push(ethTransaction);
    }

    const { erc721TransactionData } = transaction;
    if (
      fromMe &&
      erc721TransactionData &&
      isSameEthereumAddress(erc721TransactionData.to, myAddress)
    ) {
      let erc721Transaction = (
        <HFlex style={{ alignItems: 'center' }}>
          <ERC721TxnPreview
            tokenID={erc721TransactionData.tokenID}
            contractAddress={erc721TransactionData.contractAddress}
            tokenName={erc721TransactionData.tokenName}
            tokenSymbol={erc721TransactionData.tokenSymbol}
          />
          <ArrowBackRoundedIcon />
        </HFlex>
      );
      txnNodes.push(erc721Transaction);
    }

    return (
      <VFlex style={{ width: '100%', alignItems: 'flex-end' }}>
        {txnNodes.map((n) => n)}
      </VFlex>
    );
  };

  return (
    <TransactionRowContainer>
      {/* <HFlex>
        <p>{transaction.timeStamp.toString()}</p>
        <p>{transaction.transactionType}</p>
        <p>{signMultiplier * parseFloat(transaction.etherValue.toFixed(3))}</p>
      </HFlex> */}

      <HFlex style={{ paddingTop: 10, paddingBottom: 10, minHeight: 100 }}>
        <VFlex
          style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}
        >
          <DatePreview timestamp={transaction.timeStamp} />
          <VFlex style={{ flex: 1 }}>
            <TransactionTypePreview type={transaction.transactionType} />
          </VFlex>
        </VFlex>
        <VFlex style={{ flex: 3, alignItems: 'center' }}>
          {/* <AddressPreview
            address={fromMe ? transaction.from : transaction.to}
            myAddress={myAddress}
          /> */}
          {fromMe ? renderOutTxn() : renderInTxn()}
          {fromMe ? renderInTxn() : renderOutTxn()}
        </VFlex>
        <VFlex style={{ flex: 3, paddingLeft: 20 }}>
          <AddressPreview
            address={fromMe ? transaction.to : transaction.from}
            myAddress={myAddress}
          />
        </VFlex>
        <VFlex style={{ flex: 1 }}>
          <GasPreview
            transactionFee={transaction.transactionFee || 0}
            ethPriceInUSD={transaction.ethPriceInUSD}
          />
        </VFlex>
      </HFlex>
      {/* <p>{JSON.stringify(transaction)}</p> */}
      {/* <p>input: {transaction.input}</p> */}
      <TaxInfoPreview show transaction={transaction} />
    </TransactionRowContainer>
  );
};

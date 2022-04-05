import axios from 'axios';
import { DateTime } from 'luxon';
import _ from 'lodash';

import { Transaction, TransactionType } from 'src/types/Transaction';
import { weiToEther } from 'src/utils/EthereumUtils';

import {
  EtherscanModules,
  AccountModuleActions,
  GetTransactionsByAddressParameters,
  GetNormalTransactionsByAddressReponse,
  GetInternalTransactionsByAddressReponse,
  GetERC721TransferEventsByAddressParameters,
  GetERC721TransferEventsByAddressResponse,
  EtherscanNormalTransaction,
  EtherscanInternalTransaction,
  EtherscanERC721TransferEvent,
} from './types';

const MAINNET_ENDPOINT = 'https://api.etherscan.io';
const API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY;

class EtherscanAPI {
  getFormattedTransactionsByAddress = (
    address: string
  ): Promise<Transaction[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const normalTransactions = await this.getNormalTransactionsByAddress(
          address
        );
        const internalTransactions =
          await this.getInternalTransactionsByAddress(address);
        const erc721TransferEvents =
          await this.getERC721TransferEventsByAddress(address);
        let formattedTransactions =
          this.convertEtherscanDataToFormattedTransactions(
            normalTransactions.result,
            internalTransactions.result,
            erc721TransferEvents.result
          );
        resolve(formattedTransactions);
      } catch (err) {
        reject(err);
      }
    });
  };

  getNormalTransactionsByAddress = (
    address: string
  ): Promise<GetNormalTransactionsByAddressReponse> => {
    return new Promise((resolve, reject) => {
      let parameters: GetTransactionsByAddressParameters = {
        address,
      };
      let url = MAINNET_ENDPOINT + '/api';
      axios
        .get(url, {
          params: {
            module: EtherscanModules.account,
            apikey: API_KEY,
            action: AccountModuleActions.txlist,
            ...parameters,
          },
        })
        .then((res) => {
          let data: GetNormalTransactionsByAddressReponse = res.data;
          console.log(
            'getNormalTransactionsByAddress: succeeded with data ',
            data
          );
          resolve(data);
        })
        .catch((err) => {
          console.log(
            'getNormalTransactionsByAddress: failed with error ',
            err
          );
          reject(err);
        });
    });
  };

  getInternalTransactionsByAddress = (
    address: string
  ): Promise<GetInternalTransactionsByAddressReponse> => {
    return new Promise((resolve, reject) => {
      let parameters: GetTransactionsByAddressParameters = {
        address,
      };
      let url = MAINNET_ENDPOINT + '/api';
      axios
        .get(url, {
          params: {
            module: EtherscanModules.account,
            apikey: API_KEY,
            action: AccountModuleActions.txlistinternal,
            ...parameters,
          },
        })
        .then((res) => {
          let data: GetInternalTransactionsByAddressReponse = res.data;
          console.log(
            'getInternalTransactionsByAddress: succeeded with data ',
            data
          );
          resolve(data);
        })
        .catch((err) => {
          console.log(
            'getInternalTransactionsByAddress: failed with error ',
            err
          );
          reject(err);
        });
    });
  };

  getERC721TransferEventsByAddress = (
    address: string
  ): Promise<GetERC721TransferEventsByAddressResponse> => {
    return new Promise((resolve, reject) => {
      let parameters: GetERC721TransferEventsByAddressParameters = {
        address,
      };
      let url = MAINNET_ENDPOINT + '/api';
      axios
        .get(url, {
          params: {
            module: EtherscanModules.account,
            apikey: API_KEY,
            action: AccountModuleActions.tokennfttx,
            ...parameters,
          },
        })
        .then((res) => {
          let data: GetERC721TransferEventsByAddressResponse = res.data;
          console.log(
            'getERC721TransferEventsByAddress: succeeded with data ',
            data
          );
          resolve(data);
        })
        .catch((err) => {
          console.log(
            'getERC721TransferEventsByAddress: failed with error ',
            err
          );
          reject(err);
        });
    });
  };

  private convertEtherscanDataToFormattedTransactions = (
    normalTransactions: EtherscanNormalTransaction[],
    internalTransactions: EtherscanInternalTransaction[],
    erc721TransferEvents: EtherscanERC721TransferEvent[]
  ): Transaction[] => {
    let formattedTransactions: Transaction[] = [];

    const SUBSTITUTE_ETHEREUM_PRICE = 3500.22;

    normalTransactions.forEach((normalTx) => {
      let dateTime = DateTime.fromSeconds(parseInt(normalTx.timeStamp));
      let etherValue = weiToEther(parseFloat(normalTx.value));
      let transactionFee: number = 0;
      if (normalTx.gasPrice && normalTx.gasUsed) {
        transactionFee =
          parseInt(normalTx.gasPrice) * parseInt(normalTx.gasUsed);
      }
      let transaction: Transaction = {
        ...normalTx,
        timeStamp: dateTime,
        etherValue,
        normalOrInternal: 'normal',
        transactionFee,
        ethPriceInUSD: SUBSTITUTE_ETHEREUM_PRICE,
      };

      // if the transaction has a value, it could be a erc721 purchase
      if (transaction.etherValue > 0) {
        erc721TransferEvents.forEach((erc721TransferEvent) => {
          if (erc721TransferEvent.hash === transaction.hash) {
            transaction.erc721TransactionData = erc721TransferEvent;
            transaction.transactionType = TransactionType.ERC721Purchase;
          }
        });
      }

      formattedTransactions.push(transaction);
    });

    internalTransactions.forEach((internalTx) => {
      let dateTime = DateTime.fromSeconds(parseInt(internalTx.timeStamp));
      let etherValue = weiToEther(parseFloat(internalTx.value));
      let transaction: Transaction = {
        ...internalTx,
        timeStamp: dateTime,
        etherValue,
        normalOrInternal: 'internal',
        ethPriceInUSD: SUBSTITUTE_ETHEREUM_PRICE,
      };

      // if the transaction has a value, it could be a erc721 purchase
      if (transaction.etherValue > 0) {
        erc721TransferEvents.forEach((erc721TransferEvent) => {
          if (erc721TransferEvent.hash === transaction.hash) {
            transaction.erc721TransactionData = erc721TransferEvent;
            transaction.transactionType = TransactionType.ERC721Sale;
          }
        });
      }

      formattedTransactions.push(transaction);
    });

    console.log(formattedTransactions);
    return _.orderBy(formattedTransactions, ['timeStamp']);
  };
}

export default new EtherscanAPI();

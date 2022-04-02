import axios from 'axios';

import {
  EtherscanModules,
  AccountModuleActions,
  GetTransactionsByAddressParameters,
  GetNormalTransactionsByAddressReponse,
} from './types';

const MAINNET_ENDPOINT = 'https://api.etherscan.io';
const API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY;

class EtherscanAPI {
  getNormalTransactionsByAddress = (
    address: string
  ): Promise<GetNormalTransactionsByAddressReponse> => {
    return new Promise((resolve, reject) => {
      let parameters: GetTransactionsByAddressParameters = {
        address,
      };
      console.log(API_KEY);
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
}

export default new EtherscanAPI();

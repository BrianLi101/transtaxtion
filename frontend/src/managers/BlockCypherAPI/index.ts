import axios from 'axios';

import { GetAddressFullParameters, GetAddressFullResponse } from './types';

const MAINNET_ENDPOINT = 'https://api.blockcypher.com/v1/eth/main';
const API_KEY = process.env.REACT_APP_BLOCKCYPHER_API_TOKEN;

class BlockCypherAPI {
  getAddressFullTransactions = (
    address: string
  ): Promise<GetAddressFullResponse> => {
    return new Promise((resolve, reject) => {
      let parameters: GetAddressFullParameters = {};
      console.log(API_KEY);
      let url = MAINNET_ENDPOINT + '/addrs/' + address + '/full';
      axios
        .get(url, {
          params: {
            ...parameters,
          },
        })
        .then((res) => {
          let data: GetAddressFullResponse = res.data;
          console.log('getAddressFullTransactions: succeeded with data ', data);
          resolve(data);
        })
        .catch((err) => {
          console.log('getAddressFullTransactions: failed with error ', err);
          reject(err);
        });
    });
  };
}

export default new BlockCypherAPI();

export interface Contract {
  address: string;
  orgName?: string;
  contractName?: string;
  description?: string;
}

/**
 * A set of commmon known smart contract addresses from Etherscan
 */
export const CONTRACT_DICTIONARY: { [address: string]: Contract } = {
  '0xa5409ec958c83c3f309868babaca7c86dcb077c1': {
    address: '0xa5409ec958c83c3f309868babaca7c86dcb077c1',
    orgName: 'OpenSea',
    contractName: 'Registry',
  },
  '0x7f268357A8c2552623316e2562D90e642bB538E5': {
    address: '0x7f268357A8c2552623316e2562D90e642bB538E5',
    orgName: 'OpenSea',
    contractName: 'Wyvern Exchange v2',
  },
};

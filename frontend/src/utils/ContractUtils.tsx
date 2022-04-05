import { Contract } from 'src/types/Contract';

export const getEtherscanLinkForContract = (address: string) => {
  return 'https://etherscan.io/address/' + address;
};

/**
 * Helper method to get data for a known contract
 * @param address
 * @returns
 */
export const getKnownContract = (address: string): Contract | undefined => {
  return CONTRACT_DICTIONARY[address.toLowerCase()];
};

export const getReadableNameForKnownContract = (
  address: string
): string | null => {
  let contract = CONTRACT_DICTIONARY[address];
  if (!contract) return null;
  let readableName: string = '';
  if (contract.orgName) readableName += contract.orgName + ': ';
  if (contract.contractName) {
    readableName += contract.contractName;
  } else {
    readableName += 'Unknown';
  }
  return readableName;
};

/**
 * A set of commmon known smart contract addresses from Etherscan
 */
export const CONTRACT_DICTIONARY: { [address: string]: Contract } = {
  '0xa5409ec958c83c3f309868babaca7c86dcb077c1': {
    address: '0xa5409ec958c83c3f309868babaca7c86dcb077c1',
    orgName: 'OpenSea',
    contractName: 'Registry',
    description:
      'Approving the OpenSea Registry is required before being able to sell NFTs on the platform.',
  },
  '0x7f268357a8c2552623316e2562d90e642bb538e5': {
    address: '0x7f268357a8c2552623316e2562d90e642bb538e5',
    orgName: 'OpenSea',
    contractName: 'Wyvern Exchange v2',
    description: "OpenSea's digital asset exchange for NFTs.",
  },
};

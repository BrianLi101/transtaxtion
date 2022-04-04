export const isSameEthereumAddress = (a1: string, a2: string) => {
  return a1.toLowerCase() === a2.toLowerCase();
};

export const getShortenedEthereumAddress = (
  address: string,
  /** must be at least 7 */
  charLimit: number = 6,
  shorten: 'middle' | 'end' = 'end'
) => {
  let lowercaseAddress = address.toLowerCase();
  let actualCharLimit = charLimit - 3;
  let ellipsis = '...';

  if (address.length < charLimit) {
    return lowercaseAddress;
  } else if (shorten === 'end') {
    return lowercaseAddress.substring(0, actualCharLimit) + ellipsis;
  } else {
    let endCharLimit = actualCharLimit > 7 ? 4 : actualCharLimit - 3;
    let startCharLimit = actualCharLimit - endCharLimit;
    return (
      lowercaseAddress.substring(0, startCharLimit) +
      ellipsis +
      lowercaseAddress.substring(
        lowercaseAddress.length - endCharLimit,
        lowercaseAddress.length
      )
    );
  }
};

export const weiToEther = (wei: number, digits: number = 10): number => {
  const MULTIPLIER = 0.000000000000000001;
  return parseFloat((wei * MULTIPLIER).toFixed(digits));
};

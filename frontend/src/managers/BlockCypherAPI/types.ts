/**
 * https://www.blockcypher.com/dev/ethereum/#address-full-endpoint
 */
export interface GetAddressFullParameters {
  before?: number;
  after?: number;
  limit?: number;
  txlimit?: number;
  confirmations?: number;
  confidence?: number;
  includeHex?: boolean;
  includeConfidence?: boolean;
  omitWalletAddresses?: boolean;
}
export interface GetAddressFullResponse {
  address: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  unconfirmed_n_tx: number;
  final_n_tx: number;
  nonce: number;
  pool_nonce: number;
  hasMore: boolean;
  txs: any[];
}

export interface ClaimData {
  holdFromDate: number;
  holdToDate: number;
  claimFromDate: number;
  claimToDate: number;
  claimAmount: number;
  txnHash: string;
}

export interface CheckTwitterFollowStatusResponse {
  isFollowing: boolean;
}

import { User } from './userModel';

export interface Artwork {
  _id?: string;
  title: string;
  description: string;
  creator: string;
  userName?: string;
  contentImage: string;
  artworkImage?: string;
  artStyle: artStyles | string;
  tokenAmount: number;
  state: artworkState | number;
  initialTokenPrice: number;
  tokens?: [ArtworkToken];
  history?: [HistorySlice];
}

export interface ArtworkToken {
  nftAddress: string;
  ownerAddress: string;
  price?: number;
}

export enum historyState {
  Transfered,
  Purchased,
  Unlisted,
  Listed,
  Minted,
}

export interface HistorySlice {
  state: historyState;
  data:
    | TransferedHistory
    | PurchasedHistory
    | UnlistedHistroy
    | ListedHistroy
    | MintedHistory;
}

export interface TransferedHistory {
  by: string;
  to: string;
  timestamp: string;
  tokens: number;
}

export interface PurchasedHistory {
  by: string;
  price: number;
  timestamp: number;
  tokens: number;
}

export interface UnlistedHistroy {
  by: string;
  tokens: number;
  timestamp: number;
}

export interface ListedHistroy {
  by: string;
  tokens: number;
  price: number;
  timestamp: number;
}

export interface MintedHistory {
  by: string;
  timestamp: number;
}

export enum artStyles {
  Abstract = 'abstract',
  Newspaper = 'newspaper',
  Watercolor = 'watercolor',
}

export enum artworkState {
  Content,
  Created,
  Minted,
  Listed,
}

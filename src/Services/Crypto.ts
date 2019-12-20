/// <reference types="../index.d.ts">
import iexcloud from "../iexcloud";
import { Quote } from "../types";

export const cryptoQuote = async (symbol: string): Promise<Quote> =>
  new Quote(await iexcloud.services.get(`/crypto/${symbol}/quote`));

// TODO: cryptoBook, cryptoEvents, cryptoPrice
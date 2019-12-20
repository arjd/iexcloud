import iexcloud from "../iexcloud";
import { IEXSymbol, MarketSymbol } from "../types";

export const iexSymbols = async (): Promise<IEXSymbol[]> => 
  (await iexcloud.services.get(`/ref-data/iex/symbols`) as unknown as object[])
    .map(o => new IEXSymbol(o));

export const marketSymbols = async (): Promise<MarketSymbol[]> =>
  (await iexcloud.services.get(`/ref-data/symbols`) as unknown as object[])
    .map(o => new MarketSymbol(o));

// TODO: define cryptoSymbol
// export const cryptoSymbols = async (): Promise<CryptoSymbol[]> => 
//   (await iexcloud.services.get(`/ref-data/crypto/symbols`) as unknown as object[])
//     .map(o => new CryptoSymbol(o));

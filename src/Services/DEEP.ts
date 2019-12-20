import iexcloud from "../iexcloud";
import { Auction, DEEPBook, DEEPOfficialPrice, DEEPTrade } from "../types";

export const deepBook = async (symbol: string): Promise<DEEPBook[]> =>
  (await iexcloud.services.get(`/deep/book`, { symbols: symbol }) as unknown as object[])
    .map(o => new DEEPBook(o));

interface KVP { [k: string]: any }
export const deepTrades = async (symbol: string): Promise<DEEPTrade[]> => {
  const result: KVP = await iexcloud.services.get(`/deep/trades`, { symbols: symbol });
  return (result[Object.keys(result)[0]]).map((o: object) => new DEEPTrade(o));
}
  
export const officialPrice = async (symbol: string): Promise<DEEPOfficialPrice> =>
  new DEEPOfficialPrice(await iexcloud.services.get(`/deep/official-price`, { symbols: symbol })); 
  
export const auction = async (symbol: string): Promise<Auction> =>
  new Auction(await iexcloud.services.get(`/deep/auction`, { symbols: symbol })); 

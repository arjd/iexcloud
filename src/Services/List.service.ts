import iexApiRequest from "./iexcloud.service";

import { Quote } from "./Quote.service";

interface KVP {
  [k: string]: any;
}

export type ListType =
  | "mostactive"
  | "gainers"
  | "losers"
  | "iexvolume"
  | "iexpercent"
  | "infocus";

export const list = async (
  listType: ListType = "mostactive"
): Promise<Quote[]> => {
  const endpoint = `/stock/market/list/${listType}`;
  const data: KVP[] = await iexApiRequest.get(endpoint);
  const result = data.map(o => Object.assign(new Quote(), o));
  return result;
};

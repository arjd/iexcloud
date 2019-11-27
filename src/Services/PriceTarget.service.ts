import iexApiRequest from "./iexcloud.service";

interface KVP {
  [k: string]: any;
}

export const priceTarget = async (symbol: string): Promise<PriceTarget> => {
  const endpoint = `/stock/${symbol}/price-target`;
  const data: KVP = await iexApiRequest.get(endpoint);
  const result = Object.assign(new PriceTarget(), data);
  return result;
};

export class PriceTarget {
  public symbol: string = "";
  public updatedDate: string = "";
  public priceTargetAverage: number = 0;
  public priceTargetHigh: number = 0;
  public priceTargetLow: number = 0;
  public numberOfAnalysts: number = 0;
}

import iexApiRequest from "./iexcloud.service";

interface KVP {
  [k: string]: any;
}

export const marketSymbols = async (): Promise<MarketSymbol[]> => {
  const endpoint = "/ref-data/symbols";
  const data: KVP[] = await iexApiRequest.get(endpoint);
  const result = data.map((o: KVP) => Object.assign(new MarketSymbol(), o));
  return result;
};

export class MarketSymbol {
  public symbol: string = "";
  public name: string = "";
  public date: string = "";
  public isEnabled: boolean = false;
  public type: string = "";
  public iexId: string = "";
}

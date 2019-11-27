import iexApiRequest from "./iexcloud.service";

interface KVP {
  [k: string]: any;
}

export const iexSymbols = async (): Promise<IEXSymbol[]> => {
  const endpoint = "/ref-data/iex/symbols";
  const data: KVP[] = await iexApiRequest.get(endpoint);
  const result = data.map((o: KVP) => Object.assign(new IEXSymbol(), o));
  return result;
};

export class IEXSymbol {
  public symbol: string = "";
  public date: string = "";
  public isEnabled: boolean = true;
}

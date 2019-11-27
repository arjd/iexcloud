import iexApiRequest from "./iexcloud.service";

interface KVP {
  [k: string]: any;
}

export const previousDay = async (symbol: string): Promise<PreviousDay> => {
  const endpoint = `/stock/${symbol}/previous`;
  const data: KVP = await iexApiRequest.get(endpoint);
  const result = Object.assign(new PreviousDay(), data);
  return result;
};

export class PreviousDay {
  public symbol: string = "";
  public date: string = "";
  public open: number = 0;
  public high: number = 0;
  public low: number = 0;
  public close: number = 0;
  public volume: number = 0;
  public unadjustedVolume: number = 0;
  public change: number = 0;
  public changePercent: number = 0;
}

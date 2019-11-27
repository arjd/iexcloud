import iexApiRequest from "./iexcloud.service";

interface KVP {
  [k: string]: any;
}

export const effectiveSpread = async (
  symbol: string
): Promise<EffectiveSpread[]> => {
  const endpoint = `/stock/${symbol}/effective-spread`;
  const data: KVP[] = await iexApiRequest.get(endpoint);
  const result = data.map((o: KVP) => {
    const r = Object.assign(new EffectiveSpread(), o);
    r.symbol = symbol;
    return r;
  });
  return result;
};

export class EffectiveSpread {
  public symbol: string = "";
  public volume: number = 0;
  public venue: string = "";
  public venueName: string = "";
  public effectiveSpread: number = 0;
  public effectiveQuoted: number = 0;
  public priceImprovement: number = 0;
}

import iexApiRequest from "./iexcloud.service";

interface KVP {
  [k: string]: any;
}

export const deepTrades = async (symbol: string): Promise<DEEPTrade[]> => {
  const endpoint = `/deep/trades?symbols=${symbol}`;
  const data: KVP = await iexApiRequest.get(endpoint);
  // console.log(data);
  const result: DEEPTrade[] = Object.keys(data).map( (key:string)  => {
    const r: DEEPTrade = Object.assign(new DEEPTrade(), data.key);
    r.symbol = key;
    return r;
  });
  
  return result;
};

export class DEEPTrade {
  public symbol: string = "";
  public price: number = 0;
  public size: number = 0;
  public tradeId: number = 0;
  public isISO: boolean = false;
  public isOddLot: boolean = false;
  public isOutsideRegularHours: boolean = false;
  public isSinglePriceCross: boolean = false;
  public isTradeThroughExempt: boolean = false;
  public timestamp: number = 0;
}

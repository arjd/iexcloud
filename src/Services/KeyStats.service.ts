import iexApiRequest from "./iexcloud.service";

interface KVP {
  [k: string]: any;
}



export const keyStats = async (symbol: string, stat?: keyof KeyStats): Promise<KeyStats> => {
  const endpoint = `/stock/${symbol}/stats${stat ? `/${stat}` : ''}`;
  const res = await iexApiRequest.get(endpoint);
  let data: KVP;
  if (stat) {
    data = {};
    data[stat] = res;
    data[symbol] = symbol;
  } else {
    data = res;
  }
  return Object.assign(new KeyStats(), data);
};

export class KeyStats {
  public companyName: string = "";
  public marketcap: number = 0;
  public week52high: number = 0;
  public week52low: number = 0;
  public week52change: number = 0;
  public sharesOutstanding: number = 0;
  public float: number = 0;
  public symbol: string = "";
  public avg10Volume: number = 0;
  public avg30Volume: number = 0;
  public day200MovingAvg: number = 0;
  public day50MovingAvg: number = 0;
  public employees: number = 0;
  public ttmEPS: number = 0;
  public ttmDividendRate: number=0;
  public dividendYield: number=0;
  public nextDividendDate: string="";
  public exDividendDate: string="";
  public nextEarningsDate: string="";
  public peRatio: number=0;
  public beta: number=0;
  public maxChangePercent: number = 0;
  public year5ChangePercent: number = 0;
  public year2ChangePercent: number = 0;
  public year1ChangePercent: number = 0;
  public ytdChangePercent: number = 0;
  public month6ChangePercent: number = 0;
  public month3ChangePercent: number = 0;
  public month1ChangePercent: number = 0;
  public day30ChangePercent: number = 0;
  public day5ChangePercent: number = 0;
}

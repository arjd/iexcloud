import iexApiRequest from "./iexcloud.service";

interface KVP {
  [k: string]: any;
}

export const advancedStats = async (symbol: string): Promise<AdvancedStats> => {
  const endpoint = `/stock/${symbol}/advanced-stats`;
  const data: KVP = await iexApiRequest.get(endpoint);
  const result = Object.assign(new AdvancedStats(), data);
  return result;
};

export class AdvancedStats {
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
  public totalCash: number = 0;
  public currentDebt: number = 0;
  public revenue: number = 0;
  public grossProfit: number = 0;
  public totalRevenue: number = 0;
  public EBITDA: number = 0;
  public revenuePerShare: number = 0;
  public revenuePerEmployee: number = 0;
  public debtToEquity: number = 0;
  public profitMargin: number = 0;
  public enterpriseValue: number = 0;
  public enterpriseValueToRevenue: number = 0;
  public priceToSales: number = 0;
  public priceToBook:  number = 0;
  public forwardPERatio: number | null = 0;
  public pegRatio: number = 0;
  public beta: number = 0;
}

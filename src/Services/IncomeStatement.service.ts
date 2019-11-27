import iexApiRequest from "./iexcloud.service";

interface KVP {
  [k: string]: any;
}

export const incomeStatement = async (
  symbol: string,
  lastN: number = 1,
  period: string = "quarter"
): Promise<IncomeStatement[]> => {
  const endpoint = `/stock/${symbol}/income/${lastN}?period=${period}`;
  const data: KVP = await iexApiRequest.get(endpoint);
  // console.log(data);
  const result: any[] = data.income;
  return result.map((o: KVP) => {
    const r = Object.assign(new IncomeStatement(), o);
    r.symbol = symbol;
    return r;
  });
};

export class IncomeStatement {
  public symbol: string ="";
  public reportDate: string = "";
  public totalRevenue: number = 0;
  public costOfRevenue: number = 0;
  public grossProfit: number = 0;
  public researchAndDevelopment: number = 0;
  public sellingGeneralAndAdmin: number = 0;
  public operatingExpense: number = 0;
  public operatingIncome: number = 0;
  public otherIncomeExpenseNet: number = 0;
  public ebit: number = 0;
  public interestIncome: number = 0;
  public pretaxIncome: number = 0;
  public incomeTax: number = 0;
  public minorityInterest: number = 0;
  public netIncome: number = 0;
  public netIncomeBasic: number = 0;
}

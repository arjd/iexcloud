import iexcloud from "../iexcloud";
import {
  AdvancedStats, BalanceSheet, Book, CashFlowStatement, CeoCompensation,
  Company, DelayedQuote, Dividends, Earnings, EarningsExtended, EarningsToday, 
  EndOfDay, Estimates, Financials, IncomeStatement, Intraday, KeyStats, Logo, 
  NewsItem, OHLC, PreviousDay, PriceTarget, Quote, SocialSentiment, Splits, timePeriod, 
  VolumeByVenue
} from "../types";

export const advancedStats = async (symbol: string): Promise<AdvancedStats> => 
  new AdvancedStats(await iexcloud.services.get(`/stock/${symbol}/advanced-stats`));

// tslint:disable-next-line: class-name
interface iBalanceSheet { symbol: string, balancesheet: object[] }
/**
 * Pulls balance sheet data. Available quarterly (4 quarters) and annually (4 years)
 * - Data Weigthing: 3000 message units per symbol per period
 */
export const balanceSheet = async (
  symbol: string,
  last: number = 1,
  period: string = "quarter"
): Promise<BalanceSheet[]> =>
  (await iexcloud.services.get(`/stock/${symbol}/balance-sheet`, { period, last }) as iBalanceSheet)
    .balancesheet.map(o => new BalanceSheet(o));

export const book = async (symbol: string): Promise<Book> =>
  new Book(await iexcloud.services.get(`/stock/${symbol}/book`)); 

// tslint:disable-next-line: class-name
interface iCashFlowStatement { symbol: string, cashflow: object[] }
/**
 * Pulls cash flow data. Available quarterly (4 quarters) and annually (4 years)
 *
 * - Data Weighting: 1000 message units per symbol per period
 * - Data Schedule: Updates at 8am, 9am UTC daily
 */
export const cashFlowStatement = async (
  symbol: string,
  last: number = 1,
  period: "annual" | "quarter" = "quarter"
): Promise<CashFlowStatement[]> =>
  (await iexcloud.services.get(`/stock/${symbol}/cash-flow`, { period, last }) as iCashFlowStatement)
    .cashflow.map(o => new CashFlowStatement(o));

export const ceoCompensation = async (symbol: string): Promise<CeoCompensation> =>
  new CeoCompensation(await iexcloud.services.get(`/stock/${symbol}/ceo-compensation`)); 

export const collection = async (collectionType: "sector" | "tag" | "list", collectionName: string): Promise<Quote[]> =>
  (await iexcloud.services.get(`/stock/market/collection/${collectionType}?collectionName=${collectionName}`) as unknown as object[])
    .map(o => new Quote(o));

export const company = async (symbol: string): Promise<Company> =>
  new Company(await iexcloud.services.get(`/stock/${symbol}/company`)); 

export const delayedQuote = async (symbol: string): Promise<DelayedQuote> =>
  new DelayedQuote(await iexcloud.services.get(`/stock/${symbol}/delayed-quote`)); 

export const dividends = async (
  symbol: string,
  range: timePeriod = "1y"
): Promise<Dividends[]> =>
  (await iexcloud.services.get(`/stock/${symbol}/dividends/${range}`) as unknown as object[])
    .map(o => new Dividends(o));

// tslint:disable-next-line: class-name
interface iEarnings { earnings: object[] };
export const earnings = async (
  symbol: string,
  lastN: number = 1
): Promise<Earnings[]> => 
  (await iexcloud.services.get(`/stock/${symbol}/earnings/${lastN}/`) as iEarnings)
    .earnings.map(o => new Earnings(o));

// tslint:disable-next-line: class-name
interface iEarningsToday { amc: object, bto: object, other: object };
export const earningsToday = async (symbol: string): Promise<EarningsToday> =>
  Object.entries(await iexcloud.services.get(`/stock/${symbol}/today-earnings/`) as iEarningsToday)
    .reduce((obj, item) => {
      const [k, o] = item;
      obj[k as keyof EarningsToday] = new EarningsExtended(o);
      return obj;
    }, new EarningsToday({}));

export const candles = async (
  symbol: string,
  options: {
    date: number,
    chartInterval?: number,
    chartLast?: number,
  }
): Promise<EndOfDay[]> => // FIXME: what would the data model look like in this case
  (await history(symbol, {
    changeFromClose: false,
    chartInterval: options.chartInterval ?? 1,
    chartLast: options.chartLast ?? 0,
    chartSimplify: false,
    date: options.date,
    period: '1m'
  }) as unknown as object[])
    .map(o => new EndOfDay(o));

export const endOfDay = async (
  symbol: string,
  options?: { 
    date?: number,
    chartLast?: number,
    chartCloseOnly?: boolean,
    chartInterval?: number,
    chartReset?: boolean,
    chartSimplify?: boolean
  }
): Promise<EndOfDay[]> => {
  const result = await history(symbol, {
    changeFromClose: true,
    chartInterval: options?.chartInterval ?? 1,
    chartLast: options?.chartLast ?? 0,
    chartSimplify: options?.chartSimplify ?? false,
    period: options?.date ? '1m' : 'dynamic'
  });
  return (result as unknown as object[])
    .map(o => new EndOfDay(o));
}

// tslint:disable-next-line: class-name
interface iEstimates { symbol: string, estimates: object[] };
export const estimates = async (
  symbol: string,
  lastN: number = 1
): Promise<Estimates[]> =>
  (await iexcloud.services.get(`/stock/${symbol}/estimates/${lastN}`) as iEstimates)
    .estimates.map(o => new Estimates(o));

// tslint:disable-next-line: class-name
interface iFinancials { symbol: string, financials: object[] };
/**
 * Pulls income statement, balance sheet, and cash flow data from the most recent reported quarter.
 *
 * - Data Weigthing: 5000 per symbol per period
 *
 * @param symbol - a market symbol
 * @param period - "annual" | "quarter"
 * @returns array of records
 *
 */
export const financials = async (symbol: string, lastN: number = 1, period: string = "annual"): Promise<Financials[]> =>
  (await iexcloud.services.get(`/stock/${symbol}/financials`, { period }) as iFinancials)
    .financials.map(o => new Financials(o));

// tslint:disable-next-line: class-name
interface iHistory { range: timePeriod; data: object[] }
export const history = async (
  symbol: string,
  options: {
    period: Exclude<timePeriod, '1d' | 'next'>,
    date?: number,
    chartCloseOnly?: boolean,
    chartByDay?: boolean,
    chartSimplify?: boolean,
    chartInterval?: number,
    changeFromClose?: boolean,
    chartLast?: number,
    range?: string,
    exactDate?: string,
    sort?: 'asc' | 'desc'
    includeToday?: boolean,
  }
): Promise<EndOfDay[]> => {
  const endpoint = `/stock/${symbol}/chart/${options.period}${
    options.date ? `/date/${options.date}` : ''}`;
  delete options.period;
  const result = await iexcloud.services.get(endpoint, Object.assign({
    chartByDay: options.date? true : false,
  }, options));

  return result.data ?
    (result as unknown as iHistory).data.map(o => new EndOfDay(o)): 
      (result as unknown as object[]).map(o => new EndOfDay(o));
  }

// tslint:disable-next-line: class-name
interface iIncomeStatement { symbol: string, income: object[] };
export const incomeStatement = async (
  symbol: string,
  last: number = 1,
  period: string = "quarter"
): Promise<IncomeStatement[]> =>
  (await iexcloud.services.get(`/stock/${symbol}/income`, { period, last }) as iIncomeStatement)
    .income.map(o => new IncomeStatement(o));

// FIXME: use intraday-prices     chartReset: false,     chartIEXOnly?: boolean,
// export const intraday = async(
//   symbol: string,
//   chartLast: number = 0,
//   chartInterval: number = 1,
//   changeFromClose: boolean = true,
//   chartSimplify: boolean = false,
//   includeToday: boolean = false
// ): Promise<Intraday[]> => 
//   history(symbol, {
//     changeFromClose, chartInterval, chartLast, chartSimplify, includeToday, period: 'dynamic'
//   }) as unknown as Intraday[];

export const intradayPrices = async (symbol: string): Promise<Intraday[]> =>
  (await iexcloud.services.get(`/stock/${symbol}/intraday-prices`) as unknown as object[])
    .map(o => new Intraday(o));

export const keyStats = async (symbol: string, stat?: keyof KeyStats): Promise<KeyStats> =>
  new KeyStats(await iexcloud.services.get(`/stock/${symbol}/stats${stat ? `/${stat}` : ''}`)); 

export const logoURL = async (symbol: string): Promise<Logo> =>
  new Logo(await iexcloud.services.get(`/stock/${symbol}/logo`)); 

export const news = async (symbol: string, lastN: number = 10): Promise<NewsItem[]> =>
  (await iexcloud.services.get(`/stock/${symbol}/news/last/${lastN}`) as unknown as object[])
    .map(o => new NewsItem(o));

export const ohlc = async (symbol: string): Promise<OHLC> =>
  new OHLC(await iexcloud.services.get(`/stock/${symbol}/ohlc`));

export const peers = async (symbol: string): Promise<string[]> =>
  iexcloud.services.get(`/stock/${symbol}/peers`)

export const previousDay = async (symbol: string): Promise<PreviousDay> =>
  new PreviousDay(await iexcloud.services.get(`/stock/${symbol}/previous`)); 

export const price = async (symbol: string): Promise<number> =>
  iexcloud.services.get(`/stock/${symbol}/price`); 

export const priceTarget = async (symbol: string): Promise<PriceTarget> =>
  new PriceTarget(await iexcloud.services.get(`/stock/${symbol}/price-target`)); 

export const quote = async (symbol: string): Promise<Quote> =>
  new Quote(await iexcloud.services.get(`/stock/${symbol}/quote`)); 

export const socialSentiment = async (
  symbol: string,
  type: 'daily' | 'minute' = "daily",
  date: string = (new Date()).toISOString()[0].replace(/-/g, '')
): Promise<SocialSentiment | SocialSentiment[]> => {
  const result = await iexcloud.services.get(`/stock/${symbol}/sentiment/${type}/${date}`);

  return type === 'minute' ? (result as unknown as object[]).map(o => new SocialSentiment(o)) :
    new SocialSentiment(result as unknown as object);
}

export const splits = async (
  symbol: string,
  period: timePeriod = "1m"
): Promise<Splits[]> =>
  (await iexcloud.services.get(`/stock/${symbol}/splits/${period}`) as unknown as object[])
    .map(o => new Splits(o));

export const volumeByVenue = async (symbol: string): Promise<VolumeByVenue[]> =>
  (await iexcloud.services.get(`/stock/${symbol}/volume-by-venue`) as unknown as object[])
    .map(o => new VolumeByVenue(o));

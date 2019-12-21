/* tslint:disable max-classes-per-file */
import { Serializer } from "./serializable";

export type listType =
| "mostactive"
| "gainers"
| "losers"
| "iexvolume"
| "iexpercent"
| "infocus";

export type PriceType = "Open" | "Close";

type date = number;

export type timePeriod = "next" | "max" | "dynamic" | date | "5d" | "5dm" | "1mm" | "1m" | "3m" | "6m" | "ytd" | "1y" | "2y" | "5y";

export type UsageType =
  | "messages"
  | "rules"
  | "rule-records"
  | "alerts"
  | "alert-records";

export class AccountMetaData extends Serializer {
  public payAsYouGoEnabled!: boolean;
  public effectiveDate!: number;
  public endDateEffective: number | undefined;
  public subscriptionTermType!: string;
  public tierName!: string;
  public messageLimit!: number;
  public messagesUsed!: number;
  public circuitBreaker!: number | null;
}

export class MessageUsage extends Serializer {
  public dailyUsage!: { [k: string]: number; } | null;
  public monthlyUsage!: number;
  public monthlyPayAsYouGo!: number;
  public tokenUsage!: { [k: string]: number; } | null;
  public keyUsage!: { [k: string]: number; } | null;
}

export type RulesUsage = string[];
export class Quote extends Serializer {
  public constrsymbol!: string;
  public companyName!: string;
  public calculationPrice!: string;
  public open!: number;
  public openTime!: number;
  public close!: number;
  public closeTime!: number;
  public high!: number;
  public low!: number;
  public latestPrice!: number;
  public latestSource!: string;
  public latestTime!: string;
  public latestUpdate!: number;
  public latestVolume!: number;
  public iexRealtimePrice!: number;
  public iexRealtimeSize!: number;
  public iexLastUpdated!: number;
  public delayedPrice!: number;
  public delayedPriceTime!: number;
  public extendedPrice!: number;
  public extendedChange!: number;
  public extendedChangePercent!: number;
  public extendedPriceTime!: number;
  public previousClose!: number;
  public change!: number;
  public changePercent!: number;
  public iexMarketPercent!: number;
  public iexVolume!: number;
  public avgTotalVolume!: number;
  public iexBidPrice!: number;
  public iexBidSize!: number;
  public iexAskPrice!: number;
  public iexAskSize!: number;
  public marketCap!: number;
  public week52High!: number;
  public week52Low!: number;
  public ytdChange!: number;
}

export class PreviousDay extends Serializer {
  public symbol!: string;
  public date!: string;
  public open!: number;
  public high!: number;
  public low!: number;
  public close!: number;
  public volume!: number;
  public unadjustedVolume!: number;
  public change!: number;
  public changePercent!: number;
}

export class PriceTarget extends Serializer {
  public symbol!: string;
  public updatedDate!: string;
  public priceTargetAverage!: number;
  public priceTargetHigh!: number;
  public priceTargetLow!: number;
  public numberOfAnalysts!: number;
}

export class SocialSentiment extends Serializer {
  public symbol!: string;
  public date!: string;
  public minute!: string | null;
  public sentiment!: number;
  public totalScores!: number;
  public positive!: number;
  public negative!: number;
}

export class KeyStats extends Serializer {
  public companyName!: string;
  public marketcap!: number;
  public week52high!: number;
  public week52low!: number;
  public week52change!: number;
  public sharesOutstanding!: number;
  public float!: number;
  public avg10Volume!: number;
  public avg30Volume!: number;
  public day200MovingAvg!: number;
  public day50MovingAvg!: number;
  public employees!: number;
  public ttmEPS!: number;
  public ttmDividendRate!: number;
  public dividendYield!: number;
  public nextDividendDate!: string;
  public exDividendDate!: string;
  public nextEarningsDate!: string;
  public peRatio!: number;
  public beta!: number;
  public maxChangePercent!: number;
  public year5ChangePercent!: number;
  public year2ChangePercent!: number;
  public year1ChangePercent!: number;
  public ytdChangePercent!: number;
  public month6ChangePercent!: number;
  public month3ChangePercent!: number;
  public month1ChangePercent!: number;
  public day30ChangePercent!: number;
  public day5ChangePercent!: number;
}

export class AdvancedStats extends KeyStats {
  public beta!: number;
  public totalCash!: number;
  public currentDebt!: number;
  public revenue!: number;
  public grossProfit!: number;
  public totalRevenue!: number;
  public EBITDA!: number;
  public revenuePerShare!: number;
  public revenuePerEmployee!: number;
  public debtToEquity!: number;
  public profitMargin!: number;
  public enterpriseValue!: number;
  public enterpriseValueToRevenue!: number;
  public priceToSales!: number;
  public priceToBook!: number;
  public forwardPERatio!: number | null;
  public pegRatio!: number;
  public peHigh!: number;
  public peLow!: number;
  public week52highDate!: string;
  public week52lowDate!: string;
  public putCallRatio!: number;
}

export class SectorPerformance extends Serializer {
  public type!: string;
  public name!: string;
  public performance!: number;
  public lastUpdated!: number;
}

export class Splits extends Serializer {
  public exDate!: string;
  public declaredDate!: string;
  public ratio!: number;
  public toFactor!: number;
  public fromFactor!: number;
  public description!: string;
}

export class VolumeByVenue extends Serializer {
  public symbol!: string;
  public volume!: number;
  public venue!: string;
  public venueName!: string;
  public date!: string;
  public marketPercent!: number;
  public avgMarketPercent!: number;
}

export class TOPSLast extends Serializer {
  public symbol!: string;
  public price!: number;
  public size!: number;
  public time!: number;
}

export class TOPS extends Serializer {
  public symbol!: string;
  public marketPercent!: number;
  public bidSize!: number;
  public bidPrice!: number;
  public askSize!: number;
  public askPrice!: number;
  public volume!: number;
  public lastSalePrice!: number;
  public lastSaleSize!: number;
  public lastSaleTime!: number;
  public lastUpdated!: number;
  public sector!: string;
  public securityType!: string;
}

export class OHLC extends Serializer {
  public symbol!: string;
  public open!: number;
  public close!: number;
  public high!: number;
  public low!: number;
  public openTime!: number;
  public closeTime!: number;
}

export class NewsItem extends Serializer {
  public datetime!: number;
  public headline!: string;
  public source!: string;
  public url!: string;
  public summary!: string;
  public related!: string;
  public image!: string;
  public lang!: string;
  public hasPaywall!: boolean;
}

export class MarketVolume extends Serializer {
  public mic!: string;
  public tapeId!: string;
  public venueName!: string;
  public volume!: number;
  public tapeA!: number;
  public tapeB!: number;
  public tapeC!: number;
  public marketPercent!: number;
  public lastUpdated!: number;
}

export class BalanceSheet extends Serializer {
  public symbol!: string;
  public reportDate!: string;
  public currentCash!: number;
  public shortTermInvestments!: number;
  public receivables!: number;
  public inventory!: number;
  public otherCurrentAssets!: number;
  public currentAssets!: number;
  public longTermInvestments!: number;
  public propertyPlantEquipment!: number;
  public goodwill!: number | null;
  public intangibleAssets!: number | null;
  public otherAssets!: number;
  public totalAssets!: number;
  public accountsPayable!: number;
  public currentLongTermDebt!: number;
  public otherCurrentLiabilities!: number;
  public totalCurrentLiabilities!: number;
  public longTermDebt!: number;
  public otherLiabilities!: number;
  public minorityInterest!: number;
  public totalLiabilities!: number;
  public commonStock!: number;
  public retainedEarnings!: number;
  public treasuryStock!: number | null;
  public capitalSurplus!: number | null;
  public shareholderEquity!: number;
  public netTangibleAssets!: number;
}

export class BidOrAsk extends Serializer {
  public price!: number;
  public size!: number;
  public timestamp!: number;
}

export class Trade extends Serializer {
  public price!: number;
  public size!: number;
  public tradeId!: number;
  public isISO!: boolean;
  public isOddLot!: boolean;
  public isOutsideRegularHours!: boolean;
  public isSinglePriceCross!: boolean;
  public isTradeThroughExempt!: boolean;
  public timestamp!: number;
}

export class SystemEvent extends Serializer {
  public systemEvent!: string;
  public timestamp!: number;
}

export class Book extends Serializer {
  public quote!: Quote;
  public bids!: BidOrAsk[];
  public asks!: BidOrAsk[];
  public trades!: Trade[];
  public systemEvent!: SystemEvent;
}

export class CashFlowStatement extends Serializer {
  public symbol!: string;
  public reportDate!: string;
  public netIncome!: number;
  public depreciation!: number;
  public changesInReceivables!: number;
  public changesInInventories!: number;
  public cashChange!: number;
  public cashFlow!: number;
  public capitalExpenditures!: number;
  public investments!: number;
  public investingActivityOther!: number;
  public totalInvestingCashFlows!: number;
  public dividendsPaid!: number;
  public netBorrowings!: number;
  public otherFinancingCashFlows!: number;
  public cashFlowFinancing!: number;
  public exchangeRateEffect!: number | null;
}

export class CeoCompensation extends Serializer {
  public symbol!: string;
  public name!: string;
  public companyName!: string;
  public location!: string;
  public salary!: number;
  public bonus!: number;
  public stockAwards!: number;
  public optionAwards!: number;
  public nonEquityIncentives!: number;
  public pensionAndDeferred!: number;
  public otherComp!: number;
  public total!: number;
  public year!: string;
}

export class Company extends Serializer {
  public symbol!: string;
  public companyName!: string;
  public CEO!: string;
  public exchange!: string;
  public industry!: string;
  public website!: string;
  public description!: string;
  public issueType!: string;
  public sector!: string;
  public securityName!: string;
  public tags!: string[];
  public employees!: number;
}

export class DataPoint extends Serializer {
  public key!: string;
  public weight!: number;
  public description!: string;
  public lastUpdated!: string;
}

export class Auction extends Serializer {
  public auctionType!: string;
  public pairedShares!: number;
  public imbalanceShares!: number;
  public referencePrice!: number;
  public indicativePrice!: number;
  public auctionBookPrice!: number;
  public collarReferencePrice!: number;
  public lowerCollarPrice!: number;
  public upperCollarPrice!: number;
  public extensionNumber!: number;
  public startTime!: string;
  public lastUpdate!: number;
}

export class DEEPBook extends Serializer {
  public symbol!: string;
  public bids!: BidOrAsk[];
  public asks!: BidOrAsk[];
}

export class DEEPOfficialPrice extends Serializer {
  public symbol!: string;
  public priceType!: PriceType;
  public price!: number;
  public timestamp!: number;
}

export class DEEPTrade extends Serializer {
  public symbol!: string;
  public price!: number;
  public size!: number;
  public tradeId!: number;
  public isISO!: boolean;
  public isOddLot!: boolean;
  public isOutsideRegularHours!: boolean;
  public isSinglePriceCross!: boolean;
  public isTradeThroughExempt!: boolean;
  public timestamp!: number;
}

export class DelayedQuote extends Serializer {
  public symbol!: string;
  public delayedPrice!: number;
  public delayedSize!: number;
  public delayedPriceTime!: number;
  public high!: number;
  public low!: number;
  public totalVolume!: number;
  public processedTime!: number;
}

export class Dividends extends Serializer {
  public symbol!: string;
  public exDate!: string;
  public paymentDate!: string;
  public recordDate!: string;
  public declaredDate!: string;
  public amount!: number;
  public flag!: string;
  public currency!: string;
  public description!: string;
  public frequency!: string;
}

export class Earnings extends Serializer {
  public symbol!: string;
  public actualEPS!: number;
  public consensusEPS!: number;
  public announceTime!: string;
  public numberOfEstimates!: number;
  public EPSSurpriseDollar!: number;
  public EPSReportDate!: string;
  public fiscalPeriod!: string;
  public fiscalEndDate!: string;
  public yearAgo!: number;
  public yearAgoChangePercent!: number;
}

// tslint:disable-next-line: class-name
export class EarningsExtended extends Earnings {
  public estimatedChangePercent!: number;
  public quote!: Quote;
}

export class EarningsToday extends Serializer {
  public amc!: EarningsExtended;
  public bto!: EarningsExtended;
  public other!: EarningsExtended;
}

export class EndOfDay extends Serializer {
  public symbol!: string;
  public date!: string;
  public open!: number;
  public high!: number;
  public low!: number;
  public close!: number;
  public volume!: number;
  public uOpen!: number;
  public uHigh!: number;
  public uLow!: number;
  public uClose!: number;
  public uVolume!: number;
  public change!: number;
  public changePercent!: number;
  public label!: string;
  public changeOverTime!: number;
}

export class EndOfDayCloseOnly extends Serializer {
  public symbol!: string;
  public date!: string;
  public close!: number;
  public volume!: number;
}

export class Estimates extends Serializer {
  public consensusEPS!: number;
  public numberOfEstimates!: number;
  public fiscalPeriod!: string;
  public fiscalEndDate!: string;
  public reportDate!: string;
}

export class Financials extends Serializer {
  public symbol!: string;
  public reportDate!: string;
  public grossProfit!: number;
  public costOfRevenue!: number;
  public operatingRevenue!: number;
  public totalRevenue!: number;
  public operatingIncome!: number;
  public netIncome!: number;
  public researchAndDevelopment!: number;
  public operatingExpense!: number;
  public currentAssets!: number;
  public totalAssets!: number;
  public totalLiabilities!: number;
  public currentCash!: number;
  public currentDebt!: number;
  public totalCash!: number;
  public totalDebt!: number;
  public shareholderEquity!: number;
  public cashChange!: number;
  public cashFlow!: number;
  public operatingGainsLosses!: number | null;
}

export class IEXSymbol extends Serializer {
  public symbol!: string;
  public date!: string;
  public isEnabled!: boolean;
}

export class IncomeStatement extends Serializer {
  public symbol!: string;
  public reportDate!: string;
  public totalRevenue!: number;
  public costOfRevenue!: number;
  public grossProfit!: number;
  public researchAndDevelopment!: number;
  public sellingGeneralAndAdmin!: number;
  public operatingExpense!: number;
  public operatingIncome!: number;
  public otherIncomeExpenseNet!: number;
  public ebit!: number;
  public interestIncome!: number;
  public pretaxIncome!: number;
  public incomeTax!: number;
  public minorityInterest!: number;
  public netIncome!: number;
  public netIncomeBasic!: number;
}

export class Intraday extends Serializer {
  public date!: string;
  public minute!: string;
  public label!: string;
  public high!: number;
  public low!: number;
  public average!: number;
  public volume!: number;
  public notional!: number;
  public numberOfTrades!: number;
  public marketHigh!: number;
  public marketLow!: number;
  public marketAverage!: number;
  public marketVolume!: number;
  public marketNotional!: number;
  public marketNumberOfTrades!: number;
  public open!: number;
  public close!: number;
  public marketOpen!: number;
  public marketClose!: number;
  public changeOverTime!: number;
  public marketChangeOverTime!: number;
}

export class Logo extends Serializer {
  public url!: string;
}

export class MarketSymbol extends Serializer {
  public symbol!: string;
  public name!: string;
  public date!: string;
  public isEnabled!: boolean;
  public type!: string;
  public iexId!: string;
}

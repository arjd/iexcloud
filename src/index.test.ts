/**
 * @jest-environment node
 */

import { iex } from "./index";

import {
  AccountMetaData, AdvancedStats, Auction, BalanceSheet, Book, CashFlowStatement,
  CeoCompensation,  Company, DEEPBook, DEEPOfficialPrice, DEEPTrade, DelayedQuote,
  Dividends, Earnings, EarningsToday, EndOfDay, EndOfDayCloseOnly,
  Estimates, Financials, IEXSymbol, IncomeStatement, Intraday, KeyStats, Logo,
  MarketSymbol, MarketVolume, MessageUsage, NewsItem, OHLC, PreviousDay, PriceTarget,
  Quote, RulesUsage, SectorPerformance, SocialSentiment, Splits, TOPS, TOPSLast,
  UsageType, VolumeByVenue
} from "./types";

// const defaultHandler = (evt: MessageEvent): void => {
//   // tslint:disable-next-line: no-console
//   console.log(evt.data);
// }

// define jest type checker
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeArrayInstanceOf<T>(T: T): CustomMatcherResult;
      toBeArrayTypeOf<T>(T: T): CustomMatcherResult;
      toBeTypeOf<T>(T: T): CustomMatcherResult;
    }
  }
}

const isType = (received: any, argument: any): boolean => {
  const initialType = typeof received;
  const type = initialType === "object" ? (Array.isArray(received) ? "array" : initialType) : initialType;
  return type === argument;
};

expect.extend({
  toBeArrayInstanceOf: (received: object[], argument) => {
    return received.reduce((prev, curr) => prev && curr instanceof argument, true) ? {
      message: () => `expected ${received} to be type ${argument.constructor}`,
      pass: true
    } : {
      message: () => `expected ${received} to be type ${argument.constructor}[]`,
      pass: false
    };
  },
  toBeArrayTypeOf: (received: object[], argument) => {
    return received.reduce((prev, curr) => prev && isType(curr, argument), true) ? {
      message: () => `expected received to be type ${argument}`,
      pass: true
    } : {
      message: () => `expected received to be type ${argument}[]`,
      pass: false
    };
  },
  toBeTypeOf: (received: object, argument) => {
    return isType(received, argument) ? {
      message: () => `expected received to be type ${argument}`,
      pass: true
    } : {
      message: () => `expected received to be type ${argument}[]`,
      pass: false
    };
  },
});

describe('stocks', () => {
  test("advancedStats", async () => {
    expect(await iex.stock.advancedStats("AAPL")).toBeInstanceOf(AdvancedStats)
  });
  test("balanceSheet", async () => {
    expect(await iex.stock.balanceSheet("AAPL")).toBeArrayInstanceOf(BalanceSheet)
  });
  test("cashFlowStatement", async () => {
    expect(await iex.stock.cashFlowStatement("AAPL")).toBeArrayInstanceOf(CashFlowStatement)
  });
  test("incomeStatement", async () => {
    expect(await iex.stock.incomeStatement("AAPL")).toBeArrayInstanceOf(IncomeStatement)
  });
  test("financials", async () => {
    expect(await iex.stock.financials("AAPL")).toBeArrayInstanceOf(Financials);
  });
  test("book", async () => {
    expect(await iex.stock.book("AAPL")).toBeInstanceOf(Book);
  });
  test("ceoCompensation", async () => {
    expect(await iex.stock.ceoCompensation("AAPL")).toBeInstanceOf(CeoCompensation);
  });
  test("company", async () => {
    expect(await iex.stock.company("AAPL")).toBeInstanceOf(Company);
  });
  test("delayedQuote", async () => {
    expect(await iex.stock.delayedQuote("AAPL")).toBeInstanceOf(DelayedQuote);
  });
  test("dividends", async () => {
    expect(await iex.stock.dividends("AAPL")).toBeArrayInstanceOf(Dividends);
  });
  test("earnings", async () => {
    expect(await iex.stock.earnings("AAPL")).toBeArrayInstanceOf(Earnings);
  });
  test("earningsToday", async () => {
    expect(await iex.stock.earningsToday("AAPL")).toBeInstanceOf(EarningsToday);
  });
  test("estimates", async () => {
    expect(await iex.stock.estimates("AAPL")).toBeArrayInstanceOf(Estimates);
  });
  test("history", async () => {
    const eod = await iex.stock.history("AAPL", { period: '5d'});
    expect(eod).toBeArrayInstanceOf(EndOfDay);
  });
  test("endOfDay", async () => {
    expect(await iex.stock.endOfDay("AAPL")).toBeArrayInstanceOf(EndOfDay);
  });
  test("endOfDay with date ", async () => {
    const date = 20190517;
    expect(await iex.stock.endOfDay("AAPL", { date })).toBeArrayInstanceOf(EndOfDay);
  });
  // test("intraday", async () => {
  //   expect(await iex.stock.intraday("AAPL")).toBeInstanceOf(Intraday);
  // });
  test("keyStats", async () => {
    expect(await iex.stock.keyStats("AAPL")).toBeInstanceOf(KeyStats);
  });
  test("list", async () => {
    expect(await iex.market.list("gainers")).toBeArrayInstanceOf(Quote);
  });
  test("logo", async () => {
    expect(await iex.stock.logoURL("AAPL")).toBeInstanceOf(Logo);
  });
  test("news", async () => {
    expect(await iex.stock.news("AAPL", 2)).toBeArrayInstanceOf(NewsItem);
  });
  test("ohlc", async () => {
    expect(await iex.stock.ohlc("AAPL")).toBeInstanceOf(OHLC);
  });
  test("peers", async () => {
    expect(await iex.stock.peers("AAPL")).toBeArrayTypeOf('string');
  });
  test("previousDay", async () => {
    expect(await iex.stock.previousDay("AAPL")).toBeInstanceOf(PreviousDay);
  });
  test("price", async () => {
    expect(await iex.stock.price("AAPL")).toBeTypeOf('number');
  });
  test("priceTarget", async () => {
    expect(await iex.stock.priceTarget("AAPL")).toBeInstanceOf(PriceTarget);
  });
  test("quote", async () => {
    expect(await iex.stock.quote("AAPL")).toBeInstanceOf(Quote);
  });
  test("socialSentiment daily", async () => {
    expect(await iex.stock.socialSentiment('AAPL', 'daily', "20190213")).toBeInstanceOf(SocialSentiment);
  });
  test("socialSentiment minute", async () => {
    expect(await iex.stock.socialSentiment('AAPL', 'minute', "20190213")).toBeArrayInstanceOf(SocialSentiment);
  });
  test("splits", async () => {
    expect(await iex.stock.splits("CNC")).toBeArrayInstanceOf(Splits);
  });
  test("volumeByVenue", async () => {
    expect(await iex.stock.volumeByVenue("AAPL")).toBeArrayInstanceOf(VolumeByVenue);
  });
});
describe('crypto', () => {
  test("cryptoQuote", async () => {
    expect(await iex.crypto.cryptoQuote("BTCUSD")).toBeInstanceOf(Quote);
  });
});
describe('referenceData', () => {
  test("iexSymbols", async () => {
    expect(await iex.referenceData.iexSymbols()).toBeArrayInstanceOf(IEXSymbol);
  });
  test("marketSymbols", async () => {
    expect(await iex.referenceData.marketSymbols()).toBeArrayInstanceOf(MarketSymbol);
  });  
});
describe('market', () => {
  test("marketVolume", async () => {
    expect(await iex.market.marketVolume()).toBeArrayInstanceOf(MarketVolume);
  });
  test("sectorPerformance", async () => {
    expect(await iex.market.sectorPerformance()).toBeArrayInstanceOf(SectorPerformance);
  });
});
describe('deep', () => {
  test("auction", async () => {
    expect(await iex.deep.auction("AAPL")).toBeInstanceOf(Auction);
  });
  test("officialPrice", async () => {
    expect(await iex.deep.officialPrice("AAPL")).toBeInstanceOf(DEEPOfficialPrice);
  });
  test("deepTrades", async () => {
    expect(await iex.deep.deepTrades("AAPL")).toBeArrayInstanceOf(DEEPTrade);
  });
});
describe('tops', () => {
  test("tops", async () => {
    expect(await iex.tops.tops("A")).toBeArrayInstanceOf(TOPS);
  });
  test("topsLast", async () => {
    expect(await iex.tops.topsLast("A")).toBeArrayInstanceOf(TOPSLast);
  });
})

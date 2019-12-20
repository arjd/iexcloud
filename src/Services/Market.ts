import iexcloud from "../iexcloud";
import {
  listType,
  MarketVolume,
  Quote,
  SectorPerformance
} from "../types";

// tslint:disable-next-line no-shadowed-variable
export const list = async (listType: listType): Promise<Quote[]> =>
  (await iexcloud.services.get(`/stock/market/list/${listType}`) as unknown as object[])
    .map(o => new Quote(o));

export const marketVolume = async (): Promise<MarketVolume[]> =>
  (await iexcloud.services.get(`/market`) as unknown as object[])
    .map(o => new MarketVolume(o));

export const sectorPerformance = async (): Promise<SectorPerformance[]> =>
  (await iexcloud.services.get(`/stock/market/sector-performance`) as unknown as object[])
    .map(o => new SectorPerformance(o));

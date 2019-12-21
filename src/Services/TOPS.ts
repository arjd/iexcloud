import iexcloud from "../iexcloud";
import {
  TOPS,
  TOPSLast
} from "../types";

const resolve = (s: string | string[]): string => Array.isArray(s) ? s.join(',') : s;

export const topsLast = async (symbol: string): Promise<TOPSLast[]> =>
  (await iexcloud.services.get(`/tops/last`, { symbols: resolve(symbol) }) as unknown as object[])
    .map(o => new TOPSLast(o));

export const tops = async (symbol: string): Promise<TOPS[]> =>
  (await iexcloud.services.get(`/tops`, { symbols: resolve(symbol) }) as unknown as object[])
    .map(o => new TOPS(o));

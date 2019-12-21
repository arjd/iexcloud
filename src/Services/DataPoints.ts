import iexcloud from "../iexcloud";
import { DataPoint } from "../types";

export const dataPoint = async (symbol: string, key: string): Promise<number | string> =>
  await iexcloud.services.get(`/data-points/${symbol}/${key}`);

export const dataPoints = async (symbol: string): Promise<DataPoint[]> => 
  (await iexcloud.services.get(`/data-points/${symbol}`) as unknown as object[])
    .map(o => new DataPoint(o));

export const marketDataPoints = async(): Promise<DataPoint[]> =>
  dataPoints('market');

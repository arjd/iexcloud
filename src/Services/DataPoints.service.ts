import * as _ from "lodash";
import iexApiRequest from "./iexcloud.service";

interface KVP {
  [k: string]: any;
}

type value = number | string;

export const dataPoints = async (symbol: string): Promise<DataPoint[]> => {
  const endpoint = `/data-points/${symbol}`;
  const data: KVP[] = await iexApiRequest.get(endpoint);
  const result = data.map(e => Object.assign(new DataPoint(), e));
  return result;
};

export const marketDataPoints = async(): Promise<DataPoint[]> => {
  return dataPoints('market');
}

export const dataPoint = async (symbol: string, key: string): Promise<KVP> => {
  const endpoint = `/data-points/${symbol}/${key}`;
  const data: value = await iexApiRequest.get(endpoint);
  key = _.camelCase(key);
  const result: KVP = {};
  result[key] = data;
  return result;
}

export class DataPoint {
  public key: string = "";
  public weight: number = 0;
  public description: string = "";
  public lastUpdated: string = "";
}
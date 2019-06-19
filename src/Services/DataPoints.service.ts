import iexApiRequest from "./iexcloud.service";

interface KVP {
  [k: string]: any;
}

export const dataPoints = async (symbol: string): Promise<DataPoint[]> => {
  const endpoint = `/data-points/${symbol}`;
  const data: KVP[] = await iexApiRequest.get(endpoint);
  const result = data.map(e => Object.assign(new DataPoint(), e));
  return result;
};

export const marketDataPoints = async(): Promise<DataPoint[]> => {
  return dataPoints('market');
}

export const dataPoint = async (symbol: string, key: string): Promise<DataValue> => {
  const endpoint = `/data-points/${symbol}/${key}`;
  const data: KVP[] = await iexApiRequest.get(endpoint);
  const result = Object.assign({} as DataValue, data);
  return result;
}

export class DataPoint {
  public key: string = "";
  public weight: number = 0;
  public description: string = "";
  public lastUpdated: string = "";
}

export interface DataValue {
  key: string;
  value: number | string;
}
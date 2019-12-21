import iexcloud from "../iexcloud";

export const status = async (): Promise<any> =>
  await iexcloud.services.get('/status');

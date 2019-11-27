import iexApiRequest from "./iexaccount.service";

interface KVP {
  [k: string]: any;
}

export const accountMetadata = async (): Promise<AccountMetaData> => {
  const endpoint = `/account/metadata`;
  const data: KVP = await iexApiRequest.get(endpoint);
  const result = Object.assign(new AccountMetaData(), data);
  return result;
};

export class AccountMetaData {
  public payAsYouGoEnabled: boolean = false;
  public effectiveDate: number = 0;
  public endDateEffective: number = 0;
  public subscriptionTermType: string = "";
  public tierName: string = "";
  public messageLimit: number = 0;
  public messagesUsed: number = 0;
}

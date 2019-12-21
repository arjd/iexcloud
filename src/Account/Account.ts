import iexcloud from "../iexcloud";
import {
  AccountMetaData,
  MessageUsage,
  RulesUsage,
  UsageType
} from "../types";

export const accountMetadata = async (): Promise<AccountMetaData> => 
  new AccountMetaData(await iexcloud.account.get(`/account/metadata`));

// FIXME: type definition for messageBudget
export const messageBudget = async (totalMessages: number): Promise<any> =>
  await iexcloud.account.post(`/account/messagebudget`, { totalMessages });

// FIXME: type definition for payAsYouGo
export const payAsYouGo = async (allow: boolean): Promise<any> =>
  await iexcloud.account.post(`/account/payasyougo`, { allow });

// FIXME: type definition for payAsYouGo
const usage = async (type: UsageType): Promise<any> =>
  await iexcloud.account.get(`/account/metadata/${type}`);

export const messageUsage = async (): Promise<MessageUsage> =>
  usage('messages');

export const rulesUsage = async (): Promise<RulesUsage> =>
  usage('rules');

export const ruleRecordsUsage = async (): Promise<any> =>
  usage('rule-records');

export const alertsUsage = async (): Promise<any> =>
  usage('alerts');

export const alertRecordsUsage = async (): Promise<any> =>
  usage('alert-records');
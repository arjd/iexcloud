import * as dotenv from "dotenv";
import iexApiRequest from "./iexaccount.service";

export const enablePayAsYouGo = (): Promise<any> =>
  iexApiRequest.post("/account/payasyougo", { token: iexApiRequest.token, allow: true });

export const disablePayAsYouGo = (): Promise<any> =>
  iexApiRequest.post("/account/payasyougo", { token: iexApiRequest.token, allow: false });

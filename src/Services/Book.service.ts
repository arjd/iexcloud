import { Quote } from "./Quote.service";

import iexApiRequest from "./iexcloud.service";

interface KVP {
  [k: string]: any;
}

export const book = async (symbol: string): Promise<Book> => {
  const endpoint = `/stock/${symbol}/book`;
  const data: KVP = await iexApiRequest.get(endpoint);
  const result = Object.assign(new Book(), data);
  return result;
};

export class Book {
    public quote: Quote = new Quote();
    public bids:  BidOrAsk[] = [];
    public asks:  BidOrAsk[] = [];
    public trades: Trade[] = [];
    public systemEvent: SystemEvent = {systemEvent: "", timestamp: 0};
}
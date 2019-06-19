import * as dotenv from "dotenv";
import * as EventSource  from "eventsource"
import * as superagent from "superagent";
import Throttle from 'superagent-throttle';

const ALLOWED_REQUESTS = 100;
const LIMIT_IN_MS = 1000;

const throttler = new Throttle({
  active: true,
  rate: ALLOWED_REQUESTS,
  ratePer: LIMIT_IN_MS
});

const baseURL = "https://cloud.iexapis.com/";
const sandboxURL = "https://sandbox.iexapis.com/";
// const baseSSEURL = "https://cloud-sse.iexapis.com/";

dotenv.config();

const pk = process.env.IEXCLOUD_PUBLIC_KEY!;
const sk = process.env.IEXCLOUD_SECRET_KEY!;
const apiversion = process.env.IEXCLOUD_API_VERSION!;

export class IEX {
  constructor(public token: string) { }

  public async get(endpoint: string): Promise<any> {
    const res = await this.request(superagent.get(this.constructURL(endpoint)));
    return res.body;
  };

  public async post(endpoint: string, body: object): Promise<any> {
    const res = await this.request(superagent.post(this.constructURL(endpoint)).send(body));
    return res.body;
  }
  private environment() {
    return this.token && this.token[0]==="T" ? sandboxURL : baseURL;
  }
  private chooseToken(str:string) {
    return `${str.includes("?") ? '&' : '?'}token=${this.token}`;
  }
  private constructURL(endpoint: string): string {
    return `${this.environment()}${apiversion}${endpoint}${this.chooseToken(endpoint)}`;
  }    
  private request(s: superagent.Request): superagent.Request {
    return s.use(throttler.plugin());
  } 
}

export default {
  account: new IEX(sk),
  services: new IEX(pk),
}
// const defaultHandler = (evt: MessageEvent) => {
//   console.log(evt.data);
// }

// export const iexsse = (endpoint:string, onOpen: (evt: MessageEvent) => any = defaultHandler,
//                        onMessage: (evt: MessageEvent) => any = defaultHandler,
//                        onError: (evt: MessageEvent)=>any = defaultHandler
//                        ) => {
//     const sseURL = baseSSEURL + apiversion + endpoint + chooseToken(endpoint);
//     const source = new EventSource(sseURL)
//     source.onmessage = onMessage
//     source.onopen = onOpen
//     source.onerror = onError
//     return source
// }

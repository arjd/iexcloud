import * as dotenv from "dotenv";
import * as EventSource  from "eventsource"
import * as superagent from "superagent";
import {default as Throttle} from 'superagent-throttle';

const throttler = new Throttle({
  active: true,
  rate: 100,
  ratePer: 60000
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

  public get(endpoint: string): Promise<any> {
    return this.request(superagent.get(this.constructURL(endpoint))).then((res : superagent.Response) => res.body);
  };

  public post(endpoint: string, body: object): Promise<any> {
    return this.request(superagent.post(this.constructURL(endpoint)).send(body)).then((res : superagent.Response) => res.body);
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

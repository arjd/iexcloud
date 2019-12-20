/* tslint:disable max-classes-per-file */
import * as dotenv from "dotenv";
import EventSource from "eventsource";
import * as superagent from "superagent";
import Throttle from 'superagent-throttle';

dotenv.config();

const ALLOWED_REQUESTS = 100;
const LIMIT_IN_MS = 1000;

const throttler = new Throttle({
  active: true,
  rate: ALLOWED_REQUESTS,
  ratePer: LIMIT_IN_MS
});

const url = {
  production: "https://cloud.iexapis.com/",
  'production-sse': "https://cloud-sse.iexapis.com/",
  test: "https://sandbox.iexapis.com/",
  'test-sse': 'https://sandbox-sse.iexapis.com/'
};

const pk = process.env.IEXCLOUD_PUBLIC_KEY!;
const sk = process.env.IEXCLOUD_SECRET_KEY!;
const apiversion = process.env.IEXCLOUD_API_VERSION!;

type KVP = null | {
  [k: string]: any;
}

type IEXCloudEnvironment = 'production' | 'production-sse' | 'test' | 'test-sse';

abstract class IIEX {
  public environment: string;
  constructor(environment: IEXCloudEnvironment, private token: string) {
    this.environment = url[environment];
  }

  public constructQuery(params?: KVP): string {
    return `?token=${this.token}${params ? Object.keys(params).map((k: string) =>
        `&${k}=${params[k].toString()}`).join('') : ''}`;
  }

  public constructURL(endpoint: string, params?: KVP): string {
    return `${this.environment}${apiversion}${endpoint}${this.constructQuery(params)}`;
  }
}

class IEX extends IIEX {
  constructor(token: string) {
    super(token[0]==="T" ? 'test' : 'production', token);
  }

  public async get(endpoint: string, params?: KVP): Promise<any> {
    const res = await this.request(superagent.get(this.constructURL(endpoint, params)));
    return res.body;
  };

  public async post(endpoint: string, body: object): Promise<any> {
    const res = await this.request(superagent.post(this.constructURL(endpoint)).send(body));
    return res.body;
  }

  private request(s: superagent.Request): superagent.Request {
    return s.use(throttler.plugin());
  } 
}

class IEXSSE extends IIEX {
  private source: EventSource;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(token: string, defaultHandler?: (evt: MessageEvent) => void) {
    super(token[0]==="T" ? 'test-sse' : 'production-sse', token);
    this.source = new EventSource(this.constructURL(''));
    if (defaultHandler) {
      this.source.onmessage = defaultHandler;
      this.source.onopen = defaultHandler;
      this.source.onerror = defaultHandler;
    }
  }

  public addEventListener(type: string, listener: EventListener): void {
    this.source.addEventListener(type, listener);
  }
    
  public dispatchEvent(evt: Event): boolean {
    return this.source.dispatchEvent(evt);
  }

  public removeEventListener(type: string, listener?: EventListener | undefined): void {
    this.source.removeEventListener(type, listener);
  }
}

const iexcloud = {
  account: new IEX(sk),
  services: new IEX(pk),
  sse: new IEXSSE(pk)
};

export default iexcloud;
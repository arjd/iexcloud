declare module 'superagent-throttle' {
  import * as request from 'superagent';

  type int = number;

  export class Throttle {
    constructor(options: {
        active: boolean;
        rate?: int;
        ratePer?: int;
        concurrent?: int;
    })
    plugin(): request.Plugin;
  }
}
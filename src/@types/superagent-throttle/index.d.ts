declare module 'superagent-throttle' {
  import * as request from 'superagent';

  type int = number;

  export default class Throttle {
    constructor(options: {
        active: boolean;
        rate?: int;
        ratePer?: int;
        concurrent?: int;
    })
    plugin(): request.Plugin;
  }
}
import { RequestObject, RpcError } from ".";
import { _version } from "./RpcObject";

export interface IClientRequest {
  request(rpsJson: any): Promise<any>;
}
interface IProxyStub {
  [key: string]: (...args: any[]) => Promise<any>;
}

/**
 * make a proxy to as client
 * if any method called ,and intercept with method and params to build request content
 */
export class RpcClient {
  public static build(
    client: IClientRequest,
    config = {
      responseResult: true,
    }
  ): IProxyStub {
    const target: IProxyStub = {
      // the request can be any like axios, fetch etc, pass it from outside
      // the real request function set here
      // Is it a right way?
      __client: client.request,
      __config: async () => config, // have to make it async () like :((
    };
    const resultProxy = new Proxy(target, new RpcClient());
    return resultProxy;
  }

  public get(target: any, name: string, receiver: RpcClient) {
    const req = Reflect.get(target, "__client", receiver);
    const cfgFun = Reflect.get(target, "__config", receiver);
    return async (...fargs: any[]) => {
      const cfg = await cfgFun();
      const id = RequestObject.nextId();
      const reqObj = new RequestObject(id, name, fargs, _version);
      const result = await req(reqObj.toJson());
      if (result.error) {
        throw new RpcError(result.error.code, result.error.message, result);
      }
      if (cfg.responseResult) {
        return result.result;
      } else {
        return result;
      }
    };
  }
}

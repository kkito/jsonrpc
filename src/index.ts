import { RequestObject } from "./RequestObject";
import { RpcDispatcher } from "./RpcDispatcher";
import { ResponseObject } from "./ResponseObject";
import { RpcError } from "./RpcError";

// the default dispatcher
let dispatcher = new RpcDispatcher();
export { RequestObject, RpcDispatcher, ResponseObject, RpcError };

export class JsonRpcUtil {
  public static getDispatcher(): RpcDispatcher {
    return dispatcher;
  }

  /**
   * if want set custom dispatcher
   * @param disp instance of RpcDispatcher
   */
  public static setDispatcher(disp: RpcDispatcher): RpcDispatcher {
    dispatcher = disp;
    return this.getDispatcher();
  }

  public static handle(reqJson: any): any {
    if (Array.isArray(reqJson)) {
      // array return array
      return reqJson.map((x) => this.handleSingle(x));
    } else {
      return this.handleSingle(reqJson);
    }
  }

  public static handleFromString(jsonStr: string): any {
    try {
      const reqJson = JSON.parse(jsonStr);
      return this.handle(reqJson);
    } catch (e) {
      const res = new ResponseObject();
      res.setError(RpcError.buildError(RpcError.ErrorParse));
      return res.toJson();
    }
  }

  public static handleSingle(reqJson: any): any {
    const req = RequestObject.buildFromJson(reqJson);
    const res = this.handleWithResponseJson(req);
    return res.toJson();
  }

  public static handleWithResponseJson(req: RequestObject): ResponseObject {
    const res = new ResponseObject();
    res.setRequest(req);
    try {
      const disp = this.getDispatcher();
      const result = disp.handle(req.getMethod(), ...req.getParams());
      res.setResult(result);
    } catch (e) {
      if (!(e instanceof RpcError)) {
        e = RpcError.buildError(RpcError.ErrorInternalError);
      }
      res.setError(e);
    }
    return res;
  }
}

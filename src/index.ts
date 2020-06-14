import { RequestObject } from "./RequestObject";
import { RpcDispatcher } from "./RpcDispatcher";
import { ResponseObject } from "./ResponseObject";
import { RpcError } from "./RpcError";

// the default dispatcher
const dispatcher = new RpcDispatcher();

export class JsonRpcUtil {
  public static getDispatcher(): RpcDispatcher {
    return dispatcher;
  }

  public static handle(reqJson: any): any {
    if (Array.isArray(reqJson)) {
      // array return array
      return reqJson.map((x) => this.handleSingle(x));
    } else {
      return this.handleSingle(reqJson);
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

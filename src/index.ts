import { RequestObject } from "./RequestObject";
import { RpcDispatcher } from "./RpcDispatcher";
import { ResponseObject } from "./ResponseObject";

// the default dispatcher
const dispatcher = new RpcDispatcher();

export class JsonRpcUtil {
  public static getDispatcher(): RpcDispatcher {
    return dispatcher;
  }

  public static handle(reqJson: any): any {
    const req = RequestObject.buildFromJson(reqJson);
    const res = this.handleWithResponseJson(req);
    return res.toJson();
  }

  public static handleWithResponseJson(req: RequestObject): ResponseObject {
    const disp = this.getDispatcher();
    const result = disp.handle(req.getMethod(), ...req.getParams());
    const res = new ResponseObject();
    res.setRequest(req);
    res.setResult(result);
    return res;
  }
}

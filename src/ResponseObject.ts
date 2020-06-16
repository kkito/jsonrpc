import { RpcObject, _version } from "./RpcObject";
import { RequestObject } from "./RequestObject";
import { RpcError } from "./RpcError";

export class ResponseObject extends RpcObject {
  protected resId?: number;
  protected error?: RpcError;
  protected result?: any;

  public setError(err: RpcError) {
    this.error = err;
  }

  public setResult(result: any) {
    this.result = result;
  }

  public setId(id: number) {
    this.resId = id;
  }

  public setRequest(request: RequestObject) {
    this.resId = request.getId();
  }

  public toJson(): any {
    const result = super.toJson();
    if (this.error) {
      Object.assign(result, {
        id: this.resId || null,
        error: this.error.toJson(),
      });
    } else {
      Object.assign(result, {
        id: this.resId,
        result: this.result,
      });
    }
    return result;
  }
}

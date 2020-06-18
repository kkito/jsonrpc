import { RpcObject, _version } from "./RpcObject";
import { RpcError } from "./RpcError";

export class RequestObject extends RpcObject {
  protected id: number;
  protected version?: string;
  protected method: string;
  protected params: any;
  /**
   * build RequestObject form json
   * @param rquestJson json request object
   */
  public static buildFromJson(reqJson: any): RequestObject {
    try {
      return new RequestObject(
        reqJson.id,
        reqJson.method,
        reqJson.params,
        reqJson.version
      );
    } catch (e) {
      throw RpcError.buildError(RpcError.ErrorInvalidRequest);
    }
  }

  public static buildRequestJson(method: string, ...params: any): any {
    return {
      id: this.nextId(),
      jsonrpc: _version,
      method,
      params,
    };
  }

  constructor(id: number, method: string, params: any, version?: string) {
    super();
    this.id = id;
    this.method = method;
    this.params = params;
    // TODO check version
    this.version = version;
  }

  public getId(): number {
    return this.id;
  }

  public getMethod(): string {
    return this.method;
  }

  public getParams(): any[] {
    return this.params;
  }

  public toJson() {
    const result = super.toJson();
    Object.assign(result, {
      id: this.id,
      method: this.method,
      params: this.params,
    });
    return result;
  }
}

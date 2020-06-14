import { RpcObject, _version } from "./RpcObject";

export class RequestObject extends RpcObject {
  protected id: number;
  protected version: string;
  protected method: string;
  protected params: any;
  /**
   * build RequestObject form json
   * @param rquestJson json request object
   */
  public static buildFromJson(reqJson: any): RequestObject {
    return new RequestObject(
      reqJson.id,
      reqJson.method,
      reqJson.params,
      reqJson.version
    );
  }

  public static buildRequestJson(method: string, ...params: any): any {
    return {
      id: this.nextId(),
      jsonrpc: _version,
      method,
      params,
    };
  }

  constructor(id: number, method: string, params: any, version: string) {
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
}

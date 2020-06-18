import { IRpcSerializer } from "./RpcObject";

export class RpcError extends Error implements IRpcSerializer {
  // https://www.jsonrpc.org/specification#error_object
  public static readonly ErrorParse: [number, string] = [-32700, "Parse error"];
  public static readonly ErrorInvalidRequest: [number, string] = [
    -32600,
    "Invalid Request",
  ];
  public static readonly ErrorMethodNotFound: [number, string] = [
    -32601,
    "Method not found",
  ];
  public static readonly ErrorInvalidParams: [number, string] = [
    -32602,
    "Invalid params",
  ];
  public static readonly ErrorInternalError: [number, string] = [
    -32603,
    "Internal error",
  ];

  public static buildError(errorInfo: [number, string]): RpcError {
    return new RpcError(errorInfo[0], errorInfo[1]);
  }

  protected errorCode: number;
  protected originResponse?: any;
  constructor(errorCode: number, msg: string, response: any = null) {
    super(msg);
    this.errorCode = errorCode;
    this.originResponse = response;
  }
  public toJson(): any {
    return {
      code: this.errorCode,
      message: this.message,
    };
  }
}

import { IRpcSerializer } from "./RpcObject";

export class RpcError extends Error implements IRpcSerializer {
  public toJson(): any {
    return {};
  }
}

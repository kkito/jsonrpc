import { IRpcDispather, IRpcDispatherFunction } from "./RpcObject";

export class RpcDispatcher {
  private dispatcherMapping: IRpcDispather;

  public constructor() {
    this.dispatcherMapping = {};
  }

  public add(methodName: string, func: IRpcDispatherFunction): IRpcDispather {
    this.dispatcherMapping[methodName] = func;
    return this.dispatcherMapping;
  }

  public handle(method: string, ...args: any[]): any {
    const func = this.dispatcherMapping[method];
    if (func) {
      return func(...args);
    } else {
      throw new Error("missing method");
    }
  }
}

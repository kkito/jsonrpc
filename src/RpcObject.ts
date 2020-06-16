export interface IRpcSerializer {
  toJson(): any;
}

export interface IRpcDispather {
  [method: string]: IRpcDispatherFunction;
}

export type IRpcDispatherFunction = (...args: any[]) => any;

let nextId = 0;
export const _version = "2.0";

export class RpcObject implements IRpcSerializer {
  public toJson(): any {
    return {
      jsonrpc: _version,
    };
  }

  /**
   * generate id
   */
  public static nextId(): number {
    return ++nextId;
  }
}

export interface IClientRequest {
  request(method: string, ...args: any[]): Promise<any>;
}
interface LooseObject {
  [key: string]: (...args: any[]) => Promise<any>;
}

export class RpcClient {
  // tslint:disable-next-line:variable-name
  protected __client: IClientRequest;

  public static build(client: IClientRequest): LooseObject {
    const target: LooseObject = {};
    const resultProxy = new Proxy(target, new RpcClient(client));
    return resultProxy;
  }

  constructor(client: IClientRequest) {
    this.__client = client;
  }

  public get(target: any, name: string, receiver: RpcClient) {
    // tslint:disable-next-line:no-console
    console.log("========= get!!!");
    // tslint:disable-next-line:no-console
    console.log(target);
    // tslint:disable-next-line:no-console
    console.log(name);
    // tslint:disable-next-line:no-console
    if (name.startsWith("__")) {
      return Reflect.get(receiver, name, receiver);
    } else {
      return (...fargs: any[]) => {
        // tslint:disable-next-line:no-console
        console.log(fargs);
        return 222;
      };
    }
  }

  public apply(target: any, name: any, args: any) {
    // tslint:disable-next-line:no-console
    console.log("========= apply!!!");
    // tslint:disable-next-line:no-console
    console.log(target);
    // tslint:disable-next-line:no-console
    console.log(name);
    // tslint:disable-next-line:no-console
    console.log(args);
    return 5;
  }
}

// const obj = {
//   prop1: () => {
//     return 3;
//   },
//   prop2: "hello",
// };

// const obj2: LooseObject = {};

// const proxy = new Proxy(obj2, {
//   get: (target, name) => {
//     return 5;
//   },
// });

// proxy.prop1();

const myclient = RpcClient.build({
  request: async (...args: any[]) => {
    // tslint:disable-next-line:no-console
    console.log(args);
    return 0;
  },
});

// tslint:disable-next-line:no-console
console.log(myclient.add(3, 4));
// tslint:disable-next-line:no-console
console.log(myclient.__client);

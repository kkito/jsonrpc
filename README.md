# jsonrpc

[![Build Status](https://travis-ci.org/kkito/jsonrpc.svg?branch=master)](https://travis-ci.org/kkito/jsonrpc)
[![npm version](https://badge.fury.io/js/%40kkito%2Fjsonrpc.svg)](https://badge.fury.io/js/%40kkito%2Fjsonrpc)

implement jsonrpc 2.0

https://www.jsonrpc.org/specification

---

we can

- from a json to request object
- build response json
- a mechanism to execute from json (request object) to response json (response object)
- all implement json rpc 2.0

### sample

server side

```javascript
import { JsonRpcUtil } from "@kkito/jsonrpc";

const disp = JsonRpcUtil.getDispatcher();
disp.add("add", (a, b) => a + b);
const result = JsonRpcUtil.handle({
  id: 1,
  method: "add",
  version: "2.0",
  params: [3, 4],
});

// { jsonrpc: '2.0', id: 1, result: 7 }
console.log(result);
```

client side

```javascript
import axios from "axios";

const proxy = RpcClient.build({
  request: async (jsonReq) => {
    return axios.post("/the_endpoint", jsonReq);
  },
});

const result = await proxy.add(3, 4);
```

import http from "http";
import { RequestOptions } from "https";
import { Requester } from "../models/requester";

export const REQUEST = async (requester: Requester) => {
  return new Promise((resolve, reject) => {
    let options = parseOptions(requester);
    let req = http
      .request(options, (response: any) => {
        let data = "";
        response.on("data", (chunk: any) => {
          console.log(data);
          data += chunk;
        });
        response.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      });
    if (requester.body) {
      req.write(JSON.stringify(requester.body));
    }
    req.end();
  });
};

function parseOptions(request: Requester): RequestOptions {
  validateRequest(request);
  let options = { ...request } as any;
  return options as RequestOptions;
}

function validateRequest(request: Requester) {
  console.log(request);
  if (!request.host || !request.path || !request.method || !request.port) {
    throw Error("Parametros estão faltando");
  }
}
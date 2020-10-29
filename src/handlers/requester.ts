import http from "http";
import { RequestOptions } from "https";
import { Requester } from "../models/requester";

// export const GET = async () => {
//   return new Promise((resolve, reject) => {
//     http
//     .get("http://localhost:8085/produtos", (response) => {
//       let data = "";
//       response.on("data", (chunk) => {
//         data += chunk;
//       });
//       response.on("end", () => {
//         console.log(data);
//         resolve(JSON.parse(data));
//       });
//     })
//     .on("error", (error) => {
//       console.log(error);
//       reject(error);
//     });
//   })
// };

// export const POST = async () => {
//   const data = JSON.stringify({});
//   const options = {
//     hostname: "whatever.com",
//     port: 443,
//     path: "/todos",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Content-Length": data.length,
//     },
//   };
//   const req = http.request(options, (res) => {
//     console.log(`statusCode: ${res.statusCode}`);

//     res.on("data", (d) => {
//       process.stdout.write(d);
//     });
//   });
//   req.on("error", (error) => {
//     console.error(error);
//   });
//   req.write(data);
//   req.end();
// };

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

// export interface Request {
//     host: string,
//     path: string,
//     port: string,
//     method: string,
//     headers: string,
//     body: any,
// }

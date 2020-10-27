import * as mysql from "mysql2/promise";

var connection: any;

async function connect() {
  const MYSQL_CONNECTION = process.env.MYSQL_CONNECTION as string;
  connection = await mysql.createConnection(MYSQL_CONNECTION);
  console.log("Conectado no MYSQL");
  return connection;
}

export async function getConnetion() {
  if(connection) {
    return connection;
  }else {
    await connect();
    return connection;
  }
}
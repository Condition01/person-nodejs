import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import helmet from "helmet";
import { PersonController } from "./controller/person-controller";
import { PersonJDBCService } from "./services/person.jdbc.service";
import { PersonMongoService } from "./services/person.mongo.service";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);
const app: express.Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const personServiceJDBC = new PersonJDBCService();
const personServiceMongo = new PersonMongoService();

const personController = new PersonController(personServiceJDBC);
const personController2 = new PersonController(personServiceMongo);

app.get("/persons", personController.getPersons);
app.get("/persons-mongo", personController2.getPersons);
app.get("/products", personController.getProdutos);
app.post("/person", personController.createPerson);
app.post("/person-mongo", personController2.createPerson);
app.put("/person", personController.updatePerson);
app.get("/get-person-by-id", personController.getPersonById);
app.delete("/person/:id", personController.deletePerson);

app.get("/hello", (req: express.Request, res: express.Response) => {
  return res.send("Hello World");
});

export function hello(): string {
  return "hello";
}

export function addNumbers(number1: number, number2: number): number {
  return number1 + number2;
}

import { Person } from "../models/person.model";
// import * as personDao from "../dao/person-dao";
import { PersonStrategy } from "../services/person.strategy";
import * as requester from "../handlers/requester";
// import { product } from "../dao/mongo/product-schema";
import { Requester } from "../models/requester";

export class PersonController {
  private personService: PersonStrategy<any>;

  constructor(personService: PersonStrategy<any>) {
    this.personService = personService;
  }

  createPerson = async (req: any, res: any) => {
    try {
      const result = await this.personService.createPerson(req.body);
      res.send(result);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  getPersons = async (req: any, res: any) => {
    try {
      const persons = await this.personService.listAll();
      res.send(persons);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  getPersonById = async (req: any, res: any) => {
    try {
      let id = req.query.id;
      const result = await this.personService.findById(id);
      res.send(result);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  updatePerson = async (req: any, res: any) => {
    try {
      let person = req.body.person;
      const result = await this.personService.updatePerson(person);
      res.send(result);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  deletePerson = async (req: any, res: any) => {
    try {
      let id = req.params.id;
      const result = await this.personService.deletePerson(id);
      res.send(result);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  getProdutos = async (req: any, res: any) => {
    try {
      let params = {
        host: "localhost",
        path: "/produtos",
        port: "8085",
        method: "GET",
      } as Requester;
      let products = await requester.REQUEST(params);
      res.send(products);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
}

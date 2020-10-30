import { PersonMongoDaoAdapter } from "../dao/mongo/person.mongo.adapter";
import persons from "../dao/mongo/schemas/person-schema";
import { Persistent } from "../dao/persistent.target";
import { Person } from "../models/person.model";
import { PersonStrategy } from "./person.strategy";

export class PersonMongoService implements PersonStrategy<any> {
  private personDao: Persistent<any> = new PersonMongoDaoAdapter();

  constructor() {}

  async listAll() {
      let persons = await this.personDao.getAllPersons();
      let returnedPerson = persons.map((person: any) => {
          return this.parsePerson(person);
      })
      return returnedPerson;
  }

  async findById(id: string) {
    let mongoPerson = await this.personDao.findById(id);
    return mongoPerson;
  }

  async updatePerson(person: Person) {
    return await this.personDao.updatePerson(person);
  }

  async createPerson(person: Person) {
    return await this.personDao.createPerson(person);
  }

  async deletePerson(id: string) {
    return await this.personDao.deletePerson(id);
  }

  parsePerson(mongoPerson: any): Person {
    return {
      id: mongoPerson._id,
      name: mongoPerson.name,
      age: mongoPerson.age,
      sex: mongoPerson.sex,
    };
  }
}

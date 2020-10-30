import { PersonJdbcDAO } from "../dao/jdbc/person.jdbc.dao";
import { Persistent } from "../dao/persistent.target";
import { Person } from "../models/person.model";
import { Sex } from "../models/sex.enum";
import { PersonStrategy } from "./person.strategy";

export class PersonJDBCService implements PersonStrategy<any>{
  private personDao: Persistent<any> = new PersonJdbcDAO();

  constructor() {}

  async listAll() {
    let bdPersons = await this.personDao.getAllPersons();
    let persons = bdPersons[0];
    console.log(persons);
    persons.map((person: any) => {
      return this.parsePerson(person);
    });
    return persons;
  }

  async findById(id: string) {
    let bdPerson = await this.personDao.findById(id);
    return this.parsePerson(bdPerson[0]);
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

  parsePerson(bdPerson: any): Person {
    return {
      id: bdPerson.id,
      name: bdPerson.name,
      age: bdPerson.age,
      sex: bdPerson.sex,
    };
  }
}
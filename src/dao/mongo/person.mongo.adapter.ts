import { Person } from "../../models/person.model";
import { Persistent } from "../persistent.target";
import { PersonMongoDao } from "./person.mongo.dao";
import persons, { person } from "./schemas/person-schema";

export class PersonMongoDaoAdapter implements Persistent<any> {
  private mongoDao: PersonMongoDao = new PersonMongoDao();

  public async getAllPersons() {
    let persons = await this.mongoDao.getPersons();
    return persons;
  }

  public async findById(id: string) {
    let person = await this.mongoDao.getOnePerson(id);
    return person;
  }

  public async updatePerson(person: Person) {
    let result = await this.mongoDao.updatePerson(person);
    return result;
  }

  public async createPerson(person: Person) {
    let result = await this.mongoDao.insertPerson(person);
    return result;
  }

  public async deletePerson(id: string) {
    let result = await this.mongoDao.deletePerson(id);
    return result;
  }
}

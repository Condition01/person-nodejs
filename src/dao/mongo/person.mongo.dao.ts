import { Person } from "../../models/person.model";
import persons, { person } from "../../dao/mongo/schemas/person-schema";
import { connect } from "../../config/mongo-config"

export class PersonMongoDao {
  constructor() {
      connect();
  }

  async getPersons() {
    return persons.find((err: any, result: Document[]) => {
      if (err) {
        throw Error(err);
      } else {
        return result;
      }
    });
  }

  async getOnePerson(id: string) {
    return persons.findById(id, (err: any, result: any) => {
      if (err) {
        throw Error(err);
      } else {
        return result;
      }
    });
  }

  async insertPerson(person: Person) {
    let personToSave = new persons(person);
    personToSave.save((err: any, result: any) => {
      if (err) {
        throw Error(err);
      } else {
        return result;
      }
    });
  }

  async personExists(id: String) {
    return persons.exists({ _id: id }, (err: any, result: any) => {
      if (err) {
        throw Error(err);
      } else {
        return result;
      }
    });
  }

  async updatePerson(person: Person) {
    let personToUpdate = new persons(persons);
    return persons.exists({ _id: person.id }, (err: any, result: any) => {
      if (err) {
        throw Error(err);
      } else {
        if (result) {
          personToUpdate.save((err: any, result: any) => {
            if (err) {
              throw Error(err);
            } else {
              return result;
            }
          });
        }
      }
    });
  }

  async deletePerson(id: string) {
    return persons.deleteOne({ _id: id }, (err: any) => {
      if (err) {
        throw Error(err);
      } else {
        return true;
      }
    });
  }
}

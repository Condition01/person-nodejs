import { PersonJdbcDAO } from "../dao/jdbc/person.jdbc.dao";
import { Persistent } from "../dao/persistent.target";
import { Person } from "../models/person.model";

export interface PersonStrategy<T> {
  listAll(): Promise<T>;
  findById(id: string): Promise<T>;
  updatePerson(person: Person): Promise<T>;
  createPerson(person: Person): Promise<T>;
  deletePerson(id: string): Promise<T>;
  parsePerson(person: any): T;
}

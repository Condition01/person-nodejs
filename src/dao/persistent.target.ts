import { Person } from "../models/person.model";

export interface Persistent<T> {
  getAllPersons(): Promise<T[]>;
  findById(id: string): Promise<T>;
  createPerson(person: Person): Promise<T>;
  deletePerson(id: string): Promise<T>;
  updatePerson(person: Person): Promise<T>;
}
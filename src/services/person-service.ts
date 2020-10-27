import * as personDao from '../dao/person-dao';
import { Person } from '../models/person.model';
import { Sex } from '../models/sex.enum';

export async function listAll() {
    let bdPersons = await personDao.getAllPersons();
    let persons = bdPersons[0];
    console.log(persons)
    persons.map((person: any) => {
        return parsePerson(person);
    });
    return persons;
}

export async function findById(id: string) {
    let bdPerson = await personDao.findById(id);
    return parsePerson(bdPerson[0]);
}

export async function updatePerson(id: string, person: Person) {
    return await personDao.updatePerson(id, person);
}

export async function createPerson(person: Person) {
    return await personDao.createPerson(person);
}

export async function deletePerson(id: string) {
    return await personDao.deletePerson(id);
}

function parsePerson(bdPerson: any): Person {
    return {id: bdPerson.id, name: bdPerson.name, age: bdPerson.age, sex: bdPerson.sex }
}
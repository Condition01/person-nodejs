import { Person } from "../models/person.model";
// import * as personDao from "../dao/person-dao";
import * as personService from '../services/person-service'

export const createPerson = async (req: any, res: any) => {
  try {
    const result = await personService.createPerson(req.body);
    res.send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const getPersons = async (req: any, res: any) => {
  try {
    const persons = await personService.listAll();
    res.send(persons);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const getPersonById = async (req: any, res: any) => {
  try {
    let id = req.query.id;
    const result = await personService.findById(id);
    res.send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const updatePerson = async (req: any, res: any) => {
  try {
    let id = req.body.id;
    let person = req.body.person;
    const result = await personService.updatePerson(id, person);
    res.send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const deletePerson = async (req: any, res: any) => {
  try {
    let id = req.params.id;
    const result = await personService.deletePerson(id);
    res.send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
import * as db from "../config/db-config";
import { Person } from "../models/person.model";

export async function getAllPersons() {
  let connection = await db.getConnetion();
  let sql = "SELECT * FROM persons;";
  return await connection.query(sql);
}

export async function findById(id: string) {
  let connection = await db.getConnetion();
  const sql = "SELECT * FROM persons where id=?;";
  return await connection.query(sql, [id]);
}

export async function updatePerson(id: string, person: Person) {
  let connection = await db.getConnetion();
  const sql = "update persons set name=?,age=?,sex=? where id=?;";
  const params = [person.name, person.age, person.sex, id];
  return await connection.query(sql, params);
}

export async function createPerson(person: Person) {
  let connection = await db.getConnetion();
  const sql = "insert into persons(id, name, age, sex) values(?,?,?,?);";
  const params = [person.id, person.name, person.age, person.sex];
  return await connection.query(sql, params);
}

export async function deletePerson(id: string) {
  let connection = await db.getConnetion();
  const sql = "delete from persons where id=?";
  return await connection.query(sql, [id]);
}
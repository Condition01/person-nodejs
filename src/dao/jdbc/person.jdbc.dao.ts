import * as db from "../../config/db-config";
import { Person } from "../../models/person.model";
import { Persistent } from "../persistent.target";

export class PersonJdbcDAO implements Persistent<any> {

  constructor(){}

  public async getAllPersons() {
    let connection = await db.getConnetion();
    let sql = "SELECT * FROM persons;";
    return await connection.query(sql);
  }
  
  public async findById(id: string) {
    let connection = await db.getConnetion();
    const sql = "SELECT * FROM persons where id=?;";
    return await connection.query(sql, [id]);
  }
  
  public async updatePerson(person: Person) {
    let connection = await db.getConnetion();
    const sql = "update persons set name=?,age=?,sex=? where id=?;";
    const params = [person.name, person.age, person.sex, person.id];
    return await connection.query(sql, params);
  }
  
  public async createPerson(person: Person) {
    let connection = await db.getConnetion();
    const sql = "insert into persons(id, name, age, sex) values(?,?,?,?);";
    const params = [person.id, person.name, person.age, person.sex];
    return await connection.query(sql, params);
  }
  
  public async deletePerson(id: string) {
    let connection = await db.getConnetion();
    const sql = "delete from persons where id=?";
    return await connection.query(sql, [id]);
  }
}

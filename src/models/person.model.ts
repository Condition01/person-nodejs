import { Sex } from "./sex.enum";

export interface Person {
    id: string,
    name: string,
    age: Date,
    sex: Sex
}
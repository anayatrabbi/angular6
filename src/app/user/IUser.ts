import { ISkill } from "./ISkill";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  skills: ISkill;
}

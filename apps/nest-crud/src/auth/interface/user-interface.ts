import { ObjectId } from 'typeorm';

export interface IUSER {
  _id?: ObjectId;
  firstname: string;
  lastname: string;
  email: string;
}

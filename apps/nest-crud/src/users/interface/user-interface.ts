import { Role } from '../dto/create-user.dto';

export interface IUSER {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  // role: Role;
}

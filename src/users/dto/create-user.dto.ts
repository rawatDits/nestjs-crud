export enum Role {
    USER="user",
    ADMIN = "admin"
}

export class CreateUserDto {
    id:number;
    firstname:string;
    lastname:string;
    email:string;
    passwrod:string;
    role:Role
}

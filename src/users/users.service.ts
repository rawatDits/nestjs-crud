import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUSER } from './interface/user-interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel : mongoose.Model<User>,
      ) {}
   
    async findAll(): Promise<IUSER[]> {
        const users = await this.userModel.find({});
        return users;
      }

    async findOne(id:number):Promise<IUSER>{
        const user = await this.userModel.findOne({id:id});
        return user
    }
    async create(creteData:CreateUserDto): Promise<IUSER>{
        const user = await this.userModel.create(creteData);
        return {
                id:user.id,
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
                role:user.role,
        }
    }

    async update(id:number,updateUser:UpdateUserDto):Promise<IUSER>{
        let update = await this.userModel.findOneAndUpdate({id:id}, updateUser,{new:true})
        return update
    }

    async delete(id:number) :Promise<boolean>{
        let deleteuser = await this.userModel.deleteOne({id:id})
        if(deleteuser.deletedCount > 0){
            return true
        }
         return false;
    }
}

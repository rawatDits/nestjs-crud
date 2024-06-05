import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {  USER_MODEL, User } from './schema/user.schema';
// import { User } from './user.entity';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUSER } from './interface/user-interface';
import { CommonService } from '@app/common';
import { AuthGuard } from '../helper/gaurd/authentication-gaurd';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()

export class UsersService {
  constructor(
    // @InjectRepository(User)
    // private userModel: MongoRepository<User>,

    /*This code is for direct db modal usage without entity*/
    @InjectModel(USER_MODEL)
    private userModel: mongoose.Model<User>,

    // private commonService:CommonService
  ) {}

 
  async findAll(): Promise<any[]> {
    const users = await this.userModel.find({});
    // console.log(await this.commonService.getCommon());
    return users;
  }

  async findOne(id: number): Promise<any | null> {
    try {
      const user = await this.userModel.findOne({ id: id });
      return user;
    }
    catch (error) {
      console.log('error');
      throw new NotFoundException("Book not found")
    }
  }

  async create(creteData: CreateUserDto): Promise<any> {
    const user = await this.userModel.create(creteData);
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
 
    };
  }

  async update(id: number, updateUser: UpdateUserDto): Promise<any> {
    let update = await this.userModel.findOneAndUpdate({ id: id }, updateUser, {
      new: true,
    });
    return update;
  }

  async delete(id: number): Promise<boolean> {
    let deleteuser = await this.userModel.deleteOne({ id: id });
    if (deleteuser.deletedCount > 0) {
      return true;
    }
    return false;
  }
}

import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { IUSER } from './interface/user-interface';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ObjectId } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel : mongoose.Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateAuthToken(data):Promise<string>{
    let {_id} = data
    let authToken = this.jwtService.sign({_id:_id},{expiresIn:'1h'})
    return `Bearer ${authToken}`;

  }
  async signUp(data: SignupDto):Promise<IUSER> {
    let {firstname , lastname, email, password} = data;
    const emailExist = await this.userModel.findOne({email:email});
    if(emailExist){
      throw new BadRequestException("Email already exist")
    }
    try{
      const hashedPassword = await bcrypt.hash(password, 10);
      let userData = {
        ...data,
        password: hashedPassword
      }
      const saveUser = await this.userModel.create(userData);
      return saveUser;
    }catch(err){
      throw new InternalServerErrorException()
    }
  }
  async login(data: LoginDto){
    let {email, password} = data;

    const emailExist = await this.userModel.findOne({email:email});
    if(!emailExist){
      throw new UnauthorizedException("Email not regitsered")
    }

    const isMatch = await bcrypt.compare(password, emailExist?.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid Credentials");
    }

    const generateAuthToken = await this.generateAuthToken(emailExist)
    console.log("generateAuthToken", generateAuthToken)
    let responseObj = {data:emailExist,token:generateAuthToken}
    return responseObj
  }

  async getProfile(id:string){
    const emailExist = await this.userModel.findOne({_id:id});
    if(!emailExist){
      throw new UnauthorizedException("No user found")
    }
    let responseObj = {data:emailExist}
    return responseObj
  }


}

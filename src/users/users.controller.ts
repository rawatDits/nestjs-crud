import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUSER } from './interface/user-interface';


@Controller('users')
export class UsersController {
   constructor(private readonly userService:UsersService){}
    
    @Get() 
    findAll():Promise<IUSER[]>{
        console.log("isnide this ")
       return this.userService.findAll()
    }
    @Get("detail") 
    findOne(@Query('id', ParseIntPipe) id:number):Promise<IUSER>{
        return this.userService.findOne(id)
    }

    @Post()
    create(@Body() userData:CreateUserDto):Promise<IUSER>{
        return this.userService.create(userData)
    }

    @Patch(":id")
    update(@Param('id', ParseIntPipe) id:number , @Body() userUpdate:UpdateUserDto):Promise<IUSER>{
        return  this.userService.update(id, userUpdate)
    }

    @Delete(":id")     //DELETE /users/:id/
    delete(@Param('id', ParseIntPipe) id:number):Promise<boolean>{
        return this.userService.delete(id)
    }

}

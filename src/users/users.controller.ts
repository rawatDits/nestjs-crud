import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUSER } from './interface/user-interface';
import { JoiValidatiaonPipe } from 'src/helper/pipes/joi-validation';
import validataion from './validation/user-custom-validation';
import { PostsService } from 'src/posts/posts.service';
import { AuthGuard } from 'src/helper/gaurd/authentication-gaurd';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly postService: PostsService,
    private configService: ConfigService,
  ) {}

  @Get()
  async findAll(): Promise<IUSER[]> {
    try {
      let users = await this.userService.findAll();
      return users;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'No data found',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
  @UseGuards(AuthGuard)
  @Get('detail')
  async findOne(
    @Req() req,
    @Query('id', ParseIntPipe) id: number,
  ): Promise<IUSER | string> {
    try {
      console.log(this.configService.get('database.connectionString'));
      let user = await this.userService.findOne(req.query.id);
      // let postServiceData =  await this.postService.findAll()
      // console.log("postServiceData", postServiceData)
      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'INTERNAL_SERVER_ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
  @Post()
  @UsePipes(new JoiValidatiaonPipe(validataion.createUser))
  async create(@Body() userData: CreateUserDto): Promise<IUSER> {
    try {
      let user = await this.userService.create(userData);
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Failed to create user',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userUpdate: UpdateUserDto,
  ): Promise<IUSER> {
    return this.userService.update(id, userUpdate);
  }

  @Delete(':id') //DELETE /users/:id/
  delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.userService.delete(id);
  }
}

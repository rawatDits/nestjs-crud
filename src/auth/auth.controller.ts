import {Controller,Post,Body, Query, UseGuards, Req, Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/helper/gaurd/authentication-gaurd';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /*********************************************************
   * SIGNUP 
   *********************************************************/
  @Post('signup')
  async signUp(@Body() signupData: SignupDto) {
    return await this.authService.signUp(signupData);
  }

  /*********************************************************
   * LOGIN 
  *********************************************************/
  @Post('login')
  async login(@Body() loginData:LoginDto){
    return await this.authService.login(loginData);
  }

  /*********************************************************
   * USER DETAIL 
  *********************************************************/
  @Get('profile')
  @UseGuards(AuthGuard)
  @UseGuards()
  async getProfile(@Req() req){
   let {_id} = req.user
   return await this.authService.getProfile(_id);
  }


  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}

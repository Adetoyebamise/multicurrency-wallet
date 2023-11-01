import { Controller, Get, Body, Post, Req, Res} from '@nestjs/common'; 
import { CreateUserDto } from "./dto/create-user.dto";
import { signInUserDto } from "./dto/sign-in.dto";
import { Request, Response, NextFunction} from 'express'
import { UsersService } from './users.service';
import { generateJWT } from "../lib/helper";
import _, { first } from "lodash"; 
import IAppConfig from "./../config/config"; 


@Controller('user')
export class UsersController {
  config: IAppConfig;
  constructor(private readonly UsersService: UsersService) {} 
  
  @Post('create-user')
  async create(@Body() createUserDto: CreateUserDto, @Req() req:Request, @Res() res:Response) { 

    const userData = await this.UsersService.createUser(createUserDto);
    console.log("userData", userData)
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: userData
    })
  }

  @Post('sign-in')
  async signIn(@Body() signInUserDto: signInUserDto, @Req() req:Request, @Res() res:Response) {
    let { phone, password } = req.body;

    const user = await this.UsersService.signIn(phone, password);
    console.log("USERUSER", user.id)
    const token = generateJWT( 'multicurrencyWallet', {id:  user.id });

    console.log("jwt", token)
    return res.status(201).json({
      status: "success",
      message: "User Signed in successfully",
      data: { token,  user}
    })
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    const users = await this.UsersService.findAllUser();

    res.status(200).json({
      status: 'success',
      message: 'Users retrieved successfully',
      data: users,
    });
  }
}

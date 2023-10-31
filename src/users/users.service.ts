import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Password } from 'src/lib/helper';

@Injectable()
export class UsersService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(UserEntity) private readonly UserEntityRepository: Repository<UserEntity>,
  ) {}

  /**
   * this is function is used to create User in User Entity.
   * @param createUserDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    let findObject: {
      status?: string | FindOperator<string> | undefined;
      phone: string;
    } = {  phone: createUserDto.phone};
    
    const existingPhone = await this.UserEntityRepository.findOne({where: findObject});

    if (existingPhone) {
      console.log("error", `Data: {}, Message: Phone Number Exists`); 
    }
    //Confirm User Password
    
    const hashedPassword = await Password.toHash(createUserDto.password);

    const user: UserEntity = new UserEntity();
    user.firstName = createUserDto.firstName;
    user.phone = createUserDto.phone;
    user.dateOfBirth = createUserDto.dateOfBirth;
    user.password = hashedPassword;
    user.type = createUserDto.type;
    user.email = createUserDto.email;

    return this.UserEntityRepository.save(user);
  }

  /**
   * this is function is used to create User in User Entity.
   * @param signInUserDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user with token
   */
   async signIn(phone: string, password: string ): Promise<UserEntity> {

    const user = await this.UserEntityRepository.findOne({where: {phone}});

    if (!user) {
      console.log( "error",  `Data: {}, Message: User is not an amali customer` );
      throw new Error( );
    }

    console.log("info",  `Data: {}, Message: User Exists`);

    //If user exists, validate Password

    const valid = await Password.compare(user.password, password);

    if (!valid) {
      console.log(  "error",  `Data: {}, Message: User is an amali customer, but password is wrong`  );
      throw new Error( );
    }

    console.log("info",  `Data: {}, Message: Password Valid`);

    return user;
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllUser(): Promise<UserEntity[]> {
    return this.UserEntityRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  viewUser(id: number): Promise<UserEntity> {
    return this.UserEntityRepository.findOneBy({ id: "id" });
  }

  /**
   * this function is used to updated specific user whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of user.
   * @param updateUserDto this is partial type of createUserDto.
   * @returns promise of udpate user
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    
  }
   */

  /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns nuber of rows deleted or affected
   */
  removeUser(id: number): Promise<{ affected?: number }> {
    return this.UserEntityRepository.delete(id);
  }
 /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns user details
   */
  async findOne(phone: string): Promise<UserEntity > {
    return this.UserEntityRepository.findOne({where: {phone}});
  }
}
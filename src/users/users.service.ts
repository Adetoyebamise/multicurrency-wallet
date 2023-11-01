import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Password } from 'src/lib/helper';
import { RequestDetailException, UserNotFoundException, WrongPasswordException } from 'src/errors';

@Injectable()
export class UsersService {
  constructor( @InjectRepository(UserEntity)
   private readonly UserEntityRepository: Repository<UserEntity>,
  ) {}

  /**
   * @param createUserDto  @returns promise of user
  */
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      let findObject: {
        status?: string | FindOperator<string> | undefined;
        phone: string;
      } = {  phone: createUserDto.phone};
      
      const existingPhone = await this.UserEntityRepository.findOne({where: findObject});
  
      if (existingPhone) {throw new RequestDetailException()};
      
      const hashedPassword = await Password.toHash(createUserDto.password);
  
      const user: UserEntity = new UserEntity();
      user.firstName = createUserDto.firstName;
      user.phone = createUserDto.phone;
      user.dateOfBirth = createUserDto.dateOfBirth;
      user.password = hashedPassword;
      user.type = createUserDto.type;
      user.email = createUserDto.email;
  
      return this.UserEntityRepository.save(user);
      
    } catch (error) {
      throw new RequestDetailException(); 
    }
  }

  /**
     * @param signInUserDto  @returns promise of user with token
  */
   async signIn(phone: string, password: string ): Promise<UserEntity> {

    const user = await this.UserEntityRepository.findOne({where: {phone}});

    if (!user) { throw new WrongPasswordException() }
    const valid = await Password.compare(user.password, password);

    if (!valid) {throw new WrongPasswordException()}

    return user;
  }

  public async findUserByEmail(email: string) {
    try {
        const singleUser = await this.UserEntityRepository.findOne({
            where: { email },
        });
        if (!singleUser) throw new UserNotFoundException();
        return singleUser;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
  }

  public async findUserById(id: string) {
    try {
        const singleUser = await this.UserEntityRepository.findOne({
            where: { id },
        });
        if (!singleUser) throw new UserNotFoundException();
        return singleUser;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
  }

  /**
   * @param id is the type of number, @returns user details
  */
  public async findOne(phone: string): Promise<UserEntity > {
    return this.UserEntityRepository.findOne({where: {phone}});
  }

  /**
   * @returns promise of array of users
  */
  async findAllUser(): Promise<UserEntity[]> {
    return await this.UserEntityRepository.find();
  }

  /**
   * @param id is type of number,  @returns promise of user
   */
  async viewUser(id: number): Promise<UserEntity> {
    return await this.UserEntityRepository.findOneBy({ id: "id" });
  }

  /**
   * @param id is type of number,  @param updateUserDto this is partial type of createUserDto.@returns promise of udpate user
  */

  /**
   * @param id is the type of number, @returns nuber of rows deleted or affected
  */
  async removeUser(id: number): Promise<{ affected?: number }> {
    return await this.UserEntityRepository.delete(id);
  } 
}
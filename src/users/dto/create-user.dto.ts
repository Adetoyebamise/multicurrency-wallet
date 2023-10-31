import {
  IsAlphanumeric,
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(3, { message: 'Firstname must have atleast 3 characters.' })
  @IsAlphanumeric(null, {
    message: 'Firstname does not allow other than alpha numeric chars.',
  })
  firstName: string;

  @IsString()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @IsString()
  dateOfBirth: string;


  @IsArray()
  pendingTransfer: string;

  @IsString()
  phone: string;

  @IsString()
  @IsEnum(['user', 'admin'])
  type: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;
}
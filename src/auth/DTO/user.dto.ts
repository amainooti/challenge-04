import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

// Will be back to see what to do here
export class UpdateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class userLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

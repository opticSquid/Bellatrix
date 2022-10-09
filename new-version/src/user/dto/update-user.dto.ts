import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, MinLength, IsAlphanumeric, IsJWT } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  uid: number;
  @IsJWT()
  ses_tkn: string;
  name?: string;
  @IsEmail()
  email?: string;
  @MinLength(8, { message: 'Password nust be 8 characters long' })
  @IsAlphanumeric()
  password?: string;
}

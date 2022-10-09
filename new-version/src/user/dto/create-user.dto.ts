import { IsEmail, MinLength, IsAlphanumeric } from 'class-validator';
export class CreateUserDto {
  name: string;
  @IsEmail()
  email: string;
  uid: number;
  role: role;
  @MinLength(8, { message: 'Password nust be 8 characters long' })
  @IsAlphanumeric()
  password: string;
}
enum role {
  admin = 'admin',
  user = 'user',
}

import { IsString, IsNotEmpty, Matches, IsOptional, MinLength } from 'class-validator';

export class DriverDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z].*$/, {
    message: 'name must start with an alphabet character',
  })
  @MinLength(3, {
    message: 'name must be at least 3 characters long',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'phoneNumber must be at least 10 characters long',
  })
  @Matches(/^[0-9+\-() ]+$/, {
    message: 'phoneNumber must contain only digits, spaces, or the characters +, -, (, )',
  })
  phoneNumber: string;

  @IsOptional()
  profilePhoto?: Buffer;
}

import { IsEmail, IsString,  } from "@nestjs/class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
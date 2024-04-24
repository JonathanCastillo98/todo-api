import { IsNotEmpty, IsString } from "class-validator";
import { AuthBody } from "src/interfaces/auth.interface";

export class AuthDTO implements AuthBody{
    @IsNotEmpty()
    user: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
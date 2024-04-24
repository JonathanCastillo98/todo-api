import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { ROLES } from "../constants/roles"

export class UserDTO {
    @IsNotEmpty()
    @IsString()
    firstname: string
    
    @IsNotEmpty()
    @IsString()
    lastname: string
    
    @IsNotEmpty()
    @IsNumber()
    age: number
    
    @IsNotEmpty()
    @IsString()
    email: string
    
    @IsNotEmpty()
    @IsString()
    username: string
    
    @IsNotEmpty()
    @IsString()
    password: string
    
    @IsNotEmpty()
    @IsEnum(ROLES)
    role: string
}

export class UserUpdateDTO {
    @IsOptional()
    @IsString()
    firstname: string
    
    @IsOptional()
    @IsString()
    lastname: string
    
    @IsOptional()
    @IsNumber()
    age: number
    
    @IsOptional()
    @IsString()
    email: string
    
    @IsOptional()
    @IsString()
    username: string
    
    @IsOptional()
    @IsString()
    password: string
    
    @IsOptional()
    @IsEnum(ROLES)
    role: string
}
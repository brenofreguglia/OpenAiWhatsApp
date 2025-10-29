import { IsNumber, IsString } from "class-validator";

export class ProductDTO{
    @IsString()
    id: number;
    
    @IsString()
    nome: string;
    
    @IsNumber()
    valor: number;
    
    @IsString()
    description: string;
}
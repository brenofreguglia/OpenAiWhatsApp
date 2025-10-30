import { IsNumber, IsString } from "class-validator";

export class ProductDTO {
    @IsNumber()
    id: number;

    @IsString()
    nome: string;

    @IsNumber()
    valor: number;

    @IsString()
    description: string;
}
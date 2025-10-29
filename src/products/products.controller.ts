import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductsService } from './products.service';
import { ProductDTO } from './products.dto';

interface Product {
  id: number;
  nome: string;
  valor: number;
  description: string;
}

const produtos: Product[] = [];

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get('/lista')
  ListaProducts(@Req() req: Request, @Res() res: Response) {
    return res.json({ items: produtos });
  }

  @Post('/cadastro')
  CadastroProducts(
    @Req() req: Request,
    @Res() res: Response,
    @Body() Body: ProductDTO,
  ) {
    produtos.push(Body);

    return res.json({ items: produtos });
  }
}

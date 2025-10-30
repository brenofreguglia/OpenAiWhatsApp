import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductsService } from './products.service';
import { ProductDTO } from './products.dto';

// interface Product {
//   id: number;
//   nome: string;
//   valor: number;
//   description: string;
// }

// const produtos: ProductDTO[] = [];

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get('/lista')
  ListaProducts(@Req() req: Request, @Res() res: Response) {
    const produtos = this.products.listaProdutos();
    return res.json({ items: produtos });
  }

  @Post('/cadastro')
  CadastroProducts(
    @Req() req: Request,
    @Res() res: Response,
    @Body() Body: ProductDTO,
  ) {
    this.products.salvarProduto(Body);

    return res.json(Body);
  }
}

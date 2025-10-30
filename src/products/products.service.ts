import { Injectable } from '@nestjs/common';
import { ProductDTO } from './products.dto';

const produtos: ProductDTO[] = [];


@Injectable()
export class ProductsService {

    salvarProduto(produto) {
        produtos.push(produto);
    }

    listaProdutos() {
        return produtos;
    }

}

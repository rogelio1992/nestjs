import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dtos';

@Injectable()
export class ProductService {
  private products: ProductEntity[] = [
    {
      id: 1,
      name: 'gafas de sol',
      description: 'bla bla bla',
      price: 30,
      stock: 10,
      image: 'url para la imagen',
    },
    {
      id: 2,
      name: 'sombrilla',
      description: 'para no coger sol en la calle',
      price: 70,
      stock: 20,
      image: 'url para la imagen de la umbrella',
    },
  ];
  private counterId: number = 3;
  findAll() {
    return this.products;
  }
  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
  create(payload: CreateProductDto) {
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    this.counterId++;
    return newProduct;
  }
  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }
}

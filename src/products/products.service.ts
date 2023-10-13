import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
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

  create(createProductDto: CreateProductDto) {
    const newProduct = {
      id: this.counterId,
      ...createProductDto,
    };
    this.products.push(newProduct);
    this.counterId++;
    return newProduct;
  }

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

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...updateProductDto,
      };
      return this.products[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import {CreateProductDto, UpdateProductDto} from "../../dtos/products.dtos";
//import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';

@Controller('products')
export class ProductsController {
  constructor(private ProductService: ProductService) {}
  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `Listado de Productos`,
      body: this.ProductService.findAll(),
    };
  }
  @Get('/:productID')
  findOne(@Param('productID', ParseIntPipe) productID: number) {
    return {
      message: 'Su producto es',
      body: this.ProductService.findOne(productID),
    };
  }
  @Post()
  create(@Body() payload: CreateProductDto): any {
    return this.ProductService.create(payload);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto): any {
    const product = this.ProductService.update(+id, payload);
    return {
      message: `Se ha actualizado con exito el producto `,
      body: {
        product,
      },
    };
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: number): any {
    return {
      message: `Se ha eliminado con exito el producto ${id}`,
    };
  }
}

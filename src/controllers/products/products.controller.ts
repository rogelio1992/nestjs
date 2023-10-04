import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `products limit=> ${limit} with offset ${offset} y marca ${brand}`;
  }
  @Get('/:productID')
  findOne(@Param('productID') productID: number) {
    console.log(productID);
    return `This action returns a #${productID} product`;
  }
}

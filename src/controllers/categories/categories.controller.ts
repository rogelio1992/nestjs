import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get('/:id/product/:productID')
  getCategories(
    @Param('productID') productID: number,
    @Param('id') id: number,
  ) {
    console.log(productID);
    return `This action returns a #${productID} product from category ${id}`;
  }
}

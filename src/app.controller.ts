import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `products limit=> ${limit} with offset ${offset} y marca ${brand}`;
  }

  @Get('/product/:productID')
  findOne(@Param('productID') productID: number) {
    console.log(productID);
    return `This action returns a #${productID} product`;
  }


}

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ProductsRepository } from './products.repository';
import { ProductDocument, ProductSchema } from './models/product.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: ProductDocument.name,
        schema: ProductSchema,
      },
    ]),
    LoggerModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}

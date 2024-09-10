import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { UserDto } from '@app/common';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}
  async create(createProductDto: CreateProductDto, { _id: userId }: UserDto) {
    return await this.productRepository.create({
      ...createProductDto,
      timestamp: new Date(),
      userId,
    });
  }

  findAll() {
    return this.productRepository.find({});
  }

  findOne(id: string) {
    return this.productRepository.findOne({ _id: id });
  }

  update(_id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.findOneAndUpdate(
      { _id },
      { $set: updateProductDto },
    );
  }

  remove(_id: string) {
    return this.productRepository.findOneAndDelete({ _id });
  }
}

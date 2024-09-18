import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderProductDto } from './order-product.dto';

export class CreateOrderDto {
  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => OrderProductDto)
  products: OrderProductDto[];

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;
}

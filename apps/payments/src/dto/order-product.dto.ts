import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderProductDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

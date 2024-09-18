import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '@app/common/auth/jwt-auth.guard';
import { CurrentUser, UserDto } from '@app/common';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  async createCharge(@Payload() data: PaymentsCreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(
    @Body() data: CreateOrderDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.paymentsService.createOrder(data, user);
  }
}

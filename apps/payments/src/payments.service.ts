import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { NOTIFICATIONS_SERVICES, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-06-20',
    },
  );
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICES)
    private readonly notificationsService: ClientProxy,
  ) {}

  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    //Create payment intend
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      return_url: 'https://www.w3schools.com/',
      //  payment_method: paymentMethod.id,
    });
    this.notificationsService.emit('notify_email', {
      email,
      text: `Your payment of $${amount} completed successfully`,
    });

    return paymentIntent;
  }
  async createOrder(data: CreateOrderDto, { email }: UserDto) {
    const total = data.products.reduce((t, c) => t + c.amount * c.price, 0);
    const card = {
      number: '4242 4242 4242 4242',
      exp_month: 12,
      exp_year: 2024,
      cvc: '123',
    };

    await this.createCharge({
      card,
      amount: total,
      email,
    });
  }
}

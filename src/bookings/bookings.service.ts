import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
const stripe = require('stripe')('sk_test_51PDQZvB9rzZEMop8hTXiLn1TNg8LPgKhR1joGxXVII13jZRBajkQDA1ffVgifuat8TZFhWszCvtjEaj5JLUCK4Hp00rmM4nxe6');
// Hammin sir
// const stripe = require('stripe')('sk_test_51PE2hUSAVJ1E7UDcOm4MH9Pr12PX3thibosyDv5BHBzmw4UOFlWPQLL2Ma6RifNiLpGkTk8A7yyp1iOP1A8uOjlY00Za5TWvzg');

@Injectable()
export class BookingsService {
  async create(createBookingDto: CreateBookingDto) {
    const customer = createBookingDto.cust_id
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer },
      { apiVersion: '2024-04-10' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 109 * 100,
      currency: 'inr',
      // customer: customer,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter
      // is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });


    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      // customer: customer,
    }
  }

}

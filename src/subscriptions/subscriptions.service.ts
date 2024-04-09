import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
const stripe = require('stripe')('sk_test_51P3Xq7AUiPoBfHWw6qyTCHhnac7ps0L0qv2mO4X7CrZfjhPflmb1EImJttUvM6UY9wXW1EHz1dRFwy2EdWAXt0FG00jNoJgO4P');

@Injectable()
export class SubscriptionsService {

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    console.log("createSubscriptionDto=>", createSubscriptionDto);
    const { customerId, priceId } = createSubscriptionDto

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    return {
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    }
  }

  async createCustomer(createCustomer: CreateCustomerDto) {
    console.log("createCustomer=>", createCustomer);
    const { name, email } = createCustomer
    const customer = await stripe.customers.create({
      email: email,
      name: name,
      shipping: {
        address: {
          city: 'Brothers',
          country: 'US',
          line1: '27 Fredrick Ave',
          postal_code: '97712',
          state: 'CA',
        },
        name: name,
      },
      address: {
        city: 'Brothers',
        country: 'US',
        line1: '27 Fredrick Ave',
        postal_code: '97712',
        state: 'CA',
      },
    });
    if (customer) {

      return { customer };
    }
  }

  findAll() {
    return `This action returns all subscriptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}

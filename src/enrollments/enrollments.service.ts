import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
const stripe = require('stripe')(
  'sk_test_51PDLUOSBroEPZKj6i5FRnysxf9pjvy6gCvhg9oyYDIlFaFOxZlmyAOMTqZMCyi8T0C2Jiy9CnBedmJ6qyYLuJ0aA005Hyig2gz',
);

@Injectable()
export class EnrollmentsService {
  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500,
      currency: 'inr',
      description: 'Summer training Program',
      shipping: {
        name: 'Jenny Rosen',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      },
      
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }

  findAll() {
    return `This action returns all enrollments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enrollment`;
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}

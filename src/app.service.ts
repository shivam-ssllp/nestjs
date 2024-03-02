import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailer: MailerService) { }
  async sendMail() {
    return await this.mailer.sendMail({
      from: 'noreply@testingnew.online',
      to: 'mohini.henceforth@gmail.com',
      html: '<h1> hii user </h1>',
      attachments: [
        {
          filename: 'text.txt',
          content: 'hi this is attachment'
        }
      ]
    })
  }

  async braucherMail(body) {
    return await this.mailer.sendMail({
      from: 'noreply@testingnew.online',
      to: body.email,
      html: `<h1> hii ${body.name} </h1><br> <p>Thanks for connecting us</p>`,
      attachments: [
        {
          filename: 'text.txt',
          content: 'hi this is attachment'
        }
      ]
    })
  }
}

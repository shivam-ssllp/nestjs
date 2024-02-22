import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AdvertisementsModule } from './practices/advertisements.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI, {
      dbName: process.env.MONGO_DB_DATABASE_NAME
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANTS_SECRET,
      signOptions: { expiresIn: 60 * 60 * 24 + 's' },
    }),
    AdvertisementsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

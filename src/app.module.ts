import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AdvertisementsModule } from './practices/advertisements.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AdvertisementsModule,
    UsersModule,
    AuthModule,
    CommonModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

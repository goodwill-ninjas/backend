import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { DonationModule } from './donation/donation.module';
import { SocialMediaPostModule } from './social-media-post/social-media-post.module';
import { ImageModule } from './image/image.module';
import { BloodCenterModule } from './blood-center/blood-center.module';

/* TODO: Once the API will be properly documented move away from
 *   *.interface.ts to *.dto.ts on adhoc basis with pipe validation.
 * */

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    UserSettingsModule,
    DonationModule,
    SocialMediaPostModule,
    ImageModule,
    BloodCenterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

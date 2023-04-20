import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DonationModule } from './donation/donation.module';
import { SocialMediaPostModule } from './social-media-post/social-media-post.module';
import { ImageModule } from './image/image.module';
import { BloodCenterModule } from './blood-center/blood-center.module';
import { FeatModule } from './feat/feat.module';
import { HealthModule } from './health/health.module';
import { RequestLogger } from './common/middleware/request-logger.middleware';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './common/utilities/config-validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
      validationSchema: configValidationSchema,
      cache: true,
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
    DonationModule,
    SocialMediaPostModule,
    ImageModule,
    BloodCenterModule,
    FeatModule,
    HealthModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestLogger)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

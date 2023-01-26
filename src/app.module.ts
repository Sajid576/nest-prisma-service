import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealModule } from './meal/meal.module';
import { DishModule } from './dish/dish.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),

    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    DishModule,
    MealModule,
    UserModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

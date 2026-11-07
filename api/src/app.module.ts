import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OrderController } from './infrastructure/controllers/order.controller';
import { OrderService } from './application/services/order.service';
import { OrderRepositoryImpl } from './infrastructure/repositories/order.repository.impl';
import { OrderRepository } from './domain/repositories/order.repository';
import { AwsConfigService } from './infrastructure/config/aws.config';
import { DynamodbConfigService } from './infrastructure/config/dynamodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [OrderController],
  providers: [
    AwsConfigService,
    DynamodbConfigService,
    OrderService,
    {
      provide: OrderRepository,
      useClass: OrderRepositoryImpl,
    },
  ],
  exports: [OrderRepository, AwsConfigService, DynamodbConfigService],
})
export class AppModule {}
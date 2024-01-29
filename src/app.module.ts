import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DynamoModule } from './dynamo/dynamo.module';

@Module({
  imports: [ConfigModule.forRoot(), DynamoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

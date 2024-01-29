import { DynamoService } from './dynamo.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [DynamoService],
  exports: [DynamoService],
})
export class DynamoModule {}

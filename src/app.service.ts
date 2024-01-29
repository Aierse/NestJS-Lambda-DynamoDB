import {
  Get,
  Injectable,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { DynamoService } from './dynamo/dynamo.service';
import { Test } from './entities/app.entity';

@Injectable()
export class AppService {
  readonly TABLE_NAME = 'Test';
  constructor(private dbService: DynamoService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(createDto: Test) {
    try {
      return {
        message: 'Record created successfully!',
        data: await this.dbService
          .connect()
          .put({
            TableName: this.TABLE_NAME,
            Item: createDto,
          })
          .promise(),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findAll() {
    try {
      return {
        message: 'Retrieved successfully!',
        data: await this.dbService
          .connect()
          .scan({
            TableName: this.TABLE_NAME,
          })
          .promise(),
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(@Param('id') id: string) {
    try {
      return {
        message: 'Retrieved successfully!',
        data: await this.dbService
          .connect()
          .get({
            TableName: this.TABLE_NAME,
            Key: { id },
          })
          .promise(),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async update(id: string, dto: Test) {
    try {
      return {
        message: 'Updated!',
        data: await this.dbService
          .connect()
          .update({
            TableName: this.TABLE_NAME,
            Key: { id },
            UpdateExpression: 'set #variable1 = :x',
            ExpressionAttributeNames: {
              '#variable1': 'texts',
            },
            ExpressionAttributeValues: {
              ':x': dto.id,
            },
          })
          .promise(),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async remove(id: string) {
    try {
      return {
        message: 'Deleted!',
        data: await this.dbService
          .connect()
          .delete({
            TableName: this.TABLE_NAME,
            Key: { id },
          })
          .promise(),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}

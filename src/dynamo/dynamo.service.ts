import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class DynamoService {
  connect(): AWS.DynamoDB.DocumentClient {
    return new AWS.DynamoDB.DocumentClient();
  }
}

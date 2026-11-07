import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';
import { AwsConfigService } from './aws.config';

@Injectable()
export class DynamodbConfigService implements OnModuleInit {
  private documentClient: AWS.DynamoDB.DocumentClient;
  private dynamoDB: AWS.DynamoDB;
  private tableName: string;

  constructor(
    private readonly awsConfigService: AwsConfigService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit(): void {
    const documentClientConfig = this.awsConfigService.getDocumentClientConfig();
    this.documentClient = new AWS.DynamoDB.DocumentClient(documentClientConfig);

    const dynamoDBConfig = this.awsConfigService.getDynamoDBConfig();
    this.dynamoDB = new AWS.DynamoDB(dynamoDBConfig);

    this.tableName = this.configService.get<string>('DYNAMODB_TABLE_NAME', 'orders');
  }

  getDocumentClient(): AWS.DynamoDB.DocumentClient {
    return this.documentClient;
  }

  getDynamoDB(): AWS.DynamoDB {
    return this.dynamoDB;
  }

  getTableName(): string {
    return this.tableName;
  }

  async createTableIfNotExists(): Promise<void> {
    try {
      await this.dynamoDB
        .describeTable({ TableName: this.tableName })
        .promise();
    } catch (error: unknown) {
      const awsError = error as AWS.AWSError;
      if (awsError.code === 'ResourceNotFoundException') {
        await this.dynamoDB
          .createTable({
            TableName: this.tableName,
            KeySchema: [
              { AttributeName: 'id', KeyType: 'HASH' },
            ],
            AttributeDefinitions: [
              { AttributeName: 'id', AttributeType: 'S' },
            ],
            BillingMode: 'PAY_PER_REQUEST',
          })
          .promise();
      } else {
        throw error;
      }
    }
  }

  async putItem(params: AWS.DynamoDB.DocumentClient.PutItemInput): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
    return this.documentClient.put(params).promise();
  }

  async getItem(params: AWS.DynamoDB.DocumentClient.GetItemInput): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> {
    return this.documentClient.get(params).promise();
  }

  async updateItem(params: AWS.DynamoDB.DocumentClient.UpdateItemInput): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {
    return this.documentClient.update(params).promise();
  }

  async deleteItem(params: AWS.DynamoDB.DocumentClient.DeleteItemInput): Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput> {
    return this.documentClient.delete(params).promise();
  }
}
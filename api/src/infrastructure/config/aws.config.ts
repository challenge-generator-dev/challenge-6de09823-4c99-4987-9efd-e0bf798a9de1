import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';

@Injectable()
export class AwsConfigService implements OnModuleInit {
  private credentials: AWS.Credentials;
  private region: string;
  private endpoint: string | undefined;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
    this.region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    this.endpoint = this.configService.get<string>('AWS_ENDPOINT');

    if (accessKeyId && secretAccessKey) {
      this.credentials = new AWS.Credentials({
        accessKeyId,
        secretAccessKey,
      });
    }
  }

  getRegion(): string {
    return this.region;
  }

  getCredentials(): AWS.Credentials | undefined {
    return this.credentials;
  }

  getEndpoint(): string | undefined {
    return this.endpoint;
  }

  getDynamoDBConfig(): AWS.DynamoDB.ClientConfiguration {
    const config: AWS.DynamoDB.ClientConfiguration = {
      region: this.region,
    };

    if (this.credentials) {
      config.credentials = this.credentials;
    }

    if (this.endpoint) {
      config.endpoint = this.endpoint;
    }

    return config;
  }

  getDocumentClientConfig(): AWS.DynamoDB.DocumentClient.ClientConfiguration {
    const config: AWS.DynamoDB.DocumentClient.ClientConfiguration = {
      region: this.region,
    };

    if (this.credentials) {
      config.credentials = this.credentials;
    }

    if (this.endpoint) {
      config.endpoint = this.endpoint;
    }

    return config;
  }
}
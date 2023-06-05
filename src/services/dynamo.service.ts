const AWS = require('aws-sdk');
import { Service } from 'typedi';
import { DYNAMODB_ACCESS_KEY, DYNAMODB_REGION, DYNAMODB_SECRET_KEY } from '@config';

const TABLE = 'flow-api';

AWS.config.update({
  region: DYNAMODB_REGION,
  accessKeyId: DYNAMODB_ACCESS_KEY,
  secretAccessKey: DYNAMODB_SECRET_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

@Service()
export class DynamoService {
  public async getDynamo(): Promise<any> {
    console.log('DYNAMODB_ACCESS_KEY', DYNAMODB_ACCESS_KEY, 'DYNAMODB_REGION', DYNAMODB_REGION, 'DYNAMODB_SECRET_KEY', DYNAMODB_SECRET_KEY);
    const params = {
      TableName: TABLE,
    };
    const get = await dynamoClient.scan(params).promise();
    return get;
  }

  public async getDynamoById(id): Promise<any> {
    const params = {
      TableName: TABLE,
      Key: {
        id,
      },
    };
    const get = await dynamoClient.get(params).promise();
    return get;
  }

  public async addOrUpdateDynamo(data): Promise<any> {
    const params = {
      TableName: TABLE,
      Item: data,
    };
    const put = await dynamoClient.put(params).promise();
    return put;
  }

  public async deleteDynamoById(id): Promise<any> {
    const params = {
      TableName: TABLE,
      Key: {
        id,
      },
    };
    const del = await dynamoClient.delete(params).promise();
    return del;
  }
}

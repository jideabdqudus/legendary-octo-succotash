const AWS = require('aws-sdk');
import { Service } from 'typedi';
import { NEPTUNE_HOST, NEPTUNE_ACCESS_KEY, NEPTUNE_PORT, NEPTUNE_REGION, NEPTUNE_SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';

const executeNeptuneRequests = async (method: string, resource: string, body) => {
  const credentials = new AWS.Credentials(`${NEPTUNE_ACCESS_KEY}`, `${NEPTUNE_SECRET_KEY}`);
  const endpoint: any = new AWS.Endpoint(`https://${NEPTUNE_HOST}${resource}`);
  endpoint.port = `${NEPTUNE_PORT}`;

  const httpRequest = new AWS.HttpRequest(endpoint, `${NEPTUNE_REGION}`);
  httpRequest.method = method;
  httpRequest.headers.host = NEPTUNE_HOST;
  httpRequest.headers['Content-Type'] = 'application/json';
  if (body) {
    httpRequest.body = JSON.stringify(body);
  }
  const signer = new AWS.Signers.V4(httpRequest, 'neptune-db');
  signer.addAuthorization(credentials, new Date());

  const response: string = await new Promise((resolve: any, reject) => {
    const client = new AWS.HttpClient();
    client.handleRequest(
      httpRequest,
      null,
      response => {
        let body = '';
        const { statusCode, statusMessage, headers } = response;
        response.on('data', chunk => {
          body += chunk;
        });
        response.on('end', () => {
          const data = {
            statusCode,
            statusMessage,
            headers,
          };
          if (body) {
            data['body'] = JSON.parse(body);
          }
          resolve(data);
        });
      },
      error => {
        reject(error);
      },
    );
  });
  return response;
};

@Service()
export class NeptuneService {
  public async getNeptune(endpoint): Promise<any> {
    const response: any = await executeNeptuneRequests('GET', endpoint, null);
    const { headers, statusCode, statusMessage, body: responseBody } = response;
    if (statusCode !== 200) {
      const error = {
        statusCode: statusCode,
        statusMessage: statusMessage,
      };
      if (headers['x-amzn-errortype']) error['errorType'] = headers['x-amzn-errortype'];
      if (responseBody['detailedMessage']) error['detailedMessage'] = responseBody['detailedMessage'];
      throw new HttpException(statusCode, statusMessage, error);
    }
    return responseBody;
  }

  public async postNeptune(endpoint, body): Promise<any> {
    const response: any = await executeNeptuneRequests('POST', endpoint, body);
    const { headers, statusCode, statusMessage, body: responseBody } = response;
    if (statusCode !== 200) {
      const error = {
        statusCode: statusCode,
        statusMessage: statusMessage,
      };
      if (headers['x-amzn-errortype']) error['errorType'] = headers['x-amzn-errortype'];
      if (responseBody['detailedMessage']) error['detailedMessage'] = responseBody['detailedMessage'];
      throw new HttpException(statusCode, statusMessage, error);
    }
    return responseBody;
  }
}

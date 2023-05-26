const AWS = require('aws-sdk');
import { Service } from 'typedi';
import { NEPTUNE_HOST, NEPTUNE_ACCESS_KEY, NEPTUNE_PORT, NEPTUNE_REGION, NEPTUNE_SECRET_KEY } from '@config';
// import { HttpException } from '@exceptions/httpException';

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

  const response: string = await new Promise((resolve, reject) => {
    const client = new AWS.HttpClient();
    client.handleRequest(
      httpRequest,
      null,
      response => {
        // const { statusCode, status } = response;
        // if (statusCode < 200 || statusCode > 299) {
        //   new HttpException(statusCode, 'Failed to load');
        // }
        let responseBody = '';
        response.on('data', chunk => {
          responseBody += chunk;
        });
        response.on('end', () => {
          resolve(responseBody);
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
    const response = await executeNeptuneRequests('GET', endpoint, null);
    return JSON.parse(response);
  }

  public async postNeptune(endpoint, body): Promise<any> {
    const response = await executeNeptuneRequests('POST', endpoint, body);
    return JSON.parse(response);
  }

  public async putNeptune(endpoint, body): Promise<any> {
    const endpoints = '/gremlin?gremlin=' + `g.V('b2c346e5-3ca8-d7fa-1af8-434523a918fc').drop()`;
    const response = await executeNeptuneRequests('GET', endpoints, null);
    // const response = await executeNeptuneRequests('PUT', endpoint, body);
    return JSON.parse(response);
  }

  public async deleteNeptune(endpoint): Promise<any> {
    const response = await executeNeptuneRequests('DELETE', endpoint, null);
    return JSON.parse(response);
  }
}

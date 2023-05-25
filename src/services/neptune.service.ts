import * as AWS from 'aws-sdk';
import { Service } from 'typedi';
import { NEPTUNE_HOST, NEPTUNE_ACCESS_KEY, NEPTUNE_PORT, NEPTUNE_REGION, NEPTUNE_SECRET_KEY } from '@config';

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

  return httpRequest;
};

@Service()
export class NeptuneService {
  public async getNeptune(endpoint): Promise<any> {
    const request = await executeNeptuneRequests('GET', endpoint, null);
    const response = await new Promise((resolve, reject) => {
      const client = new AWS.HttpClient();
      client.handleRequest(
        request,
        null,
        response => {
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
    return JSON.parse(response);
  }

  public async postNeptune(endpoint, body): Promise<any> {
    const request = await executeNeptuneRequests('POST', endpoint, body);
    const response = await new Promise((resolve, reject) => {
      const client = new AWS.HttpClient();
      client.handleRequest(
        request,
        null,
        response => {
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
    return JSON.parse(response);
  }

  public async putNeptune(endpoint, body): Promise<any> {
    const request = await executeNeptuneRequests('PUT', endpoint, body);
    const response = await new Promise((resolve, reject) => {
      const client = new AWS.HttpClient();
      client.handleRequest(
        request,
        null,
        response => {
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
    return JSON.parse(response);
  }

  public async deleteNeptune(endpoint): Promise<any> {
    const request = await executeNeptuneRequests('DELETE', endpoint, null);
    const response = await new Promise((resolve, reject) => {
      const client = new AWS.HttpClient();
      client.handleRequest(
        request,
        null,
        response => {
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
    return JSON.parse(response);
  }
}

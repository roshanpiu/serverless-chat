import type { Serverless } from 'serverless/aws';
import dynamodb_table from "./resources/dynamodb-tables";

const serverlessConfiguration: Serverless = {
  service: {
    name: 'serverless-chat'
  },
  frameworkVersion: '2',
  resources: {
    Resources: {
      ...dynamodb_table
    }
  },
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8000,
        inMemory: true,
        heapInitial: '200m',
        heapMax: '1g',
        migrate: true,
        seed: true,
        convertEmptyValues: true  
      }
    }
  },
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    hello: {
      handler: 'handler.hello',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;

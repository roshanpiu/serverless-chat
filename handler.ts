import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { DynamoDB } from "aws-sdk";

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  const listOfTables = await getListOfTables();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hellooo',
      tables: listOfTables,
    }, null, 2),
  };
}

function getListOfTables() {
  const db: DynamoDB = new DynamoDB({endpoint: 'http://localhost:8000'})
  return new Promise((res, rej)=> {
    db.listTables((err, resp) => {
      if(err) {
        return rej(err)
      }
      return res(resp)
    })
  })
  
}
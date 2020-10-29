import type { CloudFormationResources } from "serverless/aws";

const tables: CloudFormationResources = {
    MessagesTable: {
      Type: "AWS::DynamoDB::Table",
      Properties: {
        KeySchema: [{ AttributeName: "createdAt", KeyType: "HASH" }],
        AttributeDefinitions: [
          { AttributeName: "createdAt", AttributeType: "S" },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
        TableName: 'Messages'
      },
    }
};

export default tables
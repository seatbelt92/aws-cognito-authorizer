import "reflect-metadata";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        body: JSON.stringify({ name: "get-public-info", testUserPoolId: "Auth - NONE" }),
    };
}

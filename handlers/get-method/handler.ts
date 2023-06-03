import "reflect-metadata";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import jwtDecode from "jwt-decode";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const { Authorization } = event.headers;
    const token: { sub: string } = jwtDecode((Authorization || "").replace("Bearer ", ""))

    return {
        statusCode: 200,
        body: JSON.stringify({ name: "get-method", testUserPoolId: token.sub }),
    };
}

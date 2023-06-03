import "reflect-metadata";
import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent } from "aws-lambda";
import jwtDecode from "jwt-decode";

export const handler = async (
    event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
    const token = event.authorizationToken.replace("Bearer ", "");

    const decodedToken: { "custom:approved": string } = jwtDecode(token || "");
    const effect = decodedToken["custom:approved"] == "true" ? "Allow" : "Deny";

    return {
        principalId: "test-user",
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: event.methodArn,
                },
            ],
        },
    };
};

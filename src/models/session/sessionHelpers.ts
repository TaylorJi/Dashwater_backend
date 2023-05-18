import {
    SecretsManagerClient,
    GetSecretValueCommand,
  } from "@aws-sdk/client-secrets-manager";
  import queryInfo from "../../helpers/timestreamAPI/constants/queryInfo";
  import { Credentials } from "aws-sdk";

export const getTokenKey = async () => {
    const credentials = new Credentials({
      accessKeyId: `${process.env.AWS_API_ACCESS_KEY}`,
      secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
    });
  
    const client = new SecretsManagerClient({
      region: queryInfo.REGION,
      credentials: credentials,
    });
  
    try {
      const response = await client.send(
        new GetSecretValueCommand({
          SecretId: queryInfo.SECRET_NAME,
          VersionStage: queryInfo.VERSION_STAGE,
        })
      );
  
      if (response.SecretString) {
          const parsedResponse = JSON.parse(response.SecretString);
          return parsedResponse.key;
      }
      return null;
    } catch (_err) {
      return null;
    }
  };
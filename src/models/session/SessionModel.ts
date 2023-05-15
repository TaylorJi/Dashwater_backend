import Session from "../../config/schemas/Session";
import User from "../../config/schemas/User";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import queryInfo from "../../helpers/timestreamAPI/constants/queryInfo";
import { Credentials } from "aws-sdk";

const createSession = async (sessionId: String, userId: String) => {
  try {
    await Session.deleteMany({ userId: userId });
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 2);

    const newSession = await Session.create({
      userId: userId,
      sessionExpiry: expirationTime.toISOString(),
      sessionId: sessionId,
    });

    if (newSession) {
      return newSession;
    }
    return null;
  } catch (_err) {
    return null;
  }
};

const deleteSession = async (sessionId: string) => {
  try {
    const oldSession = await Session.find({ sessionId: sessionId });
    if (oldSession) {
      try {
        const deletedSession = await Session.deleteOne({
          sessionId: sessionId,
        });

        if (deletedSession.deletedCount) {
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    }

    return true;
  } catch (err) {
    return false;
  }
};


const validateSession = async (sessionId: string, isAdminRoute: boolean = false) => {
    const currentTime = new Date();

    try {
        const session = await Session.findOne({"sessionId": sessionId});

        if (session) {
            if(new Date(session.sessionExpiry) < currentTime) {
                return false;
            }

            const fetchedUser = await User.findOne({"_id": session.userId});

            if (isAdminRoute && fetchedUser && fetchedUser.role !== "Admin") {
                return false;
            }
            
            if (fetchedUser) {
                const user: userDataType = {
                    email: fetchedUser['email'], 
                    userId: fetchedUser['_id'], 
                    role: fetchedUser['role']
                };

                return user;
            }
            
            return null;
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
  } catch (err) {
    return null;
  }
};

const updateSessionExpiry = async (sessionID: string) => {
  try {
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 2);
    const updatedSession = await Session.findOneAndUpdate(
      { sessionId: sessionID },
      { sessionExpiry: expirationTime.toISOString() }
    );

    if (updatedSession) {
      return updatedSession;
    }
    return null;
  } catch (_err) {
    return null;
  }
};

const getAWSToken = async () => {
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

export default module.exports = {
  createSession,
  deleteSession,
  validateSession,
  updateSessionExpiry,
  getAWSToken,
};

import { resolve } from "path";
import { config } from "dotenv";
import * as basicAuthModule from "express-basic-auth";

export const authMiddleware = (() => {
  const envPath = resolve(process.cwd(), ".env");
  const parsed = config({ path: envPath }).parsed;
  
  if (!parsed) {
    throw new Error(".env file not found or is empty");
  }
  
  const AUTH_USR = parsed.AUTH_USR;
  const AUTH_PWD = parsed.AUTH_PWD;
  
  if (!AUTH_USR || !AUTH_PWD) {
    throw new Error("AUTH_USR and AUTH_PWD must be defined in .env file");
  }
  
  const basicAuth = (basicAuthModule as any).default || basicAuthModule;
  
  return basicAuth({
    users: { [AUTH_USR]: AUTH_PWD },
    challenge: true,
    unauthorizedResponse: JSON.stringify({
      success: false,
      message: "401 Unauthorized",
    }),
  });
})();

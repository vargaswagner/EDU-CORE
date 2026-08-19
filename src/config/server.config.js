import { env } from "./env.config.js";

export const serverConfig = {
  host: env.APP_HOST,

  port: env.APP_PORT,

  bodyLimit: env.BODY_LIMIT,

  //   trustProxy: env.TRUST_PROXY,
};

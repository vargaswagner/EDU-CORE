export const securityConfig = {
  helmet: {
    contentSecurityPolicy: false,
  },

  json: {
    limit: "2mb",
  },

  urlencoded: {
    extended: true,
    limit: "2mb",
  },
};

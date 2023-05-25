import dotenv from 'dotenv';

dotenv.config({ debug: true })

export const config = {
  port: process.env.PORT || process.env.NX_API_PORT || 4000,

  webAppURL: process.env.NX_WEB_APP_URL,
  webAppPath: process.env.NX_WEB_APP_LOCATION,

  isDev: process.env.NODE_ENV === 'development',

  mongoDB: {
    connectionUri: process.env.MONGODB_CONNECTION_URI as string,
  },

  openSearch: {
    node: process.env.OPENSEARCH_NODE,
    region: process.env.OPENSEARCH_REGION,
    service: process.env.OPENSEARCH_SERVICE,
    host: process.env.OPENSEARCH_HOST,
    protocol: process.env.OPENSEARCH_PROTOCOL,
    port: process.env.OPENSEARCH_PORT,
    auth: process.env.OPENSEARCH_AUTH,
    ca_certs_path: process.env.OPENSEARCH_CA_CERTS_PATH,
  }
};

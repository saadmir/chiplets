import { createYoga } from 'graphql-yoga'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { useResponseCache } from '@graphql-yoga/plugin-response-cache'

import { config } from '~api/config'
import { typeDefs } from '~api/services/gql/typeDefs';
import { resolvers } from '~api/services/gql/resolvers';


const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: typeDefs,
});

const options = {
  // graphqlEndpoint: '',
  graphiql: config.isDev,
  schema,
  plugins: [
    useResponseCache({
      session: () => null
    })
  ]
};

const gqlServer = createYoga(options);

export default gqlServer;

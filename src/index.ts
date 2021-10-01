import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolvers';
const port = process.env.PORT || 3000;

(async () => {
  const app = express();
  app.get('/', (_, res) => {
    res.send('hello');
  });
  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.listen(port, () => console.log(`server listening on ${port}`));
})();

// import { Logger, Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import handleSubscriptionContext from './handleSubscriptionContext';

// import { join } from 'path';
// import { AccountLastConnectionPlugin } from './accountLastConnection.plugin';

// @Module({
//   imports: [
//     GraphQLModule.forRoot<ApolloDriverConfig>({
//       driver: ApolloDriver,
//       // fieldResolverEnhancers: ['guards'],
//       autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
//       sortSchema: true,
//       playground: true,
//       // debug: process.env.NODE_ENV !== 'production',
//       // subscriptions: {},
//       // formatError: (error) => {
//       //   if (process.env.NODE_ENV === 'production') {
//       //     return error;
//       //   }

//     //     const logger = new Logger('GraphQL');

//     //     const message = error.originalError
//     //       ? error.originalError.message
//     //       : error.message;
//     //     let trace = error.originalError
//     //       ? error.originalError.stack
//     //       : error.stack;

//     //     if (error.path) {
//     //       trace = `${trace}\n\nPath: ${error.path.join('.')}`;
//     //     }

//     //     logger.error(message, trace);

//     //     return error;
//     //   },
//     //   installSubscriptionHandlers: true,
//     //   context: handleSubscriptionContext,
//     // }),
//   ],
//   providers: [AccountLastConnectionPlugin],
// })
// export class GraphqlModule {}

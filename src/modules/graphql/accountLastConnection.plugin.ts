// import { EntityManager } from '@mikro-orm/core';
// import { Plugin } from '@nestjs/apollo';
// import {
//   ApolloServerPlugin,
//   GraphQLRequestListener,
// } from 'apollo-server-plugin-base';
// // import { Account } from '../../entities/account.entity';

// @Plugin()
// export class AccountLastConnectionPlugin implements ApolloServerPlugin {
//   constructor(private readonly em: EntityManager) {}

//   async requestDidStart(): Promise<GraphQLRequestListener> {
//     const persistAccountConnection = async (account: Account) => {
//       account.lastConnection = new Date();
//       await this.em.persistAndFlush(account);
//     };

//     return {
//       async willSendResponse(reqCtx) {
//         const account: Account = reqCtx.context.req.user;

//         if (!account) return;

//         await persistAccountConnection(account);
//       },
//     };
//   }
// }

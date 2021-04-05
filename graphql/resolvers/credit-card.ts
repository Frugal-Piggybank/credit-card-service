import { IResolvers } from 'apollo-server-azure-functions';
import { CreditCardDocument } from '../models/CreditCard';
// import ApolloContext from '../../interfaces/apollo-context';
import {
  getAsync,
  //   getByIdAsync,
  upsertAsync,
  //   deleteAsync,
} from '../repositories/credit-card';

export const resolvers: IResolvers = {
  Query: {
    creditCards: async (
      root: void,
      args: void
    ): Promise<CreditCardDocument[]> => {
      const creditCards = await getAsync();

      return creditCards;
    },
    // creditCard: async (
    //   root: void,
    //   args: { id: string },
    //   ctx: ApolloContext
    // ): Promise<CreditCardDocument> => {
    //   const creditCard = await getByIdAsync(args.id);
    //   return creditCard;
    // },
  },
  Mutation: {
    upsertCreditCard: async (
      root: void,
      args: { creditCard: CreditCardDocument }
    ): Promise<string> => upsertAsync(args.creditCard),
    // deleteCreditCard: async (
    //   root: void,
    //   args: { id: string },
    //   ctx: ApolloContext
    // ): Promise<boolean> => {
    //   const result = await deleteAsync(args.id);
    //   return result === 204;
    // },
  },
};

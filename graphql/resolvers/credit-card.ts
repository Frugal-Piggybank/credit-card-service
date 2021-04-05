import { IResolvers } from 'apollo-server-azure-functions';
import { CreditCardDocument } from '../models/CreditCard';
import {
  getAsync,
  getByIdAsync,
  upsertAsync,
  deleteAsync,
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
    creditCard: async (
      root: void,
      args: { id: string }
    ): Promise<CreditCardDocument> => {
      const creditCard = await getByIdAsync(args.id);

      return creditCard;
    },
  },
  Mutation: {
    upsertCreditCard: async (
      root: void,
      args: { creditCard: CreditCardDocument }
    ): Promise<string> => upsertAsync(args.creditCard),
    deleteCreditCard: async (
      root: void,
      args: { id: string }
    ): Promise<void> => {
      await deleteAsync(args.id);
    },
  },
};

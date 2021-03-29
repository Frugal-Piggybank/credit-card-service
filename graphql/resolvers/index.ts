import { Kind } from 'graphql/language';
import { GraphQLScalarType } from 'graphql';
import { resolvers as creditCardResolvers } from './credit-card';
// import ApolloContext from '../interfaces/apollo-context';
// import { deleteAllAsync as deleteUserCategories } from "../../repositories/category-repository";
// import { deleteAllAsync as deleteUserLineItems } from "../../repositories/line-item-repository";

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return new Date(value); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
  Mutation: {
    // deleteUser: async (
    //   root: void,
    //   args: { id: string },
    //   ctx: ApolloContext
    // ): Promise<boolean> => {
    //   const userId = checkAuthentication(ctx);
    //   try {
    //     // await deleteUserCategories(userId);
    //     // await deleteUserLineItems(userId);
    //   } catch (err) {
    //     console.error(err);
    //   }
    //   return true;
    // },
  },
};

export default [resolvers, creditCardResolvers];

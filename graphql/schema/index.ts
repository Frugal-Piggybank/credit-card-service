import { gql } from 'apollo-server-azure-functions';
import { typeDef as CreditCard } from './credit-card';

const typeDef = gql`
  scalar Date

  type Query {
    _empty: String
  }

  type Mutation {
    deleteUser: Boolean
  }
`;

export default [typeDef, CreditCard];

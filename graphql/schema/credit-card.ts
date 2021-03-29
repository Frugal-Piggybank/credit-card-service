import { gql } from 'apollo-server-azure-functions';

export const typeDef = gql`
  type CreditCard {
    _id: ID!
    name: String!
  }
  input UpsertCreditCardInput {
    _id: ID
    name: String!
  }
  extend type Mutation {
    upsertCreditCard(creditCard: UpsertCreditCardInput!): String!
    deleteCreditCard(id: ID!): Boolean
  }
  extend type Query {
    creditCards: [CreditCard!]!
    creditCard(id: ID!): CreditCard!
  }
`;

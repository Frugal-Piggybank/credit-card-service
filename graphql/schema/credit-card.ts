import { gql } from 'apollo-server-azure-functions';

export const typeDef = gql`
  type CreditCard {
    id: ID!
    name: String!
  }
  input UpsertCreditCardInput {
    id: ID
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

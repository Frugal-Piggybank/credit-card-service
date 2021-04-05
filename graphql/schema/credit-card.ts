import { gql } from 'apollo-server-azure-functions';

export const typeDef = gql`
  type CreditCard {
    id: ID!
    name: String!
    issuer: String
    primaryColor: String
    secondaryColor: String
    annualFee: Int
    minimumSpend: Int
    signUpBonus: Int
    startDate: Date
    # categories: Int[]
    hasForeignTransactionFee: Boolean
  }
  input UpsertCreditCardInput {
    id: ID
    name: String!
    issuer: String
    primaryColor: String
    secondaryColor: String
    annualFee: Int
    minimumSpend: Int
    signUpBonus: Int
    startDate: Date
    # categories: Int[]
    hasForeignTransactionFee: Boolean
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

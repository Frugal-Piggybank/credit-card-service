import { gql } from "apollo-server-azure-functions";

export const typeDef = gql`
  type Category {
    id: ID!
    name: String!
    percent: Int!
  }
  input UpsertCategoryInput {
    id: ID
    name: String!
    percent: Int!
  }
  extend type Mutation {
    upsertCategory(category: UpsertCategoryInput!): String!
    deleteCategory(id: ID!): Boolean
  }
  extend type Query {
    categories: [Category!]!
    category(id: ID!): Category!
  }
`;

import { IResolvers } from "apollo-server-azure-functions";
import { CategoryDocument } from "../models/Category";
import {
  getAsync,
  getByIdAsync,
  upsertAsync,
  deleteAsync,
} from "../repositories/category";

export const resolvers: IResolvers = {
  Query: {
    categories: async (root: void, args: void): Promise<CategoryDocument[]> => {
      const categories = await getAsync();

      return categories;
    },
    category: async (
      root: void,
      args: { id: string }
    ): Promise<CategoryDocument> => {
      const category = await getByIdAsync(args.id);

      return category;
    },
  },
  Mutation: {
    upsertCategory: async (
      root: void,
      args: { category: CategoryDocument }
    ): Promise<string> => upsertAsync(args.category),
    deleteCategory: async (root: void, args: { id: string }): Promise<void> => {
      await deleteAsync(args.id);
    },
  },
};

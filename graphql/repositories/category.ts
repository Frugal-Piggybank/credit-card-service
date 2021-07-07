import { firestore as Firestore } from "firebase-admin";
import { QuerySnapshot } from "@google-cloud/firestore";
import { firestore } from "../index";
import { CategoryDocument, firestoreConverter } from "../models/Category";

const DB_COLLECTION = "card-categories";

const getCardCategoriesCollection = () =>
  firestore.collection(DB_COLLECTION).withConverter(firestoreConverter);

const mapSnapshot = (snapshot: QuerySnapshot<CategoryDocument>) => {
  return snapshot.docs.map((doc) => doc.data());
};

export const getAsync = async (): Promise<CategoryDocument[]> => {
  try {
    const snapshot = await getCardCategoriesCollection().get();

    const categories = mapSnapshot(snapshot);

    return categories;
  } catch (error) {
    console.error(error);
  }
};

export const getBulkAsync = async (
  ids: string[]
): Promise<CategoryDocument[]> => {
  try {
    const snapshot = await getCardCategoriesCollection()
      .where(Firestore.FieldPath.documentId(), "in", ids)
      .get();

    const categories = mapSnapshot(snapshot);

    return categories;
  } catch (error) {
    console.error(error);
  }
};

export const getByIdAsync = async (id: string): Promise<CategoryDocument> => {
  try {
    const snapshot = await getCardCategoriesCollection().doc(id).get();

    const category = snapshot.data();

    return category;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAsync = async (id: string): Promise<void> => {
  try {
    const snapshot = getCardCategoriesCollection().doc(id);

    await snapshot.delete();
  } catch (error) {
    console.error(error);
  }
};

const updateCategoryAsync = async (
  category: CategoryDocument
): Promise<string> => {
  try {
    const snapshot = getCardCategoriesCollection().doc(category.id);

    await snapshot.update(category);

    return "Succesfully updated";
  } catch (error) {
    console.error(error);
  }
};

const createCategoryAsync = async (
  category: CategoryDocument
): Promise<string> => {
  try {
    const newCategory = await firestore
      .collection(DB_COLLECTION)
      .withConverter(firestoreConverter)
      .add(category);

    return newCategory.id;
  } catch (error) {
    console.error(error);
  }
};

export const upsertAsync = async (
  category: CategoryDocument
): Promise<string> =>
  category.id ? updateCategoryAsync(category) : createCategoryAsync(category);

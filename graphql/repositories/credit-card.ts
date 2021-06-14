import { QuerySnapshot } from "@google-cloud/firestore";
import { firestore } from "../index";
import { CreditCardDocument, firestoreConverter } from "../models/CreditCard";

const DB_COLLECTION = "cards";

const getCardsCollection = () =>
  firestore.collection(DB_COLLECTION).withConverter(firestoreConverter);

const mapSnapshot = (snapshot: QuerySnapshot<CreditCardDocument>) => {
  return snapshot.docs.map((doc) => doc.data());
};

export const getAsync = async (): Promise<CreditCardDocument[]> => {
  try {
    const snapshot = await getCardsCollection().get();

    const cards = mapSnapshot(snapshot);

    return cards;
  } catch (error) {
    console.error(error);
  }
};

export const getByIdAsync = async (id: string): Promise<CreditCardDocument> => {
  try {
    const snapshot = await getCardsCollection().doc(id).get();

    const card = snapshot.data();

    return card;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAsync = async (id: string): Promise<void> => {
  try {
    const snapshot = getCardsCollection().doc(id);

    await snapshot.delete();
  } catch (error) {
    console.error(error);
  }
};

const updateCreditCardAsync = async (
  creditCard: CreditCardDocument
): Promise<string> => {
  try {
    const snapshot = getCardsCollection().doc(creditCard.id);

    await snapshot.update(creditCard);

    return "Succesfully updated";
  } catch (error) {
    console.error(error);
  }
};

const createCreditCardAsync = async (
  creditCard: CreditCardDocument
): Promise<string> => {
  try {
    const newCreditCard = await firestore
      .collection(DB_COLLECTION)
      .withConverter(firestoreConverter)
      .add(creditCard);

    return newCreditCard.id;
  } catch (error) {
    console.error(error);
  }
};

export const upsertAsync = async (
  creditCard: CreditCardDocument
): Promise<string> =>
  creditCard.id
    ? updateCreditCardAsync(creditCard)
    : createCreditCardAsync(creditCard);

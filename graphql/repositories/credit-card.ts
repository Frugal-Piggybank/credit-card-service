import { QuerySnapshot } from '@google-cloud/firestore';
import { firestore } from '../index';
import { CreditCardDocument, firestoreConverter } from '../models/CreditCard';

const DB_COLLECTION = 'cards';

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
  } catch (err) {
    console.error(err);
  }
};

export const getByIdAsync = async (id: string): Promise<CreditCardDocument> => {
  try {
    const snapshot = await getCardsCollection().doc(id).get();

    const card = snapshot.data();

    return card;
  } catch (err) {
    console.error(err);
  }
};

// export const deleteAllAsync = async (userId: string): Promise<number> => {
//   try {
//     // const result = await CreditCard.deleteMany({ userId }).exec();

//     return 204;
//   } catch (err) {
//     console.error(`Could not delete line items for user ${userId}. `, err);
//   }
// };

const updateCreditCardAsync = async (
  creditCard: CreditCardDocument
): Promise<string> => 'Implement Update Method';

const createCreditCardAsync = async (
  creditCard: CreditCardDocument
): Promise<string> => {
  const newCreditCard = await firestore
    .collection(DB_COLLECTION)
    .withConverter(firestoreConverter)
    .add(creditCard);

  return newCreditCard.id;
};

export const upsertAsync = async (
  creditCard: CreditCardDocument
): Promise<string> =>
  creditCard.id
    ? updateCreditCardAsync(creditCard)
    : createCreditCardAsync(creditCard);

// export const deleteAsync = async (id: string): Promise<number> => {
//   try {
//     // await CreditCard.findOneAndDelete({ id, userId }).exec();

//     return 204;
//   } catch (err) {
//     console.error(`Could not delete line item ${id}. `, err);
//   }
// };

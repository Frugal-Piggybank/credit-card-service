import { firestore } from '../index';
import { CreditCardDocument, firestoreConverter } from '../models/CreditCard';

const DB_COLLECTION = 'cards';

// export const getAsync = async (): Promise<CreditCardDocument[]> => {
//   try {
//     const creditCards = firestore

//     return creditCards;
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const getByIdAsync = async (id: string): Promise<CreditCardDocument> => {
//   return await
// };

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

  console.log(`new card created with id ${newCreditCard.id}`);

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

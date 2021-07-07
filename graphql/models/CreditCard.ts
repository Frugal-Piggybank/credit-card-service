import { getByIdAsync } from "./../repositories/category";
// import { getBulkAsync } from "./../repositories/category";
import {
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
} from "@google-cloud/firestore";
import { CategoryDocument } from "./Category";

const getCategories = (document: DocumentData) => {
  let categories = [];

  if (document.categories) {
    console.error(`Found ${document.categories.length} categories`);

    const categories = document.categories.map(async (cat) => {
      return await getByIdAsync(cat); //TODO: refactor so we can use the bulk method
    });

    return Promise.all(categories);
  }

  return categories;
};

export interface CreditCardDocument {
  id: string;
  name: string;
  issuer: Issuer;
  primaryColor: string;
  secondaryColor: string;
  annualFee: number;
  minimumSpend: number;
  signUpBonus: number;
  startDate: Date;
  categories: string[]; // TODO: Should categories be a part of cards or vice versa
  hasForeignTransactionFee: boolean;
  // creditLimit: number; // TODO: relevant for this application?
}

export enum Issuer {
  Visa = "Visa",
  Mastercard = "Mastercard",
  Citibank = "Citi",
  Chase = "Chase",
  BOA = "Bank of America",
  Discover = "Discover",
}

export const firestoreConverter: FirestoreDataConverter<CreditCardDocument> = {
  toFirestore: (creditCard: CreditCardDocument): DocumentData => creditCard,
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>) => {
    const data = snapshot.data();

    return {
      id: snapshot.id,
      name: data.name,
      issuer: data.issuer,
      primaryColor: data.primaryColor ?? "#0476ba",
      secondaryColor: data.secondaryColor ?? "#f7f7f7",
      annualFee: data.annualFee,
      minimumSpend: data.minimumSpend,
      signUpBonus: data.signUpBonus,
      startDate: data.startDate?.toDate(),
      categories: getCategories(data),
      hasForeignTransactionFee: data.hasForeignTransactionFee,
    } as CreditCardDocument;
  },
};

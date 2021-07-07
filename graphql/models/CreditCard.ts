import {
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
} from "@google-cloud/firestore";
import { CategoryDocument } from "./Category";

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
  categories: CategoryDocument[]; // TODO: Should categories be a part of cards or vice versa
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
      categories: data.categories ?? [],
      hasForeignTransactionFee: data.hasForeignTransactionFee,
    } as CreditCardDocument;
  },
};

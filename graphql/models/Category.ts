import {
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
} from "@google-cloud/firestore";

export interface CategoryDocument {
  id: string;
  name: string;
  percent: number;
}

export const firestoreConverter: FirestoreDataConverter<CategoryDocument> = {
  toFirestore: (category: CategoryDocument): DocumentData => category,
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>) => {
    const data = snapshot.data();

    return {
      id: snapshot.id,
      name: data.name,
      percent: data.percent,
    } as CategoryDocument;
  },
};

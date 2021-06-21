import { ApolloServer } from "apollo-server-azure-functions";
import admin, { ServiceAccount } from "firebase-admin";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const config: ServiceAccount = {
  projectId: process.env["FIREBASE_PROJECT_ID"],
  clientEmail: process.env["FIREBASE_CLIENT_EMAIL"],
  privateKey: process.env["FIREBASE_PRIVATE_KEY"].replace(/\\n/g, "\n"),
};

admin.initializeApp({
  credential: admin.credential.cert(config),
});

const server = new ApolloServer({ typeDefs, resolvers });
const firestore = admin.firestore();

firestore.settings({ ignoreUndefinedProperties: true });

exports.run = server.createHandler();
export { firestore };

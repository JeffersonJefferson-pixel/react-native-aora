import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APP_WRITE_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_APP_WRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APP_WRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APP_WRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APP_WRITE_USER_COLLECTION_ID,
  videoCollectionId: process.env.EXPO_PUBLIC_APP_WRITE_VIDEO_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_APP_WRITE_STORAGE_ID,
};

const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email: string, password: string, username: string) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId!,
      config.userCollectionId!,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId!,
      config.userCollectionId!,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
} 

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId!,
      config.videoCollectionId! 
    )

    return posts.documents;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
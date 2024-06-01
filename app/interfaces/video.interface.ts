import { Models } from "react-native-appwrite";

export interface IVideo extends Models.Document {
  title: string;
  thumbnail: string;
  video: string;
  creator: User;
}

import { Models } from "react-native-appwrite";

export type Video = Models.Document & {
  title: string;
  thumbnail: string;
  video: string;
  creator: User;
}

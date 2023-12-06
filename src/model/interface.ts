export interface ITweet {
  tweetId: string;
  tweet: string;
  userId: string;
  username: string;
  userAvatar: string;
  createAt: number;
  updateAt?: number;
  photo?: string;
}

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

export interface IComment {
  commentId: string;
  commentUser: string;
  commentUsername: string;
  commentUserAvatar?: string;
  comment: string;
  createAt: number;
  updateAt?: number;
  tweetId: string;
}

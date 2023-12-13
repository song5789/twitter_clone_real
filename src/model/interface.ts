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

export interface ILikes {
  likedDocId: string;
  likedUserId: string;
  likedAt: number;
}

export interface IUserInfo {
  docId: string;
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  email: string;
  createAt: number;
}

import { useState, useEffect } from "react";
import { ITweet } from "../model/interface";
import styled from "styled-components";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

const Wrapper = styled.div``;

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const collectionRef = collection(db, "tweets");
      const tweetsQuery = query(collectionRef, orderBy("createAt", "desc"), limit(25));
      /* const querySnapshot = await getDocs(tweetsQuery);
       const tweets = querySnapshot.docs.map((doc) => {
        const { tweet, username, userAvatar, userId, createAt, photo } = doc.data();
         return {
           tweetId: doc.id,
          tweet,
           username,
           userAvatar,
           userId,
           createAt,
          photo,
         };
       });*/
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, username, userAvatar, userId, createAt, photo, updateAt } = doc.data();
          return {
            tweetId: doc.id,
            tweet,
            username,
            userAvatar,
            userId,
            createAt,
            updateAt,
            photo,
          };
        });
        setTweets(tweets);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.tweetId} {...tweet} />
      ))}
    </Wrapper>
  );
}

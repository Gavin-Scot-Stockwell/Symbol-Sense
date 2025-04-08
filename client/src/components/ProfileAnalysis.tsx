import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { useState } from "react";

interface Emoji {
  _id: string;
  emojiAuthor: string;
  createdAt: string;
  emojiText: string;
  emojiDescription: string;
  wordCount: number;
}

// const ProfileAnalysis: React.FC<EmojiListProps> = ({ emojis }) => {
const ProfileAnalysis: React.FC = () => {
  const { data } = useQuery(QUERY_ME);
  const user = data?.me || {};
  const [wordCount] = useState(() =>
    user.emojis.reduce((acc: number, emoji: Emoji) => acc + emoji.wordCount, 0)
  );
  const [postCount] = useState(() => user.emojis.length);
  return (
    <>
      {/* Display the total number of words */}
      <h2>Number of Words: {wordCount}</h2>
      <h2>Number of Posts: {postCount}</h2>
    </>
    // // Calculate the total number of words

    // If emojis array is empty, return a message indicating that

    // <div>
    //   {/* Display the total number of words */}
    //   <h1>Number of Words: {wordCount}</h1>

    //   {/* Render the list of emojis/words */}
    //   <ul>
    //     {emojis.map((emoji, index) => (
    //       <li key={index}>{emoji.emojiText}</li>
    //     ))}
    //   </ul>
    // </div>;

    // // Calculate the start of the current week (7 days ago)

    // // Calculate the weekly post rate
    // const weeklyPostRate = weeklyPosts.length;

    // return (
    //   <div>
    //     <h1>Weekly Post Rate: {weeklyPostRate}</h1>

    //     {/* Render the list of posts */}
    //     <ul>
    //       {weeklyPosts.map((post) => (
    //         <li key={post.id}>{post.content}</li>
    //       ))}
    //     </ul>
    //   </div>
  );
};

export default ProfileAnalysis;

/*

Profile Stats
-number of posts
-number of words written 
-post rate (post this week)/(this week)
*/

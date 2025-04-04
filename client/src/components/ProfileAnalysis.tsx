interface Emoji {
  _id: string;
  emojiAuthor: string;
  createdAt: string;
  emojiText: string;
  emojiDescription: string;
}

interface EmojiListProps {
  emojis: Emoji[];
  title: string;
}

const ProfileAnalysis: React.FC<EmojiListProps> = ({ emojis }) => {
  // If emojis array is empty, return a message indicating that
  if (!emojis.length) {
    return <p> Number of Posts</p>;
  }

  // Log emojis to the console (this could also be done in useEffect)
  console.log("Emojis:", emojis);

  // Calculate the total number of words
  const wordCount = emojis.reduce((acc: number, emoji: Emoji) => {
    // Split each emoji by spaces to count words
    const words = emoji.emojiText.split(" ").filter((word) => word.length > 0);
    return acc + words.length;
  }, 0);

  // If emojis array is empty, return a message indicating that
  if (!wordCount) {
    return (
      <div>
        <p>No words available</p>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* Display the total number of words */}
        <h1>Number of Words: {wordCount}</h1>

        {/* Render the list of emojis/words */}
        <ul>
          {emojis.map((emoji, index) => (
            <li key={index}>{emoji.emojiText}</li>
          ))}
        </ul>
      </div>
      <div>
        {/* Display the number of emojis */}
        <h1>Number of Emojis: {emojis.length}</h1>

        {/* Render the list of emojis */}
        <ul>
          {emojis.map((emoji, index) => (
            <li key={index}>{emoji.emojiText}</li>
          ))}
        </ul>
      </div>
      ;
    </>
    // // Calculate the total number of words
    // const wordCount = EmojiList.reduce((acc: number, emoji: Emoji) => {
    //   // Split each emoji by spaces to count words
    //   const words = emoji.emojiText.split(" ").filter((word) => word.length > 0);
    //   return acc + words.length;
    // }, 0);

    // // If emojis array is empty, return a message indicating that
    // if (!wordCount) {
    //   return (
    //     <div>
    //       <p>No words available</p>
    //     </div>
    //   );
    // }
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
    // const startOfWeek = new Date(today);
    // startOfWeek.setDate(today.getDate() - 7); // Subtract 7 days to get the start of the week

    // // Filter posts made in the past 7 days
    // const weeklyPosts = posts.filter((post) => {
    //   const postDate = new Date(post.timestamp);
    //   return postDate >= startOfWeek; // Keep posts that are within the last 7 days
    // });

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

//           return (
//             <div className="profile-container">
//               <div className="profile-header">
//                 <img src={emojis} alt={`${user.emojiText}'s profile`} />
//                 <h1>{user.name}</h1>
//               </div>
// {/*

//           <div className="profile-stats">
//             <div className="stat">
//               <p>Posts</p>
//               <p>{user.posts}</p>
//             </div>
//             <div className="stat">
//               <p>Number of Words Writen</p>
//               <p>{user.words}</p>
//             </div>

//             <div className="stat">
//               <p>Weekly Post Rate</p>
//               <p>{user.avgRating}</p>
//             </div>
//           </div> */}
//         </div>
//       );
//     };
// };

// export default ProfileAnalysis;

/*

Profile Stats
-number of posts
-number of words written 
-post rate (post this week)/(this week)
*/

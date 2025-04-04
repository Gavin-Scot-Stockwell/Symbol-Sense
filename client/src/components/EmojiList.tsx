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

const EmojiList: React.FC<EmojiListProps> = ({ emojis, title }) => {
  if (!emojis.length) {
    return <h3>No emojis D:</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {emojis &&
        emojis.map((emoji) => (
          <div key={emoji._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {} <br />
              <span style={{ fontSize: "1rem" }}>
                EMOJI WAS MADE AT{" "}
                {new Date(Number(emoji.createdAt)).toLocaleString()}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{emoji.emojiText}</p>
              <p>{emoji.emojiDescription}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EmojiList;

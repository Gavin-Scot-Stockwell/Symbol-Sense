interface Emoji {
    _id: string;
    emojiAuthor: string;
    createdAt: string;
    emojiText: string;
    emojiDescription: string;
  }
  
  interface EmojiDisplayProps {
    emoji: Emoji;
  }
  
  const EmojiDisplay: React.FC<EmojiDisplayProps> = ({ emoji }) => {
    if (!emoji) {
      return <h3>No emojis D:</h3>;
    }
  
    return (
      <div>
            <div key={emoji._id} className="card mb-3">
              <h4 className="card-header bg-primary text-light p-2 m-0">
              </h4>
              <div className="card-body bg-light p-2">
                <p>{emoji.emojiText}</p>
              </div>
            </div>
        
      </div>
    );
  };
  
  export default EmojiDisplay;
  
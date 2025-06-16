import React, { useState, useCallback, useEffect } from "react";
import Auth from "../utils/auth";
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

const isImage = (text: string) =>
  text.startsWith("http://") ||
  text.startsWith("https://") ||
  text.startsWith("data:image");

const groupByDescription = (emojis: Emoji[]) => {
  return emojis.reduce((groups, emoji) => {
    if (!groups[emoji.emojiDescription]) {
      groups[emoji.emojiDescription] = [];
    }
    groups[emoji.emojiDescription].push(emoji);
    return groups;
  }, {} as { [desc: string]: Emoji[] });
};

const EmojiList: React.FC<EmojiListProps> = ({ emojis, title }) => {
  const [lightbox, setLightbox] = useState<{
    group: Emoji[];
    index: number;
  } | null>(null);

  const openLightbox = (group: Emoji[], index: number) => {
    setLightbox({ group, index });
  };

  const closeLightbox = () => setLightbox(null);

  const goPrev = useCallback(() => {
    if (lightbox && lightbox.index > 0) {
      setLightbox({ ...lightbox, index: lightbox.index - 1 });
    }
  }, [lightbox]);

  const goNext = useCallback(() => {
    if (lightbox && lightbox.index < lightbox.group.length - 1) {
      setLightbox({ ...lightbox, index: lightbox.index + 1 });
    }
  }, [lightbox]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, goPrev, goNext]);

  if (!emojis.length) {
    return <h3>No emojis D:</h3>;
  }

  const grouped = groupByDescription(emojis);


  return (
    <div>
      {Auth.loggedIn() ? (
           
           
           <>

            </>
          ) : (
            <>
             
            </>
          )}
      <h3>{title}</h3>
      {Object.entries(grouped).map(([desc, group]) => (
        <div key={desc} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            {
            Auth.loggedIn() ? desc : ""     
            }
          </h4>
          <div className="card-body">
            {group.map((emoji) =>
              isImage(emoji.emojiText) ? (
                <img
                  key={emoji._id}
                  src={emoji.emojiText} 
                  alt={Auth.loggedIn() ? emoji.emojiDescription : ""}
                  style={{ maxHeight: "100px", maxWidth: "100px", margin: "0.5rem", cursor: "pointer" }}
                  onClick={() => openLightbox(group.filter(e => isImage(e.emojiText)), group.filter(e => isImage(e.emojiText)).findIndex(e => e._id === emoji._id))}
                />
              ) : (
                <span key={emoji._id} style={{ fontSize: "2rem", margin: "0.5rem" }}>
                  {emoji.emojiText}
                </span>
              )
            )}
          </div>
        </div>
      ))}

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={closeLightbox}
        >
          <div
            style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightbox.group[lightbox.index].emojiText}
              alt={lightbox.group[lightbox.index].emojiDescription}
              style={{ maxHeight: "80vh", maxWidth: "80vw", display: "block", margin: "0 auto" }}
            />
            {/* Left Arrow */}
            {lightbox.index > 0 && (
              <button
                onClick={goPrev}
                style={{
                  position: "fixed",
                  top: "50%",
                  left: 400,
                  fontSize: "5rem",
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  padding: "1rem"
                }}
                aria-label="Previous"
              >
                &#8592;
              </button>
            )}
            {/* Right Arrow */}
            {lightbox.index < lightbox.group.length - 1 && (
              <button
                onClick={goNext}
                style={{
                  position: "fixed",
                  top: "50%",
                  right: 400,
                  fontSize: "5rem",
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  padding: "1rem"
                }}
                aria-label="Next"
              >
                &#8594;
              </button>
            )}
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              style={{
                position: "fixed",
                top: 150,
                right: 500,
                fontSize: "5rem",
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "1rem"
              }}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiList;
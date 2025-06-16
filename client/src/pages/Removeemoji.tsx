import { useState, type FormEvent } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_EMOJI } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { useParams } from 'react-router-dom';

interface Emoji {
  _id: string;
  emojiText: string;
  emojiDescription: string;
}

const isImage = (text: string) =>
  text.startsWith('http://') ||
  text.startsWith('https://') ||
  text.startsWith('data:image');

const Removeemoji = () => {
  const [formState, setFormState] = useState({
    emojiId: '',
  });
console.log(setFormState)
const [selectId, setSelectedId] = useState<string | null>(null)
  console.log(selectId)
  const [removeEmoji, { error }] = useMutation(REMOVE_EMOJI);

  const { username: userParam } = useParams();
  const { data, refetch } = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });

  // Find the selected emoji object for preview
  const selectedEmoji: Emoji | undefined =
    data?.me?.emojis.find((emoji: Emoji) => emoji._id === formState.emojiId);


  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await removeEmoji({
        variables: { emojiId: selectId }, // Pass emojiId explicitly
      });

      console.log('Emoji removed:', data);

      // Refetch the latest emoji data
      await refetch();
    } catch (e) {
      console.error(e);
    }
  };


 
  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Remove Image!</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="id-select">Choose Image</label>
          
                  {data &&
                  data.me.emojis.map((emoji: Emoji) => (
                    <div
                      key={emoji._id}
                      onClick={() => {
                        setSelectedId(emoji._id);
                        setFormState({ emojiId: emoji._id });
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        backgroundColor: selectId === emoji._id ? 'lightgreen' : 'transparent',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {isImage(emoji.emojiText) ? (
                        <img
                          src={emoji.emojiText}
                          alt={emoji.emojiDescription}
                          style={{ maxWidth: '200px', maxHeight: 'auto', marginRight: '0.5rem' }}
                        />
                      ) : null}
                      <span>
                        {emoji.emojiDescription || emoji.emojiText}
                      </span>
                    </div>
                  ))}
      
              {/* Preview the selected emoji */}
              
              {selectedEmoji && (
                <div style={{ margin: '1rem 0' }}>
                  <p>Preview to remove:</p>
                  {isImage(selectedEmoji.emojiText) ? (
                    <img
                      src={selectedEmoji.emojiText}
                      alt={selectedEmoji.emojiDescription}
                      style={{ width: '4rem', height: '4rem' }}
                    />
                  ) : (
                    <span style={{ fontSize: '2rem' }}>{selectedEmoji.emojiText}</span>
                  )}
                  <div>
                    <strong>Description:</strong> {selectedEmoji.emojiDescription}
                  </div>
                </div>
              )}

              <button
                className="btn btn-block btn-primary"
                style={{ cursor: 'pointer' }}
                type="submit"
                disabled={!selectId}
              >
                Remove
              </button>
            </form>

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};


export default Removeemoji;
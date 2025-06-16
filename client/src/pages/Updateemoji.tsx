import { useState, type FormEvent, useEffect, ChangeEvent } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_EMOJI } from '../utils/mutations'; // <-- Your update mutation
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

const Updateemoji = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [updateEmoji, { error }] = useMutation(UPDATE_EMOJI);

  const { username: userParam } = useParams();
  const { data, refetch } = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });

  // Find the selected emoji object for preview
  const selectedEmoji: Emoji | undefined =
    data?.me?.emojis.find((emoji: Emoji) => emoji._id === selectedId);

  // When a new emoji is selected, update the description and image fields
  useEffect(() => {
    if (selectedEmoji) {
      setDescription(selectedEmoji.emojiDescription || '');
      setImage(selectedEmoji.emojiText || '');
    }
  }, [selectedEmoji]);

  // Handle image file input
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedId) return;

    try {
      const { data } = await updateEmoji({
        variables: {
          emojiId: selectedId,
          emojiDescription: description,
          emojiText: image,
        },
      });

      console.log('Emoji updated:', data);

      // Refetch the latest emoji data
      await refetch();
      setSelectedId(null);
      setDescription('');
      setImage('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Update Image!</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="id-select">Choose Image</label>
              {data &&
                data.me.emojis.map((emoji: Emoji) => (
                  <div
                    key={emoji._id}
                    onClick={() => setSelectedId(emoji._id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      backgroundColor: selectedId === emoji._id ? 'lightblue' : 'transparent',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {isImage(emoji.emojiText) ? (
                      <img
                        src={emoji.emojiText}
                        alt={emoji.emojiDescription}
                        style={{
                          maxWidth: '100px',
                          maxHeight: '100px',
                          marginRight: '0.5rem',
                        }}
                      />
                    ) : null}
                    <span>
                      {emoji.emojiDescription || emoji.emojiText}
                    </span>
                  </div>
                ))}

              {/* Preview and update form for the selected emoji */}
              {selectedEmoji && (
                <div style={{ margin: '1rem 0' }}>
                  <p>Preview to update:</p>
                  {isImage(image) ? (
                    <img
                      src={image}
                      alt={description}
                      style={{ width: '4rem', height: '4rem' }}
                    />
                  ) : (
                    <span style={{ fontSize: '2rem' }}>{image}</span>
                  )}
                  <div>
                    <strong>Description:</strong>
                    <input
                      type="text"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      style={{ marginLeft: '0.5rem' }}
                    />
                  </div>
                  <div style={{ marginTop: '0.5rem' }}>
                    <strong>Update Image:</strong>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ marginLeft: '0.5rem' }}
                    />
                  </div>
                </div>
              )}

              <button
                className="btn btn-block btn-primary"
                style={{ cursor: 'pointer' }}
                type="submit"
                disabled={!selectedId}
              >
                Update
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

export default Updateemoji;
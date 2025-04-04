import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_EMOJI } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries'; // Removed QUERY_LAST_EMOJI
import { useParams } from 'react-router-dom';
//import LastPosted from '../components/LastPosted';

interface Emoji {
  _id: string;
  emojiText: string;
  emojiDescription: string;
}


const Updateemoji = () => {
  const [formState, setFormState] = useState({
    emojiText: '',
    emojiDescription: '',
    emojiId: '',
  });

  const [addEmoji, { error, data: mutationData }] = useMutation(UPDATE_EMOJI);

  const { username: userParam } = useParams();
  const { loading, data, refetch } = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });

  if (!loading && data) {
    const emojiData = data.me.lastEmoji; // Adjusted to use QUERY_ME
    if (emojiData && formState.emojiId === '') {
      setFormState({
        emojiText: emojiData.emojiText || '',
        emojiDescription: emojiData.emojiDescription || '',
        emojiId: emojiData._id || '',
      });
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await addEmoji({
        variables: { input: { ...formState } },
      });

      console.log('Emoji added:', data);

      // Refetch the latest emoji data
      await refetch();
    } catch (e) {
      console.error(e);
    }
  };
//<LastPosted lastEmoji={data?.me?.lastEmoji || null} />

  return (
    <main className="flex-row">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Add Emoji!</h4>
          <div className="card-body">
                        {mutationData ? (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Emoji Name"
                  name="emojiText"
                  type="text"
                  value={formState.emojiText}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Emoji Description"
                  name="emojiDescription"
                  type="text"
                  value={formState.emojiDescription}
                  onChange={handleChange}
                />
                <label htmlFor="id-select">Choose Emoji</label>
                <select
                  className="form-input"
                  name="emojiId"
                  onChange={handleChange}
                  value={formState.emojiId}
                >
                  <option value="" disabled>
                    Select an Emoji
                  </option>
                  {data &&
                    data.me.emojis.map((emoji: { _id: string; emojiText: string }) => (
                      <option key={emoji._id} value={emoji._id}>
                        {emoji.emojiText} ({emoji._id})
                      </option>
                    ))}
                </select>
                <button
                  className="btn btn-block btn-primary"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Emoji Name"
                  name="emojiText"
                  type="text"
                  value={formState.emojiText}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Emoji Description"
                  name="emojiDescription"
                  type="text"
                  value={formState.emojiDescription}
                  onChange={handleChange}
                />
                <label htmlFor="id-select">Choose Emoji</label>
                <select
                  className="form-input"
                  name="emojiId"
                  onChange={handleChange}
                  value={formState.emojiId}
                >
                  <option value="" disabled>
                    Select an Emoji
                  </option>
                  {data &&
                    data.me.emojis.map((emoji: Emoji) => (
                      <option key={emoji._id} value={emoji._id}>
                        {emoji.emojiText} ({emoji._id})
                      </option>
                    ))}
                </select>
                <button
                  className="btn btn-block btn-primary"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

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
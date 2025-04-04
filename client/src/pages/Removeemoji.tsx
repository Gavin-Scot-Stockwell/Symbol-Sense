import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_EMOJI } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { useParams } from 'react-router-dom';

interface Emoji {
  _id: string;
  emojiText: string;
  emojiDescription: string;
}

const Removeemoji = () => {
  const [formState, setFormState] = useState({
    emojiId: '',
  });

  const [removeEmoji, { error, data: mutationData }] = useMutation(REMOVE_EMOJI);

  const { username: userParam } = useParams();
  const { loading, data, refetch } = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log('Updated formState:', { ...formState, [name]: value }); // Debugging
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await removeEmoji({
        variables: { emojiId: formState.emojiId }, // Pass emojiId explicitly
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
          <h4 className="card-header bg-dark text-light p-2">Remove Emoji!</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
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
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                Submit
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
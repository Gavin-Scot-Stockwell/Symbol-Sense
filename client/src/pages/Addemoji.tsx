import { useState, type FormEvent, type ChangeEvent } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { ADD_EMOJI } from '../utils/mutations';
import { QUERY_LAST_EMOJI } from '../utils/queries';

import { useParams } from 'react-router-dom';

const AddEmoji = () => {
  const [formState, setFormState] = useState({
    emojiText: '',
    emojiDescription: '',
    emojiAuthor: '',
  });

  const [addEmoji, { error, data: mutationData }] = useMutation(ADD_EMOJI);

  const { username: userParam } = useParams();
  const { loading, data, refetch } = useQuery(QUERY_LAST_EMOJI, {
    variables: { username: userParam },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Add Emoji!</h4>
          <div className="card-body">
            {mutationData ? (
              <form onSubmit={handleFormSubmit}>
                <p>Your emoji has been added {data.lastEmoji.emojiText}</p>

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
                <input
                  className="form-input"
                  placeholder="Emoji Author"
                  name="emojiAuthor"
                  type="text"
                  value={formState.emojiAuthor}
                  onChange={handleChange}
                />
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
                <input
                  className="form-input"
                  placeholder="Emoji Author"
                  name="emojiAuthor"
                  type="text"
                  value={formState.emojiAuthor}
                  onChange={handleChange}
                />
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

export default AddEmoji;
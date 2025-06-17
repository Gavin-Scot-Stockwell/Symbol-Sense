// const AddEmoji = () => {
//   return <div>Test</div>;
// };

// export default AddEmoji;

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

  const [addEmoji, { error }] = useMutation(ADD_EMOJI);
  const { username: userParam } = useParams();

  const { loading, data, refetch } = useQuery(QUERY_LAST_EMOJI, {
    variables: { username: userParam },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = event.target;

    if (type === 'file' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState((prev) => ({
          ...prev,
          [name]: reader.result as string, // base64 image
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
          <h4 className="card-header bg-dark text-light p-2">Add Image!</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <p>
                Your Image has been added{' '}
                {data?.lastEmoji?.emojiText ? (
                  <img
                    src={data.lastEmoji.emojiText}
                    alt="Last emoji"
                    style={{ width: '2rem', height: '2rem' }}
                  />
                ) : (
                  'None'
                )}
              </p>

              <input
                className="form-input"
                placeholder="Emoji Image"
                name="emojiText"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />

              {formState.emojiText && (
                <div style={{ margin: '1rem 0' }}>
                  <p>Preview:</p>
                  <img
                    src={formState.emojiText}
                    alt="Preview"
                    style={{ width: '4rem', height: '4rem' }}
                  />
                </div>
              )}

              <input
                className="form-input"
                placeholder="Image here"
                name="emojiDescription"
                type="text"
                value={formState.emojiDescription}
                onChange={handleChange}
                maxLength={1}
              />

              <button className="btn btn-block btn-primary" type="submit">
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

export default AddEmoji;

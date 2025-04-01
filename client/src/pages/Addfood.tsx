import { useState, type FormEvent, type ChangeEvent } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { ADD_FOOD } from '../utils/mutations';
import { QUERY_LAST_FOOD } from '../utils/queries';

import { useParams } from 'react-router-dom';

const Addfood = () => {
  const [formState, setFormState] = useState({
    foodText: '',
    foodDescription: '',
    foodAuthor: '',
  });

  const [addFood, { error, data: mutationData }] = useMutation(ADD_FOOD);

  const { username: userParam } = useParams();
  const { loading, data, refetch } = useQuery(QUERY_LAST_FOOD, {
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
      const { data } = await addFood({
        variables: { input: { ...formState } },
      });

      console.log('Food added:', data);

      // Refetch the latest food data
      await refetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Add food!</h4>
          <div className="card-body">
            {mutationData ? (
                <form onSubmit={handleFormSubmit}>
                <p>Your food has been added {data.lastFood.foodText}</p>

                <input
                  className="form-input"
                  placeholder="Food Name"
                  name="foodText"
                  type="text"
                  value={formState.foodText}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Food Description"
                  name="foodDescription"
                  type="text"
                  value={formState.foodDescription}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Food Author"
                  name="foodAuthor"
                  type="text"
                  value={formState.foodAuthor}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Food Name"
                  name="foodText"
                  type="text"
                  value={formState.foodText}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Food Description"
                  name="foodDescription"
                  type="text"
                  value={formState.foodDescription}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Food Author"
                  name="foodAuthor"
                  type="text"
                  value={formState.foodAuthor}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
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

export default Addfood;
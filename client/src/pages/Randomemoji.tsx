import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { QUERY_USER, QUERY_EMOJIS_RANDOM } from '../utils/queries';

import Auth from '../utils/auth';

const Randomemojis = () => {
  const { username: userParam } = useParams();
  const loggedInUsername = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_EMOJIS_RANDOM, {
    variables: { username: userParam || loggedInUsername },
  });

  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const user = data?.me || data?.user || (userParam ? {} : { username: ' ', emojis: [] });


  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/randomemojis" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data, "Data is here")
  if (!Auth.loggedIn() || !user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 
    setUserInput(event. target. value); 
  };

  const handleSubmit = (event : React.FormEvent) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

  const correctAnswer = data?.randomEmoji?.emojiDescription || ''; 
  
   if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
    setFeedback('Correct!'); 
   }
   else {
    setFeedback('Try again!'); 
   }
    // now its gonna empty the input 
    setUserInput('');
  };



  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <div className="col-12 col-md-10 mb-5">
          <div style = {{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
            {data?.randomEmoji?.emojiText || 'No emoji found'}
          </div>
          <form onSubmit = {handleSubmit} 
            style = 
            {{ 
              textAlign: 'center',
              margin: '20px 0',
              padding: '10px',
            }}>
              <input 
                type='text'
                placeholder = 'what does this emoji mean'
                value={userInput}
                onChange={handleInputChange}
                style = {{
                  padding: '12px',
                  fontSize: '16px',
                }}
                />

                <button type = 'submit'
                  style = {{
                    padding: '10px 20px',
                    fontSize: '16px',
                    marginLeft: '10px',
                    cursor: 'pointer'
                  }}
                >  Submit
                  </button>
                  </form>
                  <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '1.2rem' }}>{feedback}
                  </p>
      
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            {/* Additional content */}
          </div>
        )}
      </div>
    </div>
  );
};



export default Randomemojis;
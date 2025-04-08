import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { QUERY_USER, QUERY_EMOJIS_RANDOM } from '../utils/queries';

import Auth from '../utils/auth';

const Randomemojis = () => {
  const { username: userParam } = useParams();
  const loggedInUsername = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  const { loading, data, refetch} = useQuery(userParam ? QUERY_USER : QUERY_EMOJIS_RANDOM, {
    variables: { username: userParam || loggedInUsername },
  });

  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [nextButton, setNextButton] = useState('Next'); // when the user sumbits the answer, this will change toNext after the answer 
  const [revealLetters, setRevealedLetters] = useState(0);
   // this is to reveal the letters of the answer
  const [streak, setStreak] = useState(0);

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

    setNextButton('Congrats, guess the next emoji!'); 
    
    setRevealedLetters(0);

    setStreak((prev) => prev + 1);
    
   }
   else {
    setFeedback('Try again!'); 

    setNextButton('Too tough?'); 

    setRevealedLetters((prev) => Math.min(prev + 3 , correctAnswer.length)); 
    // reveals 3 letters at a time

    setStreak(0);
   }
    // now its gonna empty the input 
    setUserInput('');
  };

  // here this function to refetch to random emoji next button
  const handleNext = () => {
    refetch (); 
    setFeedback(''); 
    setUserInput('');
    setNextButton('Next');
    setRevealedLetters(0);
    //right here will reset the letters to 0
  };

  const correctAnswer = data?.randomEmoji?.emojiDescription || '';
  const hint = correctAnswer.slice(0, revealLetters);




  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <div className="col-12 col-md-10 mb-5">
          <div>
            {data?.randomEmoji?.emojiText || 'No emoji found'}
          </div>
          <form onSubmit = {handleSubmit}>
              <input 
                type='text'
                placeholder = 'what do these emoji mean?'
                value={userInput}
                onChange={handleInputChange}
                />

                <button type = 'submit'
                >  Submit
                  </button>
                  </form>
                  <p>{feedback}
                  </p>
                  {revealLetters > 0 && feedback != 'Correct!' &&  (
                    <p>Hint: {hint}</p>
                  )}
                  {/* this is to show the hint and hints will go away once the user finally gets it right!!!*/}
                <p>Streak: {streak} 🔥 </p>


                <button
                  onClick = {handleNext}
                 
                >
                  {nextButton}
                </button>
      
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
          >
            {/* Additional content */}
          </div>
        )}
      </div>
    </div>
  );
};





export default Randomemojis;
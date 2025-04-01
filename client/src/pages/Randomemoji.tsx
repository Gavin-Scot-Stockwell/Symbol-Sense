import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_EMOJIS_RANDOM } from '../utils/queries';
import EmojiList from '../components/EmojiList'; // Adjust the path as necessary

import Auth from '../utils/auth';

const Randomemojis = () => {
  const { username: userParam } = useParams();
  const loggedInUsername = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_EMOJIS_RANDOM, {
    variables: { username: userParam || loggedInUsername },
  });

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

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <div className="col-12 col-md-10 mb-5">
        <EmojiList
  emojis={data?.randomEmoji ? [data.randomEmoji] : []} // Wrap single object in an array
  title={`${user?.username}`}
/>
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
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_EMOJIS } from '../utils/queries';
import EmojiList from '../components/EmojiList'; // Adjust the path as necessary

import Auth from '../utils/auth';

const Home = () => {
  const { username: userParam } = useParams();
  const loggedInUsername = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_EMOJIS, {
    variables: { username: userParam || loggedInUsername },
  });

  const user = data?.me || data?.user || (userParam ? {} : { username: 'all users', emojis: [] });

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/Home" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn() || !user?.username) {
    return (
      <h4>
        Welcome to Symbol Sense!
        Create your own cryptic messages with emojis! See if you can guess other peoples messages! 

        <p>Looks like you need to login in to join the fun!</p>
      </h4>
    );
  }

  return (
    <div>
              <p className="home-info">Welcome to Symbol Sense!
              Create your own cryptic messages with emojis! See if 
              you can guess other peoples messages! </p>
      <div className="flex-row justify-center mb-3">
        <div className="col-12 col-md-10 mb-5">
          <EmojiList
            emojis={data?.emojis || []} // Provide an empty array as a fallback
            title={`${user?.username || "All User"} emojis`}
          />
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

export default Home;
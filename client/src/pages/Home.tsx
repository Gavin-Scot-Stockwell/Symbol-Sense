import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { QUERY_EMOJIS_RANDOM } from '../utils/queries';

const Home = () => {
  const { loading, data, refetch } = useQuery(QUERY_EMOJIS_RANDOM);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000); // Matches the 10s animation

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [refetch]);

  if (loading) {
    return (
      <div style={{ fontSize: '1.5rem', color: '#666', textAlign: 'center', marginTop: '20px' }}>
        Loading...
      </div>
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
      </div>
      <style>
      {`
    @keyframes fade {
      0% {
        transform: scale(0.2);
      }
      50% {
        transform: scale(1);
      }
      100% {
        transform: scale(0.2);
      }
    }
  `}
      </style>
    </div>
  );
};

export default Home;

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      }}
    >
      <h4
        style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          color: '#333',
          marginBottom: '10px',
        }}
      >
        Welcome to Symbol Sense!
        <p>Create your own cryptic messages with emojis! See if you can guess other people's messages!</p>
      </h4>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '350px',
          height: '250px',
          backgroundColor: 'black',
          border: '5px solid #333',
          borderRadius: '20px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            fontSize: '5rem',
            color: 'white',
            animation: `fade 10s infinite`
          }}
        >
          {data?.randomEmoji?.emojiText || 'No emoji found'}
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

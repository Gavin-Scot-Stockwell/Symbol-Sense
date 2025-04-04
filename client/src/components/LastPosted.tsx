import { useParams } from 'react-router-dom';
import { QUERY_LAST_EMOJI } from '../utils/queries';
import { useQuery } from '@apollo/client';

const LastPosted = () => {


    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_LAST_EMOJI, {
        variables: { username: userParam },
    });

    if (loading) return <p>Loading...</p>;

    return (
        <p>Your emoji has been updated {data?.lastEmoji.emojiText || 'Error'}</p>
    );
};

export default LastPosted;
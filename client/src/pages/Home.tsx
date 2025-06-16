import { useQuery } from "@apollo/client";
import { QUERY_EMOJIS } from "../utils/queries";
import EmojiList from "../components/EmojiList";

const Home = () => {
  const { loading, data, error } = useQuery(QUERY_EMOJIS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          
        </h2>
        <div className="col-12 col-md-10 mb-5">
          <EmojiList
            emojis={data?.emojis || []}
            title=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
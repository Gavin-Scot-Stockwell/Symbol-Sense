interface Food {
  _id: string;
  foodAuthor: string;
  createdAt: string;
  foodText: string;
  foodDescription: string;
  
}

interface FoodListProps {
  foods: Food[];
  title: string;
}

const FoodList: React.FC<FoodListProps> = ({ foods, title }) => {
  if (!foods.length) {
    return <h3>no food D:</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {foods &&
        foods.map((food) => (
          <div key={food._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {} <br />
              <span style={{ fontSize: '1rem' }}>
                FOOD WAS MADE AT {new Date(Number(food.createdAt)).toLocaleString()}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{food.foodText}</p>
              <p>{food.foodDescription}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FoodList;

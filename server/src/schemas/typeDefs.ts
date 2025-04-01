const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    foods: [Food]!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

 type Food {
   _id: ID
   foodText: String
   foodDescription: String
   foodAuthor: String
   createdAt: String
 }

  input FoodInput {
    foodText: String!
    foodDescription: String!
    foodAuthor: String!
  }

  type Query {
    users: [User]
    user(username: String!): User
    foods: [Food]!
    food(foodId: ID!): Food
    me: User
    randomFood: Food
    lastFood: Food
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addFood(input: FoodInput!): Food
    removeFood(foodId: ID!): Food
  }
`;

export default typeDefs;
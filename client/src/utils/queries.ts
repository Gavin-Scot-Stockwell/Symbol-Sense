import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query meQ {
  me {
    email
    _id
    username
    password
    foods {
      _id
      createdAt
      foodAuthor
      foodText
      foodAuthor
    }
  }
}
`

export const QUERY_FOOD = gql`
query getFoodQ($foodId: ID!) {
  food(foodId: $foodId) {
    _id
    foodText
    foodDescription
  }
}
`
// Example Var
// {
//   "foodId": "67eaf2feba94d24372510b2e"
// }

export const QUERY_FOODS = gql`
query getFoodsQ {
  foods {
    foodText
    foodDescription
    createdAt
    _id
  }
}
`

export const QUERY_USERS = gql`
query getUsersQ {
  users {
    _id
    email
    username
  }
}
`

export const QUERY_USER = gql`
query getUserQ($username: String!) {
  user(username: $username) {
    _id
    email
    username
  }
}`

// Example Var
// {
//     "username": "Gavin"
// }

export const QUERY_USERS_AND_FOODS = gql`
query getUsersAndFoodsQ {
  users {
    _id
    email
    username
    foods {
      foodText
      foodDescription
      createdAt
      _id
    }
  }
}`

export const QUERY_USER_AND_FOODS = gql`
query getUserAndFoodsQ($username: String!) {
  user(username: $username) {
    _id
    email
    username
    foods {
      foodText
      foodDescription
      _id
    }
  }
}`

// Example Var
// {
//     "username": "Gavin"
// }

export const QUERY_FOODS_RANDOM = gql`
query getRandomFoodQ {
  randomFood {
    _id
    foodText
    foodDescription
    foodAuthor
    createdAt
  }
}
`

export const QUERY_LAST_FOOD = gql`
query lastFoodQ {
  lastFood {
    _id
    createdAt
    foodAuthor
    foodDescription
    foodText
  }
}
`
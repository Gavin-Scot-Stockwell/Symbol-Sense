import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      username
    }
  }
}
`
// Example Var
// { 
//     "email": "",
//     "password": ""
// }

export const ADD_USER = gql`
mutation addUser($input: UserInput!) {
  addUser(input: $input) {
    token
    user {
      _id
      email
      password
      username
    }
  }
}
`
// Example Var
// {
//   "input": {
//     "email": "test",
//     "password": "test",
//     "username": "test"

//   }
// }

export const ADD_FOOD = gql`
mutation addFood($input: FoodInput!) {
  addFood(input: $input) {
    _id
    createdAt
    foodAuthor
    foodText
  }
}
`
// Example Var
// {
//   "input": {
//     "foodAuthor": "test",
//     "foodText": "test"
//   }
// }

export const REMOVE_FOOD = gql`
mutation removeFood($foodId: ID!) {
  removeFood(foodId: $foodId) {
    _id
  }
}`

// Example Var
// {
//   "foodId": "67e743b8c2f42bca161ade13"
// }
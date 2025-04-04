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

export const ADD_EMOJI = gql`
mutation addEmoji($input: EmojiInput!) {
  addEmoji(input: $input) {
    _id
    createdAt
    emojiAuthor
    emojiText
    emojiDescription
  }
}
`
// Example Var
// {
//   "input": {
//     "emojiAuthor": "test",
//     "emojiText": "test",
//     "emojiDescription": "test"
//   }
// }

export const REMOVE_EMOJI = gql`
mutation removeEmoji($emojiId: ID!) {
  removeEmoji(emojiId: $emojiId) {
    _id
  }
}`

// Example Var
// {
//   "emojiId": "67e743b8c2f42bca161ade13"
// }

export const UPDATE_EMOJI = gql`
mutation updateEmoji($input: EmojiUpdate!) {
  updateEmoji(input: $input) {
    emojiDescription
    emojiText
  }
}`

// Example Var
// {
//   "input": {
//     "emojiDescription": "TEST TEST TEST TEST TEST TEST TEST ",
//     "emojiText": "📚",
//     "emojiId":"67ec6d999facd6e582d5b2fc"
// }
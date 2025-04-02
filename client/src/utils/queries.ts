import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query meQ {
  me {
    email
    _id
    username
    password
    emojis {
      _id
      createdAt
      emojiAuthor
      emojiText
      emojiDescription
    }
  }
}
`

export const QUERY_EMOJI = gql`
query getEmojiQ($emojiId: ID!) {
  emoji(emojiId: $emojiId) {
    _id
    emojiText
    emojiDescription
  }
}`
// Example Var
// {
//   "emojiId": "67eaf2feba94d24372510b2e"
// }

export const QUERY_EMOJIS = gql`
query getEmojisQ {
  emojis {
    emojiText
    emojiDescription
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

export const QUERY_USERS_AND_EMOJIS = gql`
query getUsersAndEmojisQ {
  users {
    _id
    email
    username
    emojis {
      emojiText
      emojiDescription
      createdAt
      _id
    }
  }
}`

export const QUERY_USER_AND_EMOJIS = gql`
query getUserAndEmojisQ($username: String!) {
  user(username: $username) {
    _id
    email
    username
    emojis {
      emojiText
      emojiDescription
      _id
    }
  }
}`
// Example Var
// {
//     "username": "Gavin"
// }

export const QUERY_EMOJIS_RANDOM = gql`
query getRandomEmojiQ {
  randomEmoji {
    _id
    emojiText
    emojiDescription
    emojiAuthor
    createdAt
  }
}
`

export const QUERY_LAST_EMOJI = gql`
query lastEmojiQ {
  lastEmoji {
    _id
    createdAt
    emojiAuthor
    emojiDescription
    emojiText
  }
}
`
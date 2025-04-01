const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    emojis: [Emoji]
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

  type Emoji {
    _id: ID
    emojiText: String
    emojiDescription: String
    emojiAuthor: String
    createdAt: String
  }

  input EmojiInput {
    emojiText: String!
    emojiDescription: String!
    emojiAuthor: String!
  }

  type Query {
    users: [User]
    user(username: String!): User
    emojis: [Emoji]!
    emoji(emojiId: ID!): Emoji
    me: User
    randomEmoji: Emoji
    lastEmoji: Emoji
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addEmoji(input: EmojiInput!): Emoji
    removeEmoji(emojiId: ID!): Emoji
  }
`;

export default typeDefs;
const {gql} = require('apollo-server-express');

//create typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        recipeCount: Int
        recipes: [Recipe]
        friendCount: Int
        friends: [User]
    }

    type Recipe {
        _id: ID
        name: String
        description: String
        ingredients: [String]
        steps: [String]
        createdAt: String
        username: String
        reviewCount: Int
        reviews: [Review]
    }

    type Review {
        _id: ID
        reviewBody: String
        createdAt: String
        username: String
        recommended: Boolean
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        recipes(username: String): [Recipe]
        recipe(_id: ID!): Recipe
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addRecipe(name: String!, description: String!, ingredients: [String!], steps: [String!]): Recipe
        addReview(recipeId: ID!, review2Body: String!, recommended: Boolean!): Recipe
        addFriend(friendId: ID!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;
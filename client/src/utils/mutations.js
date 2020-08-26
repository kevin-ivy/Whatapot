import gql from 'graphql-tag';

export const LOGIN_USER = gql `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql `
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_FRIEND = gql `
    mutation addFriend($id: ID!) {
        addFriend(friendId: $id) {
            _id
            username
            friendCount
            friends {
                _id
                username
            }
        }
    }
`;

export const ADD_RECIPE = gql `
    mutation addRecipe($name: String!, $description: String!, $ingredients: [String!], $steps:[String!]) {
        addRecipe(name: $name, description: $description, ingredients: $ingredients, steps: $steps) {
            _id
            name
            descriptions
            ingredients
            steps
            createdAt
        }
    }
`;

export const ADD_REVIEW = gql `
    addReview($recipeId: ID!, $reviewBody: String!, $recommended: Boolean) {
        addReview (recipeId: $recipeId, reviewBody: $reviewBody, recommended: $recommended) {
            _id
            reviewCount
            reviews {
                _id
                reviewBody
                createdAt
                username
            }
        }
    }
`
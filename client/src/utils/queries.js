import gql from 'graphql-tag';

<<<<<<< HEAD

export const QUERY_USER = gql`
{
    user {
        firstName
        lastName
        username
        email
        tasks {
            _id
            taskName
        }
        comments {
            _id
            commentBody
        }
    }
}`;
=======
export const QUERY_RECIPES = gql `
    query recipes($username: String) {
        recipes(username: $username) {
            _id
            name
            description
            ingredients
            steps
            createdAt
            username
            reviewCount
            reviews {
                _id
                reviewBody
                createdAt
                username
                recommended
            }
        }
    }
`;

export const QUERY_RECIPE = gql `
    query recipe($id: ID!) {
        recipe(_id: $id) {
            _id
            name
            description
            ingredients
            steps
            createdAt
            username
            reviewCount
            reviews {
                _id
                reviewBody
                createdAt
                username
                recommended
            }
        }
    }
`;

export const QUERY_USER = gql `
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            recipeCount
            recipes {
                _id
                name
                description
                reviewCount
            }
            friendCount
            friends {
                _id
                username
                email
            }
        }
    }
`

export const QUERY_ME = gql `
    {
        me {
            _id
            username
            email
            recipes {
                _id
                name
                description
                reviewCount
            }
            friendCount
            friends {
                _id
                username
                email
            }
        }
    }
`;

export const QUERY_ME_BASIC = gql `
    {
        me {
            _id
            username
            email
            friendCount
            friends {
                _id
                username
            }
        }
    }
`;
>>>>>>> 67f634cb3fab3437953e4c721d1cbb0aecc8c6ca

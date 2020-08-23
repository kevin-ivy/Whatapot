import gql from 'graphql-tag';


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
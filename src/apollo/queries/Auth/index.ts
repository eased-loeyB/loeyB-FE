import {gql} from '@apollo/client';

export const AUTHENTICATE = gql`
  query authenticate($email: String!, $password: String!) {
    authenticate(input: {email: $email, password: $password}) {
      errorMessage
      result
      data {
        accessToken
        tokenType
        expiresIn
      }
    }
  }
`;

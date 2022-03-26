import {gql} from '@apollo/client';

export const REFRESH_TOKEN = gql`
  mutation refresh($refreshToken: String!) {
    refresh(input: {refreshToken: $refreshToken}) {
      result
      errorMessage
      data {
        accessToken
        tokenType
        expiresIn
        refreshToken
        redirectUrl
      }
    }
  }
`;

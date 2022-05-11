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

export const REQUEST_REGISTER_CODE = gql`
  mutation requestEmailVerificationCode($email: String!) {
    requestEmailVerificationCode(input: {email: $email}) {
      result
      errorMessage
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser($email: String!, $password: String!) {
    registerUser(input: {email: $email, password: $password}) {
      result
      errorMessage
      data {
        accessToken
        tokenType
        expiresIn
        refreshToken
      }
    }
  }
`;

export const SET_USER_NAME = gql`
  mutation setUsername($username: String!) {
    registerUser(input: {username: $username}) {
      result
      errorMessage
    }
  }
`;

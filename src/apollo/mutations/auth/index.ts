import {gql, TypedDocumentNode} from '@apollo/client';

import {
  AuthenticationOutput,
  GoogleLoginInput,
  Output,
  RegisterUserInput,
  RegisterUserOutput,
  RequestEmailVerificationCodeInput,
  RequestEmailVerificationOutput,
  SetUsernameInput,
  TokenRefreshInput,
} from '~/apollo/generated';

export const REFRESH_TOKEN: TypedDocumentNode<
  AuthenticationOutput,
  TokenRefreshInput
> = gql`
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
        hasUserName
        hasUserCategories
        hasUserRecords
      }
    }
  }
`;

export const REQUEST_EMAIL_VERIFICATION_CODE: TypedDocumentNode<
  RequestEmailVerificationOutput,
  RequestEmailVerificationCodeInput
> = gql`
  mutation requestEmailVerificationCode($email: String!) {
    requestEmailVerificationCode(input: {email: $email}) {
      result
      errorMessage
      data {
        code
      }
    }
  }
`;

export const REGISTER_USER: TypedDocumentNode<
  RegisterUserOutput,
  RegisterUserInput
> = gql`
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

export const SET_USER_NAME: TypedDocumentNode<Output, SetUsernameInput> = gql`
  mutation setUsername($username: String!) {
    setUsername(input: {username: $username}) {
      result
      errorMessage
    }
  }
`;

export const GOOGLE_LOGIN: TypedDocumentNode<
  AuthenticationOutput,
  GoogleLoginInput
> = gql`
  mutation googleLogin($token: String!) {
    googleLogin(input: {token: $token}) {
      result
      errorMessage
      data {
        accessToken
        tokenType
        expiresIn
        refreshToken
        redirectUrl
        hasUserName
        hasUserCategories
        hasUserRecords
      }
    }
  }
`;

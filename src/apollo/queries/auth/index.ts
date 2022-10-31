import {gql, TypedDocumentNode} from '@apollo/client';

import {
  AuthenticationInput,
  AuthenticationOutput,
  GoogleLoginInput,
  Output,
  VerifyEmailVerificationCodeInput,
} from '~/apollo/generated';

export const AUTHENTICATE: TypedDocumentNode<
  AuthenticationOutput,
  AuthenticationInput
> = gql`
  query authenticate(
    $email: String!
    $password: String!
    $deviceToken: String
  ) {
    authenticate(
      input: {email: $email, password: $password, deviceToken: $deviceToken}
    ) {
      errorMessage
      result
      data {
        accessToken
        tokenType
        expiresIn
        refreshToken
        userName
      }
    }
  }
`;

export const GOOGLE_LOGIN: TypedDocumentNode<
  AuthenticationOutput,
  GoogleLoginInput
> = gql`
  query googleLogin($token: String!, $deviceToken: String) {
    googleLogin(input: {token: $token, deviceToken: $deviceToken}) {
      result
      errorMessage
      data {
        accessToken
        tokenType
        expiresIn
        refreshToken
        userName
      }
    }
  }
`;

export const VERIFY_EMAIL_VERIFICATION_CODE: TypedDocumentNode<
  Output,
  VerifyEmailVerificationCodeInput
> = gql`
  query verifyEmailVerificationCode($email: String!, $code: String!) {
    verifyEmailVerificationCode(input: {email: $email, code: $code}) {
      errorMessage
      result
    }
  }
`;

import {gql, TypedDocumentNode} from '@apollo/client';

import {
  AuthenticationInput,
  AuthenticationOutput,
  VerifyEmailVerificationCodeInput,
} from '~/apollo/generated';
import {CommonResponse} from '~/models';

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
        redirectUrl
        hasUserName
        hasUserCategories
        hasUserRecords
      }
    }
  }
`;

export const VERIFY_EMAIL_VERIFICATION_CODE: TypedDocumentNode<
  CommonResponse,
  VerifyEmailVerificationCodeInput
> = gql`
  query verifyEmailVerificationCode($email: String!, $code: String!) {
    verifyEmailVerificationCode(input: {email: $email, code: $code}) {
      errorMessage
      result
    }
  }
`;

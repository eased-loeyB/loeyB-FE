import {gql} from '@apollo/client';

export const AUTHENTICATE = gql`
  query authenticate(
    $email: String!
    $password: String!
    $deviceToken: String!
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
      }
    }
  }
`;

export const REMOVE_DEVICE_TOKEN = gql`
  query removeDeviceToken($email: String!, $deviceToken: String) {
    removeDeviceToken(input: {email: $email, deviceToken: $deviceToken}) {
      result
      errorMessage
    }
  }
`;

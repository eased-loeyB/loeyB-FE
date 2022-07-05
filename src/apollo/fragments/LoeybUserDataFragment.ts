import {gql} from '@apollo/client';

export const LoeybUserDataFragment = gql`
  fragment LoeybUserDataFragment on LOEYBUser {
    id
    email
    userName
  }
`;

import gql from 'graphql-tag';

import {LoeybUserDataFragment} from '../../fragments/LoeybUserDataFragment';

export const FETCH_LOEYB_USER = gql`
  query fetchConnectUser {
    fetchConnectUser {
      result
      errorMessage
      data {
        ...LoeybUserDataFragment
      }
    }
  }
  ${LoeybUserDataFragment}
`;

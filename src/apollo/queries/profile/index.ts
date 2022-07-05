import {LoeybUserDataFragment} from '../../fragments/LoeybUserDataFragment';
import gql from 'graphql-tag';

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

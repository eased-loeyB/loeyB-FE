import {gql} from '@apollo/client';

export const FETCH_REGISTER_CATEGORY_AND_TAG = gql`
  query fetchRegisteredCategoryAndTag(
    $limit: String = "40"
    $offset: String = "0"
  ) {
    fetchRegisteredCategoryAndTag(input: {limit: $limit, offset: $offset}) {
      errorMessage
      result
      data {
        category
        tag
      }
    }
  }
`;

export const FETCH_REGISTERED_AREA_CATEGORY_TAG = gql`
  query fetchRegisteredAreaAndCategoryAndTag(
    $limit: String = "40"
    $offset: String = "0"
  ) {
    fetchRegisteredAreaAndCategoryAndTag(
      input: {limit: $limit, offset: $offset}
    ) {
      errorMessage
      result
      data {
        area
        category
        tag
      }
    }
  }
`;

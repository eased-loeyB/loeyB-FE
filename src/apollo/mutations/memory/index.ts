import {gql} from '@apollo/client';

export const REGISTER_CATEGORIES = gql`
  mutation registerCategories(
    $name: String!
    $areaCategory: [AreaCategoryInput!]!
  ) {
    registerCategories(input: {name: $name, areaCategory: $areaCategory}) {
      result
      errorMessage
    }
  }
`;

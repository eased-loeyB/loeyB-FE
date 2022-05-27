import {gql} from '@apollo/client';

export const REGISTER_CATEGORIES = gql`
  mutation registerCategories(
    $email: String!
    $name: String!
    $areaCategory: [AreaCategoryInput!]!
  ) {
    registerCategories(
      input: {email: $email, name: $name, areaCategory: $areaCategory}
    ) {
      result
      errorMessage
    }
  }
`;

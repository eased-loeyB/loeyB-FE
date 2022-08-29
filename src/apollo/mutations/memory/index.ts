import {gql, TypedDocumentNode} from '@apollo/client';

import {
  AddCategoryAndAreaInput,
  AddTagInput,
  Output,
  RegisterCategoriesInput,
  RegisterRecordInput,
  UpdateRecordInput,
} from '~/apollo/generated';

export const REGISTER_CATEGORIES: TypedDocumentNode<
  Output,
  RegisterCategoriesInput
> = gql`
  mutation registerCategories($areaCategory: [AreaCategoryInput!]!) {
    registerCategories(input: {areaCategory: $areaCategory}) {
      result
      errorMessage
    }
  }
`;

export const REGISTER_RECORD: TypedDocumentNode<
  Output,
  RegisterRecordInput
> = gql`
  mutation registerRecord(
    $imgFiles: ImgFileInput
    $areaCategoryTag: [AreaCategoryTagInput!]!
    $date: String!
    $location: String!
    $importance: Float
    $description: String
  ) {
    registerRecord(
      input: {
        imgFiles: $imgFiles
        areaCategoryTag: $areaCategoryTag
        date: $date
        location: $location
        importance: $importance
        description: $description
      }
    ) {
      result
      errorMessage
    }
  }
`;

export const UPDATE_RECORD: TypedDocumentNode<Output, UpdateRecordInput> = gql`
  mutation updateRecord(
    $recordId: String
    $imgFiles: ImgFileInput
    $areaCategoryTag: [AreaCategoryTagInput!]
    $date: String
    $location: String
    $importance: Float
    $description: String
  ) {
    updateRecord(
      input: {
        recordId: $recordId
        imgFiles: $imgFiles
        areaCategoryTag: $areaCategoryTag
        date: $date
        location: $location
        importance: $importance
        description: $description
      }
    ) {
      result
      errorMessage
    }
  }
`;

export const ADD_CATEGORY_AND_AREA: TypedDocumentNode<
  Output,
  AddCategoryAndAreaInput
> = gql`
  mutation addCategoryAndArea(
    $category: LoeybCategoryType!
    $area: LoeybAreaType!
  ) {
    addCategoryAndArea(input: {category: $category, area: $area}) {
      result
      errorMessage
    }
  }
`;

export const ADD_TAG: TypedDocumentNode<Output, AddTagInput> = gql`
  mutation addTag($category: LoeybCategoryType!, $tag: String!) {
    addTag(input: {category: $category, tag: $tag}) {
      result
      errorMessage
    }
  }
`;

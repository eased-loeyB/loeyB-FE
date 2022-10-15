import {gql, TypedDocumentNode} from '@apollo/client';

import {
  AreaTagRatiosOutput,
  FetchRecentCategoryAndTagInput,
  FetchRegisteredAreaAndCategoryAndTagInput,
  FetchRegisteredRecordsInput,
  FetchTagRatioInput,
  RegisteredAreaAndCategoryAndTagOutput,
  RegisteredCategoryAndTagOutput,
  RegisteredCategoryAndTagsOutput,
  SearchTagInput,
  StardustRecordsOutput,
} from '~/apollo/generated';

export const FETCH_RECENT_CATEGORY_AND_TAG: TypedDocumentNode<
  RegisteredCategoryAndTagsOutput,
  FetchRecentCategoryAndTagInput
> = gql`
  query fetchRecentCategoryAndTag($count: Float = 6) {
    fetchRecentCategoryAndTag(input: {count: $count}) {
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

export const FETCH_REGISTERED_AREA_CATEGORY_TAG: TypedDocumentNode<
  RegisteredAreaAndCategoryAndTagOutput,
  FetchRegisteredAreaAndCategoryAndTagInput
> = gql`
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

export const FETCH_REGISTERED_RECORDS: TypedDocumentNode<
  StardustRecordsOutput,
  FetchRegisteredRecordsInput
> = gql`
  query fetchRegisteredRecords(
    $area: LoeybAreaType
    $category: LoeybCategoryType
    $tag: String
    $date: String
  ) {
    fetchRegisteredRecords(
      input: {area: $area, category: $category, tag: $tag, date: $date}
    ) {
      errorMessage
      result
      data {
        id
        files {
          fileId
          fileName
        }
        importance
        description
        location
        date
        areaCategoryTag {
          area
          category
          tag
        }
      }
    }
  }
`;

export const FETCH_TAG_RATIO: TypedDocumentNode<
  AreaTagRatiosOutput,
  FetchTagRatioInput
> = gql`
  query fetchTagRatio(
    $limit: String = "40"
    $offset: String = "0"
    $date: String
  ) {
    fetchTagRatio(input: {limit: $limit, offset: $offset, date: $date}) {
      errorMessage
      result
      data {
        area
        categoryRatio {
          tag
          ratio
        }
      }
    }
  }
`;

export const SEARCH_TAG: TypedDocumentNode<
  RegisteredCategoryAndTagOutput,
  SearchTagInput
> = gql`
  query searchTag($keyword: String!, $limit: Float = 40, $offset: Float = 0) {
    searchTag(input: {keyword: $keyword, limit: $limit, offset: $offset}) {
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

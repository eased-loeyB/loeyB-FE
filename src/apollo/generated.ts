import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AreaCategoryInput = {
  area: LoeybAreaType;
  category: LoeybCategoryType;
};

export type AreaCategoryTagInput = {
  area?: InputMaybe<LoeybAreaType>;
  category?: InputMaybe<LoeybCategoryType>;
  tag?: InputMaybe<Scalars['String']>;
};

export type Authentication = {
  __typename?: 'Authentication';
  /** JWT */
  accessToken: Scalars['String'];
  expiresIn: Scalars['Float'];
  /** 유저가 등록한 카테고리 존재 유무 */
  hasUserCategories?: Maybe<Scalars['Boolean']>;
  /** 유저이름 존재 유무 */
  hasUserName?: Maybe<Scalars['Boolean']>;
  /** 유저가 저장한 이미지 존재 유무 */
  hasUserRecords?: Maybe<Scalars['Boolean']>;
  /** JWT */
  refreshToken: Scalars['String'];
  tokenType: Scalars['String'];
  /** 유저 이름 */
  userName?: Maybe<Scalars['String']>;
};

/** 로그인 */
export type AuthenticationInput = {
  /** device token */
  deviceToken?: InputMaybe<Scalars['String']>;
  /** 이메일 */
  email: Scalars['String'];
  /** 비밀번호 */
  password: Scalars['String'];
};

export type AuthenticationOutput = {
  __typename?: 'AuthenticationOutput';
  data?: Maybe<Authentication>;
  /** errorMessage */
  errorMessage?: Maybe<Scalars['String']>;
  /** LOEYB ERROR CODE */
  result: LoeybErrorCode;
};

/** 저장된 사진 가져오기 */
export type FetchRegisteredRecordsInput = {
  /** area */
  area?: InputMaybe<LoeybAreaType>;
  /** category */
  category?: InputMaybe<LoeybCategoryType>;
  date?: InputMaybe<Scalars['String']>;
  /** 이메일 */
  email?: InputMaybe<Scalars['String']>;
  /** tag */
  tag?: InputMaybe<Scalars['String']>;
};

/** 이메일 인증 코드 */
export type GoogleLoginInput = {
  /** device token */
  deviceToken?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

export type ImgFileInput = {
  fileId: Scalars['String'];
  fileName: Scalars['String'];
};

/** loeyB error code */
export enum LoeybErrorCode {
  /** ALREADY_ADDED_CATEGORIES */
  AlreadyAddedCategories = 'ALREADY_ADDED_CATEGORIES',
  AlreadyRegisteredCategory = 'ALREADY_REGISTERED_CATEGORY',
  /** ALREADY_REGISTERED_IMAGE */
  AlreadyRegisteredImage = 'ALREADY_REGISTERED_IMAGE',
  /** ALREADY_REGISTERED_TAG */
  AlreadyRegisteredTag = 'ALREADY_REGISTERED_TAG',
  /** ALREADY_REGISTERED_USER */
  AlreadyRegisteredUser = 'ALREADY_REGISTERED_USER',
  CodeMismatch = 'CODE_MISMATCH',
  /** DUPLICATE_EMAIL */
  DuplicateEmail = 'DUPLICATE_EMAIL',
  /** ERROR */
  Error = 'ERROR',
  /** FILE_NOT_FOUND */
  FileNotFound = 'FILE_NOT_FOUND',
  /** HAD_NEVER_ADDED_CATEGORY */
  HadNeverAddedCategory = 'HAD_NEVER_ADDED_CATEGORY',
  /** INVALID_TOKEN */
  InvalidToken = 'INVALID_TOKEN',
  /** NO_REGISTERED_AREA_CATEGORY */
  NoRegisteredAreaCategory = 'NO_REGISTERED_AREA_CATEGORY',
  /** NO_REGISTERED_CATEGORY_TAG */
  NoRegisteredCategoryTag = 'NO_REGISTERED_CATEGORY_TAG',
  /** NO_REGISTERED_RECORD */
  NoRegisteredRecord = 'NO_REGISTERED_RECORD',
  /** NO_USER */
  NoUser = 'NO_USER',
  /** PARMETER_VALIDATION_ERROR */
  ParmeterValidationError = 'PARMETER_VALIDATION_ERROR',
  /** PASSWORD_INCORRECT */
  PasswordIncorrect = 'PASSWORD_INCORRECT',
  /** QUERY_ERROR */
  QueryError = 'QUERY_ERROR',
  /** SHARP_IMAGE_RESIZE_ERROR */
  SharpImageResizeError = 'SHARP_IMAGE_RESIZE_ERROR',
  /** SUCCESS */
  Success = 'SUCCESS',
  TokenExpired = 'TOKEN_EXPIRED',
  /** UNAUTHORIZED */
  Unauthorized = 'UNAUTHORIZED',
  /** USER_NOT_FOUND */
  UserNotFound = 'USER_NOT_FOUND'
}

export type LoeybFile = {
  __typename?: 'LOEYBFile';
  fileExtension?: Maybe<Scalars['String']>;
  fileId: Scalars['ID'];
  fileMimetype?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  /** 파일 용량 in bytes */
  fileSize?: Maybe<Scalars['Float']>;
};

/** topic */
export enum LoeybAreaType {
  /** HEALTH */
  Health = 'HEALTH',
  /** HOBBY */
  Hobby = 'HOBBY',
  /** MIND */
  Mind = 'MIND',
  /** SOCIAL */
  Social = 'SOCIAL',
  /** WORK */
  Work = 'WORK'
}

/** 유저들의 국가 */
export enum LoeybCategoryType {
  Art = 'ART',
  Award = 'AWARD',
  Books = 'BOOKS',
  Company = 'COMPANY',
  Coworker = 'COWORKER',
  Emotion = 'EMOTION',
  Exercise = 'EXERCISE',
  Family = 'FAMILY',
  Fashion = 'FASHION',
  Food = 'FOOD',
  Friends = 'FRIENDS',
  Goals = 'GOALS',
  Ideas = 'IDEAS',
  Medicine = 'MEDICINE',
  Music = 'MUSIC',
  Pets = 'PETS',
  Project = 'PROJECT',
  School = 'SCHOOL',
  Sick = 'SICK',
  Skill = 'SKILL',
  Sports = 'SPORTS',
  Thought = 'THOUGHT',
  Travel = 'TRAVEL',
  Video = 'VIDEO'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** add categories when upload img file */
  addCategoryAndArea: Output;
  /** add categories when upload img file */
  addTag: Output;
  /** 이메일 인증 요청 */
  googleLogin: AuthenticationOutput;
  /** Authorization: Bearer 토큰 갱신 */
  refresh: AuthenticationOutput;
  /** register at least 3 categories at first */
  registerCategories: Output;
  /** upload file with tag and date and location information */
  registerRecord: Output;
  /** 회원가입 */
  registerUser: AuthenticationOutput;
  /** 이메일 인증 요청 */
  requestEmailVerificationCode: RequestEmailVerificationOutput;
  /** 이메일 인증 요청 */
  setUsername: Output;
  /** updateRecord */
  updateRecord: Output;
};


export type MutationAddCategoryAndAreaArgs = {
  input: AddCategoryAndAreaInput;
};


export type MutationAddTagArgs = {
  input: AddTagInput;
};


export type MutationGoogleLoginArgs = {
  input: GoogleLoginInput;
};


export type MutationRefreshArgs = {
  input: TokenRefreshInput;
};


export type MutationRegisterCategoriesArgs = {
  input: RegisterCategoriesInput;
};


export type MutationRegisterRecordArgs = {
  input: RegisterRecordInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationRequestEmailVerificationCodeArgs = {
  input: RequestEmailVerificationCodeInput;
};


export type MutationSetUsernameArgs = {
  input: SetUsernameInput;
};


export type MutationUpdateRecordArgs = {
  input: UpdateRecordInput;
};

/** Default Output */
export type Output = {
  __typename?: 'Output';
  /** errorMessage */
  errorMessage?: Maybe<Scalars['String']>;
  /** LOEYB ERROR CODE */
  result: LoeybErrorCode;
};

export type Query = {
  __typename?: 'Query';
  /** 로그인 */
  authenticate: AuthenticationOutput;
  /** fetchRegisteredAreaAndCategoryAndTag */
  fetchRegisteredAreaAndCategoryAndTag: RegisteredAreaAndCategoryAndTagOutput;
  /** fetchRegisteredCategoryAndTag */
  fetchRegisteredCategoryAndTag: RegisteredCategoryAndTagsOutput;
  /** fetchRegisteredRecords */
  fetchRegisteredRecords: StardustRecordsOutput;
  /** fetchTagRatio */
  fetchTagRatio: AreaTagRatiosOutput;
  sayHello: Scalars['String'];
  /** searchTag */
  searchTag: RegisteredCategoryAndTagOutput;
  /** 이메일 인증 확인 */
  verifyEmailVerificationCode: Output;
};


export type QueryAuthenticateArgs = {
  input: AuthenticationInput;
};


export type QueryFetchRegisteredAreaAndCategoryAndTagArgs = {
  input: FetchRegisteredAreaAndCategoryAndTagInput;
};


export type QueryFetchRegisteredCategoryAndTagArgs = {
  input: FetchRegisteredCategoryAndTag;
};


export type QueryFetchRegisteredRecordsArgs = {
  input: FetchRegisteredRecordsInput;
};


export type QueryFetchTagRatioArgs = {
  input: FetchTagRatioInput;
};


export type QuerySearchTagArgs = {
  input: SearchTagInput;
};


export type QueryVerifyEmailVerificationCodeArgs = {
  input: VerifyEmailVerificationCodeInput;
};

/** registerCategories */
export type RegisterCategoriesInput = {
  /** category */
  areaCategory: Array<AreaCategoryInput>;
};

export type RegisterRecordInput = {
  areaCategoryTag: Array<AreaCategoryTagInput>;
  date: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  imgFiles?: InputMaybe<ImgFileInput>;
  importance?: InputMaybe<Scalars['Float']>;
  location: Scalars['String'];
};

export type RegisterUSer = {
  __typename?: 'RegisterUSer';
  /** JWT */
  accessToken: Scalars['String'];
  expiresIn: Scalars['Float'];
  /** JWT */
  refreshToken: Scalars['String'];
  tokenType: Scalars['String'];
};

/** 회원가입 */
export type RegisterUserInput = {
  /** device token */
  deviceToken?: InputMaybe<Scalars['String']>;
  /** 이메일 */
  email: Scalars['String'];
  /** 비밀번호 */
  password: Scalars['String'];
};

export type RegisteredAreaAndCategoryAndTag = {
  __typename?: 'RegisteredAreaAndCategoryAndTag';
  area?: Maybe<LoeybAreaType>;
  category?: Maybe<LoeybCategoryType>;
  tag?: Maybe<Array<Scalars['String']>>;
};

export type RegisteredAreaAndCategoryAndTagOutput = {
  __typename?: 'RegisteredAreaAndCategoryAndTagOutput';
  data?: Maybe<Array<RegisteredAreaAndCategoryAndTag>>;
  /** errorMessage */
  errorMessage?: Maybe<Scalars['String']>;
  /** LOEYB ERROR CODE */
  result: LoeybErrorCode;
};

export type RegisteredCategoryAndTag = {
  __typename?: 'RegisteredCategoryAndTag';
  category?: Maybe<Scalars['String']>;
  tag?: Maybe<Scalars['String']>;
};

export type RegisteredCategoryAndTagOutput = {
  __typename?: 'RegisteredCategoryAndTagOutput';
  data?: Maybe<RegisteredCategoryAndTag>;
  /** errorMessage */
  errorMessage?: Maybe<Scalars['String']>;
  /** LOEYB ERROR CODE */
  result: LoeybErrorCode;
};

export type RegisteredCategoryAndTagsOutput = {
  __typename?: 'RegisteredCategoryAndTagsOutput';
  data?: Maybe<Array<RegisteredCategoryAndTag>>;
  /** errorMessage */
  errorMessage?: Maybe<Scalars['String']>;
  /** LOEYB ERROR CODE */
  result: LoeybErrorCode;
};

export type RegisteredNameAreaAndCategory = {
  __typename?: 'RegisteredNameAreaAndCategory';
  area?: Maybe<LoeybAreaType>;
  category?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type RequestEmailVerification = {
  __typename?: 'RequestEmailVerification';
  /** JWT */
  code: Scalars['String'];
};

/** 이메일 인증 코드 */
export type RequestEmailVerificationCodeInput = {
  /** 이메일 */
  email: Scalars['String'];
};

export type RequestEmailVerificationOutput = {
  __typename?: 'RequestEmailVerificationOutput';
  data?: Maybe<RequestEmailVerification>;
  /** errorMessage */
  errorMessage?: Maybe<Scalars['String']>;
  /** LOEYB ERROR CODE */
  result: LoeybErrorCode;
};

export type SearchTagInput = {
  keyword: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};

/** 이메일 인증 코드 */
export type SetUsernameInput = {
  username: Scalars['String'];
};

export type StardustRecords = {
  __typename?: 'StardustRecords';
  area?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  /** description */
  description?: Maybe<Scalars['String']>;
  fileId?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  /** 중요도 */
  importance?: Maybe<Scalars['Float']>;
  location?: Maybe<Scalars['String']>;
  recordId?: Maybe<Scalars['String']>;
  tag?: Maybe<Scalars['String']>;
};

export type StardustRecordsOutput = {
  __typename?: 'StardustRecordsOutput';
  data?: Maybe<Array<StardustRecords>>;
  /** errorMessage */
  errorMessage?: Maybe<Scalars['String']>;
  /** LOEYB ERROR CODE */
  result: LoeybErrorCode;
};

/** 토큰 갱신 */
export type TokenRefreshInput = {
  /** refresh 토큰 */
  refreshToken: Scalars['String'];
};

export type UpdateRecordInput = {
  areaCategoryTag?: InputMaybe<Array<AreaCategoryTagInput>>;
  date?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  imgFiles?: InputMaybe<ImgFileInput>;
  importance?: InputMaybe<Scalars['Float']>;
  location?: InputMaybe<Scalars['String']>;
  recordId?: InputMaybe<Scalars['String']>;
};

/** 이메일 인증 */
export type VerifyEmailVerificationCodeInput = {
  /** 인증번호 */
  code: Scalars['String'];
  /** 이메일 */
  email: Scalars['String'];
};

/** addCategoryAndArea */
export type AddCategoryAndAreaInput = {
  /** area */
  area: LoeybAreaType;
  /** category */
  category: LoeybCategoryType;
};

/** addTagInput */
export type AddTagInput = {
  /** category */
  category: LoeybCategoryType;
  /** area */
  tag: Scalars['String'];
};

export type AreaTagRatio = {
  __typename?: 'areaTagRatio';
  area?: Maybe<LoeybAreaType>;
  categoryRatio?: Maybe<Array<TagRatio>>;
};

export type AreaTagRatiosOutput = {
  __typename?: 'areaTagRatiosOutput';
  data?: Maybe<Array<AreaTagRatio>>;
  /** errorMessage */
  errorMessage?: Maybe<Scalars['String']>;
  /** LOEYB ERROR CODE */
  result: LoeybErrorCode;
};

/** show registered area, category, tag */
export type FetchRegisteredAreaAndCategoryAndTagInput = {
  limit?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['String']>;
};

/** show registered area, category, tag */
export type FetchRegisteredCategoryAndTag = {
  limit?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['String']>;
};

/** show tag ratio of given date condition */
export type FetchTagRatioInput = {
  date?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['String']>;
};

export type TagRatio = {
  __typename?: 'tagRatio';
  ratio?: Maybe<Scalars['Float']>;
  tag?: Maybe<Scalars['String']>;
};

export type RefreshMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshMutation = { __typename?: 'Mutation', refresh: { __typename?: 'AuthenticationOutput', result: LoeybErrorCode, errorMessage?: string | null, data?: { __typename?: 'Authentication', accessToken: string, tokenType: string, expiresIn: number, refreshToken: string, userName?: string | null } | null } };

export type RequestEmailVerificationCodeMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type RequestEmailVerificationCodeMutation = { __typename?: 'Mutation', requestEmailVerificationCode: { __typename?: 'RequestEmailVerificationOutput', result: LoeybErrorCode, errorMessage?: string | null, data?: { __typename?: 'RequestEmailVerification', code: string } | null } };

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  deviceToken?: InputMaybe<Scalars['String']>;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'AuthenticationOutput', result: LoeybErrorCode, errorMessage?: string | null, data?: { __typename?: 'Authentication', accessToken: string, tokenType: string, expiresIn: number, refreshToken: string, userName?: string | null } | null } };

export type SetUsernameMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type SetUsernameMutation = { __typename?: 'Mutation', setUsername: { __typename?: 'Output', result: LoeybErrorCode, errorMessage?: string | null } };

export type GoogleLoginMutationVariables = Exact<{
  token: Scalars['String'];
  deviceToken?: InputMaybe<Scalars['String']>;
}>;


export type GoogleLoginMutation = { __typename?: 'Mutation', googleLogin: { __typename?: 'AuthenticationOutput', result: LoeybErrorCode, errorMessage?: string | null, data?: { __typename?: 'Authentication', accessToken: string, tokenType: string, expiresIn: number, refreshToken: string, userName?: string | null } | null } };

export type RegisterCategoriesMutationVariables = Exact<{
  areaCategory: Array<AreaCategoryInput> | AreaCategoryInput;
}>;


export type RegisterCategoriesMutation = { __typename?: 'Mutation', registerCategories: { __typename?: 'Output', result: LoeybErrorCode, errorMessage?: string | null } };

export type RegisterRecordMutationVariables = Exact<{
  imgFiles?: InputMaybe<ImgFileInput>;
  areaCategoryTag: Array<AreaCategoryTagInput> | AreaCategoryTagInput;
  date: Scalars['String'];
  location: Scalars['String'];
  importance?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
}>;


export type RegisterRecordMutation = { __typename?: 'Mutation', registerRecord: { __typename?: 'Output', result: LoeybErrorCode, errorMessage?: string | null } };

export type UpdateRecordMutationVariables = Exact<{
  recordId?: InputMaybe<Scalars['String']>;
  imgFiles?: InputMaybe<ImgFileInput>;
  areaCategoryTag?: InputMaybe<Array<AreaCategoryTagInput> | AreaCategoryTagInput>;
  date?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  importance?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
}>;


export type UpdateRecordMutation = { __typename?: 'Mutation', updateRecord: { __typename?: 'Output', result: LoeybErrorCode, errorMessage?: string | null } };

export type AddCategoryAndAreaMutationVariables = Exact<{
  category: LoeybCategoryType;
  area: LoeybAreaType;
}>;


export type AddCategoryAndAreaMutation = { __typename?: 'Mutation', addCategoryAndArea: { __typename?: 'Output', result: LoeybErrorCode, errorMessage?: string | null } };

export type AddTagMutationVariables = Exact<{
  category: LoeybCategoryType;
  tag: Scalars['String'];
}>;


export type AddTagMutation = { __typename?: 'Mutation', addTag: { __typename?: 'Output', result: LoeybErrorCode, errorMessage?: string | null } };

export type AuthenticateQueryVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  deviceToken?: InputMaybe<Scalars['String']>;
}>;


export type AuthenticateQuery = { __typename?: 'Query', authenticate: { __typename?: 'AuthenticationOutput', errorMessage?: string | null, result: LoeybErrorCode, data?: { __typename?: 'Authentication', accessToken: string, tokenType: string, expiresIn: number, refreshToken: string, userName?: string | null } | null } };

export type VerifyEmailVerificationCodeQueryVariables = Exact<{
  email: Scalars['String'];
  code: Scalars['String'];
}>;


export type VerifyEmailVerificationCodeQuery = { __typename?: 'Query', verifyEmailVerificationCode: { __typename?: 'Output', errorMessage?: string | null, result: LoeybErrorCode } };

export type FetchRegisteredCategoryAndTagQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['String']>;
}>;


export type FetchRegisteredCategoryAndTagQuery = { __typename?: 'Query', fetchRegisteredCategoryAndTag: { __typename?: 'RegisteredCategoryAndTagsOutput', errorMessage?: string | null, result: LoeybErrorCode, data?: Array<{ __typename?: 'RegisteredCategoryAndTag', category?: string | null, tag?: string | null }> | null } };

export type FetchRegisteredAreaAndCategoryAndTagQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['String']>;
}>;


export type FetchRegisteredAreaAndCategoryAndTagQuery = { __typename?: 'Query', fetchRegisteredAreaAndCategoryAndTag: { __typename?: 'RegisteredAreaAndCategoryAndTagOutput', errorMessage?: string | null, result: LoeybErrorCode, data?: Array<{ __typename?: 'RegisteredAreaAndCategoryAndTag', area?: LoeybAreaType | null, category?: LoeybCategoryType | null, tag?: Array<string> | null }> | null } };

export type FetchRegisteredRecordsQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  area?: InputMaybe<LoeybAreaType>;
  category?: InputMaybe<LoeybCategoryType>;
  tag?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
}>;


export type FetchRegisteredRecordsQuery = { __typename?: 'Query', fetchRegisteredRecords: { __typename?: 'StardustRecordsOutput', errorMessage?: string | null, result: LoeybErrorCode, data?: Array<{ __typename?: 'StardustRecords', area?: string | null, category?: string | null, date?: string | null, description?: string | null, fileId?: string | null, fileName?: string | null, importance?: number | null, location?: string | null, recordId?: string | null, tag?: string | null }> | null } };

export type FetchTagRatioQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
}>;


export type FetchTagRatioQuery = { __typename?: 'Query', fetchTagRatio: { __typename?: 'areaTagRatiosOutput', errorMessage?: string | null, result: LoeybErrorCode, data?: Array<{ __typename?: 'areaTagRatio', area?: LoeybAreaType | null, categoryRatio?: Array<{ __typename?: 'tagRatio', tag?: string | null, ratio?: number | null }> | null }> | null } };

export type SearchTagQueryVariables = Exact<{
  keyword: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
}>;


export type SearchTagQuery = { __typename?: 'Query', searchTag: { __typename?: 'RegisteredCategoryAndTagOutput', errorMessage?: string | null, result: LoeybErrorCode, data?: { __typename?: 'RegisteredCategoryAndTag', category?: string | null, tag?: string | null } | null } };


export const RefreshDocument = gql`
    mutation refresh($refreshToken: String!) {
  refresh(input: {refreshToken: $refreshToken}) {
    result
    errorMessage
    data {
      accessToken
      tokenType
      expiresIn
      refreshToken
      userName
    }
  }
}
    `;
export type RefreshMutationFn = Apollo.MutationFunction<RefreshMutation, RefreshMutationVariables>;

/**
 * __useRefreshMutation__
 *
 * To run a mutation, you first call `useRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshMutation, { data, loading, error }] = useRefreshMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshMutation(baseOptions?: Apollo.MutationHookOptions<RefreshMutation, RefreshMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument, options);
      }
export type RefreshMutationHookResult = ReturnType<typeof useRefreshMutation>;
export type RefreshMutationResult = Apollo.MutationResult<RefreshMutation>;
export type RefreshMutationOptions = Apollo.BaseMutationOptions<RefreshMutation, RefreshMutationVariables>;
export const RequestEmailVerificationCodeDocument = gql`
    mutation requestEmailVerificationCode($email: String!) {
  requestEmailVerificationCode(input: {email: $email}) {
    result
    errorMessage
    data {
      code
    }
  }
}
    `;
export type RequestEmailVerificationCodeMutationFn = Apollo.MutationFunction<RequestEmailVerificationCodeMutation, RequestEmailVerificationCodeMutationVariables>;

/**
 * __useRequestEmailVerificationCodeMutation__
 *
 * To run a mutation, you first call `useRequestEmailVerificationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestEmailVerificationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestEmailVerificationCodeMutation, { data, loading, error }] = useRequestEmailVerificationCodeMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRequestEmailVerificationCodeMutation(baseOptions?: Apollo.MutationHookOptions<RequestEmailVerificationCodeMutation, RequestEmailVerificationCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestEmailVerificationCodeMutation, RequestEmailVerificationCodeMutationVariables>(RequestEmailVerificationCodeDocument, options);
      }
export type RequestEmailVerificationCodeMutationHookResult = ReturnType<typeof useRequestEmailVerificationCodeMutation>;
export type RequestEmailVerificationCodeMutationResult = Apollo.MutationResult<RequestEmailVerificationCodeMutation>;
export type RequestEmailVerificationCodeMutationOptions = Apollo.BaseMutationOptions<RequestEmailVerificationCodeMutation, RequestEmailVerificationCodeMutationVariables>;
export const RegisterUserDocument = gql`
    mutation registerUser($email: String!, $password: String!, $deviceToken: String) {
  registerUser(
    input: {email: $email, password: $password, deviceToken: $deviceToken}
  ) {
    result
    errorMessage
    data {
      accessToken
      tokenType
      expiresIn
      refreshToken
      userName
    }
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      deviceToken: // value for 'deviceToken'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const SetUsernameDocument = gql`
    mutation setUsername($username: String!) {
  setUsername(input: {username: $username}) {
    result
    errorMessage
  }
}
    `;
export type SetUsernameMutationFn = Apollo.MutationFunction<SetUsernameMutation, SetUsernameMutationVariables>;

/**
 * __useSetUsernameMutation__
 *
 * To run a mutation, you first call `useSetUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUsernameMutation, { data, loading, error }] = useSetUsernameMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSetUsernameMutation(baseOptions?: Apollo.MutationHookOptions<SetUsernameMutation, SetUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUsernameMutation, SetUsernameMutationVariables>(SetUsernameDocument, options);
      }
export type SetUsernameMutationHookResult = ReturnType<typeof useSetUsernameMutation>;
export type SetUsernameMutationResult = Apollo.MutationResult<SetUsernameMutation>;
export type SetUsernameMutationOptions = Apollo.BaseMutationOptions<SetUsernameMutation, SetUsernameMutationVariables>;
export const GoogleLoginDocument = gql`
    mutation googleLogin($token: String!, $deviceToken: String) {
  googleLogin(input: {token: $token, deviceToken: $deviceToken}) {
    result
    errorMessage
    data {
      accessToken
      tokenType
      expiresIn
      refreshToken
      userName
    }
  }
}
    `;
export type GoogleLoginMutationFn = Apollo.MutationFunction<GoogleLoginMutation, GoogleLoginMutationVariables>;

/**
 * __useGoogleLoginMutation__
 *
 * To run a mutation, you first call `useGoogleLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleLoginMutation, { data, loading, error }] = useGoogleLoginMutation({
 *   variables: {
 *      token: // value for 'token'
 *      deviceToken: // value for 'deviceToken'
 *   },
 * });
 */
export function useGoogleLoginMutation(baseOptions?: Apollo.MutationHookOptions<GoogleLoginMutation, GoogleLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoogleLoginMutation, GoogleLoginMutationVariables>(GoogleLoginDocument, options);
      }
export type GoogleLoginMutationHookResult = ReturnType<typeof useGoogleLoginMutation>;
export type GoogleLoginMutationResult = Apollo.MutationResult<GoogleLoginMutation>;
export type GoogleLoginMutationOptions = Apollo.BaseMutationOptions<GoogleLoginMutation, GoogleLoginMutationVariables>;
export const RegisterCategoriesDocument = gql`
    mutation registerCategories($areaCategory: [AreaCategoryInput!]!) {
  registerCategories(input: {areaCategory: $areaCategory}) {
    result
    errorMessage
  }
}
    `;
export type RegisterCategoriesMutationFn = Apollo.MutationFunction<RegisterCategoriesMutation, RegisterCategoriesMutationVariables>;

/**
 * __useRegisterCategoriesMutation__
 *
 * To run a mutation, you first call `useRegisterCategoriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterCategoriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerCategoriesMutation, { data, loading, error }] = useRegisterCategoriesMutation({
 *   variables: {
 *      areaCategory: // value for 'areaCategory'
 *   },
 * });
 */
export function useRegisterCategoriesMutation(baseOptions?: Apollo.MutationHookOptions<RegisterCategoriesMutation, RegisterCategoriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterCategoriesMutation, RegisterCategoriesMutationVariables>(RegisterCategoriesDocument, options);
      }
export type RegisterCategoriesMutationHookResult = ReturnType<typeof useRegisterCategoriesMutation>;
export type RegisterCategoriesMutationResult = Apollo.MutationResult<RegisterCategoriesMutation>;
export type RegisterCategoriesMutationOptions = Apollo.BaseMutationOptions<RegisterCategoriesMutation, RegisterCategoriesMutationVariables>;
export const RegisterRecordDocument = gql`
    mutation registerRecord($imgFiles: ImgFileInput, $areaCategoryTag: [AreaCategoryTagInput!]!, $date: String!, $location: String!, $importance: Float, $description: String) {
  registerRecord(
    input: {imgFiles: $imgFiles, areaCategoryTag: $areaCategoryTag, date: $date, location: $location, importance: $importance, description: $description}
  ) {
    result
    errorMessage
  }
}
    `;
export type RegisterRecordMutationFn = Apollo.MutationFunction<RegisterRecordMutation, RegisterRecordMutationVariables>;

/**
 * __useRegisterRecordMutation__
 *
 * To run a mutation, you first call `useRegisterRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerRecordMutation, { data, loading, error }] = useRegisterRecordMutation({
 *   variables: {
 *      imgFiles: // value for 'imgFiles'
 *      areaCategoryTag: // value for 'areaCategoryTag'
 *      date: // value for 'date'
 *      location: // value for 'location'
 *      importance: // value for 'importance'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useRegisterRecordMutation(baseOptions?: Apollo.MutationHookOptions<RegisterRecordMutation, RegisterRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterRecordMutation, RegisterRecordMutationVariables>(RegisterRecordDocument, options);
      }
export type RegisterRecordMutationHookResult = ReturnType<typeof useRegisterRecordMutation>;
export type RegisterRecordMutationResult = Apollo.MutationResult<RegisterRecordMutation>;
export type RegisterRecordMutationOptions = Apollo.BaseMutationOptions<RegisterRecordMutation, RegisterRecordMutationVariables>;
export const UpdateRecordDocument = gql`
    mutation updateRecord($recordId: String, $imgFiles: ImgFileInput, $areaCategoryTag: [AreaCategoryTagInput!], $date: String, $location: String, $importance: Float, $description: String) {
  updateRecord(
    input: {recordId: $recordId, imgFiles: $imgFiles, areaCategoryTag: $areaCategoryTag, date: $date, location: $location, importance: $importance, description: $description}
  ) {
    result
    errorMessage
  }
}
    `;
export type UpdateRecordMutationFn = Apollo.MutationFunction<UpdateRecordMutation, UpdateRecordMutationVariables>;

/**
 * __useUpdateRecordMutation__
 *
 * To run a mutation, you first call `useUpdateRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecordMutation, { data, loading, error }] = useUpdateRecordMutation({
 *   variables: {
 *      recordId: // value for 'recordId'
 *      imgFiles: // value for 'imgFiles'
 *      areaCategoryTag: // value for 'areaCategoryTag'
 *      date: // value for 'date'
 *      location: // value for 'location'
 *      importance: // value for 'importance'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateRecordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRecordMutation, UpdateRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRecordMutation, UpdateRecordMutationVariables>(UpdateRecordDocument, options);
      }
export type UpdateRecordMutationHookResult = ReturnType<typeof useUpdateRecordMutation>;
export type UpdateRecordMutationResult = Apollo.MutationResult<UpdateRecordMutation>;
export type UpdateRecordMutationOptions = Apollo.BaseMutationOptions<UpdateRecordMutation, UpdateRecordMutationVariables>;
export const AddCategoryAndAreaDocument = gql`
    mutation addCategoryAndArea($category: LoeybCategoryType!, $area: LoeybAreaType!) {
  addCategoryAndArea(input: {category: $category, area: $area}) {
    result
    errorMessage
  }
}
    `;
export type AddCategoryAndAreaMutationFn = Apollo.MutationFunction<AddCategoryAndAreaMutation, AddCategoryAndAreaMutationVariables>;

/**
 * __useAddCategoryAndAreaMutation__
 *
 * To run a mutation, you first call `useAddCategoryAndAreaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryAndAreaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryAndAreaMutation, { data, loading, error }] = useAddCategoryAndAreaMutation({
 *   variables: {
 *      category: // value for 'category'
 *      area: // value for 'area'
 *   },
 * });
 */
export function useAddCategoryAndAreaMutation(baseOptions?: Apollo.MutationHookOptions<AddCategoryAndAreaMutation, AddCategoryAndAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCategoryAndAreaMutation, AddCategoryAndAreaMutationVariables>(AddCategoryAndAreaDocument, options);
      }
export type AddCategoryAndAreaMutationHookResult = ReturnType<typeof useAddCategoryAndAreaMutation>;
export type AddCategoryAndAreaMutationResult = Apollo.MutationResult<AddCategoryAndAreaMutation>;
export type AddCategoryAndAreaMutationOptions = Apollo.BaseMutationOptions<AddCategoryAndAreaMutation, AddCategoryAndAreaMutationVariables>;
export const AddTagDocument = gql`
    mutation addTag($category: LoeybCategoryType!, $tag: String!) {
  addTag(input: {category: $category, tag: $tag}) {
    result
    errorMessage
  }
}
    `;
export type AddTagMutationFn = Apollo.MutationFunction<AddTagMutation, AddTagMutationVariables>;

/**
 * __useAddTagMutation__
 *
 * To run a mutation, you first call `useAddTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagMutation, { data, loading, error }] = useAddTagMutation({
 *   variables: {
 *      category: // value for 'category'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useAddTagMutation(baseOptions?: Apollo.MutationHookOptions<AddTagMutation, AddTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTagMutation, AddTagMutationVariables>(AddTagDocument, options);
      }
export type AddTagMutationHookResult = ReturnType<typeof useAddTagMutation>;
export type AddTagMutationResult = Apollo.MutationResult<AddTagMutation>;
export type AddTagMutationOptions = Apollo.BaseMutationOptions<AddTagMutation, AddTagMutationVariables>;
export const AuthenticateDocument = gql`
    query authenticate($email: String!, $password: String!, $deviceToken: String) {
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
      userName
    }
  }
}
    `;

/**
 * __useAuthenticateQuery__
 *
 * To run a query within a React component, call `useAuthenticateQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthenticateQuery({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      deviceToken: // value for 'deviceToken'
 *   },
 * });
 */
export function useAuthenticateQuery(baseOptions: Apollo.QueryHookOptions<AuthenticateQuery, AuthenticateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthenticateQuery, AuthenticateQueryVariables>(AuthenticateDocument, options);
      }
export function useAuthenticateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthenticateQuery, AuthenticateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthenticateQuery, AuthenticateQueryVariables>(AuthenticateDocument, options);
        }
export type AuthenticateQueryHookResult = ReturnType<typeof useAuthenticateQuery>;
export type AuthenticateLazyQueryHookResult = ReturnType<typeof useAuthenticateLazyQuery>;
export type AuthenticateQueryResult = Apollo.QueryResult<AuthenticateQuery, AuthenticateQueryVariables>;
export const VerifyEmailVerificationCodeDocument = gql`
    query verifyEmailVerificationCode($email: String!, $code: String!) {
  verifyEmailVerificationCode(input: {email: $email, code: $code}) {
    errorMessage
    result
  }
}
    `;

/**
 * __useVerifyEmailVerificationCodeQuery__
 *
 * To run a query within a React component, call `useVerifyEmailVerificationCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailVerificationCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyEmailVerificationCodeQuery({
 *   variables: {
 *      email: // value for 'email'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useVerifyEmailVerificationCodeQuery(baseOptions: Apollo.QueryHookOptions<VerifyEmailVerificationCodeQuery, VerifyEmailVerificationCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyEmailVerificationCodeQuery, VerifyEmailVerificationCodeQueryVariables>(VerifyEmailVerificationCodeDocument, options);
      }
export function useVerifyEmailVerificationCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyEmailVerificationCodeQuery, VerifyEmailVerificationCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyEmailVerificationCodeQuery, VerifyEmailVerificationCodeQueryVariables>(VerifyEmailVerificationCodeDocument, options);
        }
export type VerifyEmailVerificationCodeQueryHookResult = ReturnType<typeof useVerifyEmailVerificationCodeQuery>;
export type VerifyEmailVerificationCodeLazyQueryHookResult = ReturnType<typeof useVerifyEmailVerificationCodeLazyQuery>;
export type VerifyEmailVerificationCodeQueryResult = Apollo.QueryResult<VerifyEmailVerificationCodeQuery, VerifyEmailVerificationCodeQueryVariables>;
export const FetchRegisteredCategoryAndTagDocument = gql`
    query fetchRegisteredCategoryAndTag($limit: String = "40", $offset: String = "0") {
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

/**
 * __useFetchRegisteredCategoryAndTagQuery__
 *
 * To run a query within a React component, call `useFetchRegisteredCategoryAndTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchRegisteredCategoryAndTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchRegisteredCategoryAndTagQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFetchRegisteredCategoryAndTagQuery(baseOptions?: Apollo.QueryHookOptions<FetchRegisteredCategoryAndTagQuery, FetchRegisteredCategoryAndTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchRegisteredCategoryAndTagQuery, FetchRegisteredCategoryAndTagQueryVariables>(FetchRegisteredCategoryAndTagDocument, options);
      }
export function useFetchRegisteredCategoryAndTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchRegisteredCategoryAndTagQuery, FetchRegisteredCategoryAndTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchRegisteredCategoryAndTagQuery, FetchRegisteredCategoryAndTagQueryVariables>(FetchRegisteredCategoryAndTagDocument, options);
        }
export type FetchRegisteredCategoryAndTagQueryHookResult = ReturnType<typeof useFetchRegisteredCategoryAndTagQuery>;
export type FetchRegisteredCategoryAndTagLazyQueryHookResult = ReturnType<typeof useFetchRegisteredCategoryAndTagLazyQuery>;
export type FetchRegisteredCategoryAndTagQueryResult = Apollo.QueryResult<FetchRegisteredCategoryAndTagQuery, FetchRegisteredCategoryAndTagQueryVariables>;
export const FetchRegisteredAreaAndCategoryAndTagDocument = gql`
    query fetchRegisteredAreaAndCategoryAndTag($limit: String = "40", $offset: String = "0") {
  fetchRegisteredAreaAndCategoryAndTag(input: {limit: $limit, offset: $offset}) {
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

/**
 * __useFetchRegisteredAreaAndCategoryAndTagQuery__
 *
 * To run a query within a React component, call `useFetchRegisteredAreaAndCategoryAndTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchRegisteredAreaAndCategoryAndTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchRegisteredAreaAndCategoryAndTagQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFetchRegisteredAreaAndCategoryAndTagQuery(baseOptions?: Apollo.QueryHookOptions<FetchRegisteredAreaAndCategoryAndTagQuery, FetchRegisteredAreaAndCategoryAndTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchRegisteredAreaAndCategoryAndTagQuery, FetchRegisteredAreaAndCategoryAndTagQueryVariables>(FetchRegisteredAreaAndCategoryAndTagDocument, options);
      }
export function useFetchRegisteredAreaAndCategoryAndTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchRegisteredAreaAndCategoryAndTagQuery, FetchRegisteredAreaAndCategoryAndTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchRegisteredAreaAndCategoryAndTagQuery, FetchRegisteredAreaAndCategoryAndTagQueryVariables>(FetchRegisteredAreaAndCategoryAndTagDocument, options);
        }
export type FetchRegisteredAreaAndCategoryAndTagQueryHookResult = ReturnType<typeof useFetchRegisteredAreaAndCategoryAndTagQuery>;
export type FetchRegisteredAreaAndCategoryAndTagLazyQueryHookResult = ReturnType<typeof useFetchRegisteredAreaAndCategoryAndTagLazyQuery>;
export type FetchRegisteredAreaAndCategoryAndTagQueryResult = Apollo.QueryResult<FetchRegisteredAreaAndCategoryAndTagQuery, FetchRegisteredAreaAndCategoryAndTagQueryVariables>;
export const FetchRegisteredRecordsDocument = gql`
    query fetchRegisteredRecords($email: String, $area: LoeybAreaType, $category: LoeybCategoryType, $tag: String, $date: String) {
  fetchRegisteredRecords(
    input: {email: $email, area: $area, category: $category, tag: $tag, date: $date}
  ) {
    errorMessage
    result
    data {
      area
      category
      date
      description
      fileId
      fileName
      importance
      location
      recordId
      tag
    }
  }
}
    `;

/**
 * __useFetchRegisteredRecordsQuery__
 *
 * To run a query within a React component, call `useFetchRegisteredRecordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchRegisteredRecordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchRegisteredRecordsQuery({
 *   variables: {
 *      email: // value for 'email'
 *      area: // value for 'area'
 *      category: // value for 'category'
 *      tag: // value for 'tag'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useFetchRegisteredRecordsQuery(baseOptions?: Apollo.QueryHookOptions<FetchRegisteredRecordsQuery, FetchRegisteredRecordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchRegisteredRecordsQuery, FetchRegisteredRecordsQueryVariables>(FetchRegisteredRecordsDocument, options);
      }
export function useFetchRegisteredRecordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchRegisteredRecordsQuery, FetchRegisteredRecordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchRegisteredRecordsQuery, FetchRegisteredRecordsQueryVariables>(FetchRegisteredRecordsDocument, options);
        }
export type FetchRegisteredRecordsQueryHookResult = ReturnType<typeof useFetchRegisteredRecordsQuery>;
export type FetchRegisteredRecordsLazyQueryHookResult = ReturnType<typeof useFetchRegisteredRecordsLazyQuery>;
export type FetchRegisteredRecordsQueryResult = Apollo.QueryResult<FetchRegisteredRecordsQuery, FetchRegisteredRecordsQueryVariables>;
export const FetchTagRatioDocument = gql`
    query fetchTagRatio($limit: String = "40", $offset: String = "0", $date: String) {
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

/**
 * __useFetchTagRatioQuery__
 *
 * To run a query within a React component, call `useFetchTagRatioQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchTagRatioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchTagRatioQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useFetchTagRatioQuery(baseOptions?: Apollo.QueryHookOptions<FetchTagRatioQuery, FetchTagRatioQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchTagRatioQuery, FetchTagRatioQueryVariables>(FetchTagRatioDocument, options);
      }
export function useFetchTagRatioLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchTagRatioQuery, FetchTagRatioQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchTagRatioQuery, FetchTagRatioQueryVariables>(FetchTagRatioDocument, options);
        }
export type FetchTagRatioQueryHookResult = ReturnType<typeof useFetchTagRatioQuery>;
export type FetchTagRatioLazyQueryHookResult = ReturnType<typeof useFetchTagRatioLazyQuery>;
export type FetchTagRatioQueryResult = Apollo.QueryResult<FetchTagRatioQuery, FetchTagRatioQueryVariables>;
export const SearchTagDocument = gql`
    query searchTag($keyword: String!, $limit: Float = 40, $offset: Float = 0) {
  searchTag(input: {keyword: $keyword, limit: $limit, offset: $offset}) {
    errorMessage
    result
    data {
      category
      tag
    }
  }
}
    `;

/**
 * __useSearchTagQuery__
 *
 * To run a query within a React component, call `useSearchTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchTagQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSearchTagQuery(baseOptions: Apollo.QueryHookOptions<SearchTagQuery, SearchTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchTagQuery, SearchTagQueryVariables>(SearchTagDocument, options);
      }
export function useSearchTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTagQuery, SearchTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchTagQuery, SearchTagQueryVariables>(SearchTagDocument, options);
        }
export type SearchTagQueryHookResult = ReturnType<typeof useSearchTagQuery>;
export type SearchTagLazyQueryHookResult = ReturnType<typeof useSearchTagLazyQuery>;
export type SearchTagQueryResult = Apollo.QueryResult<SearchTagQuery, SearchTagQueryVariables>;
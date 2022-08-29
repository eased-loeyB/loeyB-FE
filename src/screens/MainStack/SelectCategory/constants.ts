import {LoeybAreaType, LoeybCategoryType} from '~/apollo/generated';
import {
  ART,
  AWARDS,
  BOOK,
  COMPANY,
  COWORKER,
  EMOTION,
  EXERCISE,
  FAMILY,
  FASHION,
  FOOD,
  FRIENDS,
  GOALS,
  IDEAS,
  MUSIC,
  PET,
  PROJECT,
  SCHOOL,
  SICK,
  SKILLS,
  SPORT,
  THOUGHT,
} from '~/assets';

import {SubCategoryProps} from './Category/CategoryItem';

export const healthTitle = LoeybAreaType.Health;
export const healthCategory: SubCategoryProps[] = [
  {
    title: LoeybCategoryType.Food,
    image: FOOD,
  },
  {
    title: LoeybCategoryType.Exercise,
    image: EXERCISE,
  },
  {
    title: LoeybCategoryType.Sick,
    image: SICK,
  },
];

export const mindTitle = LoeybAreaType.Mind;
export const mindCategory: SubCategoryProps[] = [
  {
    title: LoeybCategoryType.Thought,
    image: THOUGHT,
  },
  {
    title: LoeybCategoryType.Emotion,
    image: EMOTION,
  },
  {
    title: LoeybCategoryType.Goals,
    image: GOALS,
  },
  {
    title: LoeybCategoryType.Ideas,
    image: IDEAS,
  },
];

export const socialTitle = LoeybAreaType.Social;
export const socialCategory: SubCategoryProps[] = [
  {
    title: LoeybCategoryType.Friends,
    image: FRIENDS,
  },
  {
    title: LoeybCategoryType.Family,
    image: FAMILY,
  },
  {
    title: LoeybCategoryType.Pets,
    image: PET,
  },
  {
    title: LoeybCategoryType.Coworker,
    image: COWORKER,
  },
];

export const lifeTitle = LoeybAreaType.Hobby;
export const lifeCategory: SubCategoryProps[] = [
  {
    title: LoeybCategoryType.Fashion,
    image: FASHION,
  },
  {
    title: LoeybCategoryType.Music,
    image: MUSIC,
  },
  {
    title: LoeybCategoryType.Art,
    image: ART,
  },
  {
    title: LoeybCategoryType.Books,
    image: BOOK,
  },
  {
    title: LoeybCategoryType.Sports,
    image: SPORT,
  },
];

export const workTitle = LoeybAreaType.Work;
export const workCategory: SubCategoryProps[] = [
  {
    title: LoeybCategoryType.Project,
    image: PROJECT,
  },
  {
    title: LoeybCategoryType.School,
    image: SCHOOL,
  },
  {
    title: LoeybCategoryType.Skill,
    image: SKILLS,
  },
  {
    title: LoeybCategoryType.Company,
    image: COMPANY,
  },
  {
    title: LoeybCategoryType.Award,
    image: AWARDS,
  },
];

import {SubCategoryProps} from './child';
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
} from '../../../assets';

export const healthTitle = 'HEALTH';
export const healthCategory: SubCategoryProps[] = [
  {
    title: 'FOOD',
    image: FOOD,
  },
  {
    title: 'EXERCISE',
    image: EXERCISE,
  },
  {
    title: 'SICK',
    image: SICK,
  },
];

export const mindTitle = 'MIND';
export const mindCategory: SubCategoryProps[] = [
  {
    title: 'THOUGHT',
    image: THOUGHT,
  },
  {
    title: 'EMOTION',
    image: EMOTION,
  },
  {
    title: 'GOALS',
    image: GOALS,
  },
  {
    title: 'IDEAS',
    image: IDEAS,
  },
];

export const socialTitle = 'SOCIAL';
export const socialCategory: SubCategoryProps[] = [
  {
    title: 'FRIENDS',
    image: FRIENDS,
  },
  {
    title: 'FAMILY',
    image: FAMILY,
  },
  {
    title: 'PETS',
    image: PET,
  },
  {
    title: 'COWORKER',
    image: COWORKER,
  },
];

export const lifeTitle = 'LIFE';
export const lifeCategory: SubCategoryProps[] = [
  {
    title: 'FASHION',
    image: FASHION,
  },
  {
    title: 'MUSIC',
    image: MUSIC,
  },
  {
    title: 'ART',
    image: ART,
  },
  {
    title: 'BOOKS',
    image: BOOK,
  },
  {
    title: 'SPORTS',
    image: SPORT,
  },
];

export const workTitle = 'WORK';
export const workCategory: SubCategoryProps[] = [
  {
    title: 'PROJECT',
    image: PROJECT,
  },
  {
    title: 'SCHOOL',
    image: SCHOOL,
  },
  {
    title: 'SKILLS',
    image: SKILLS,
  },
  {
    title: 'COMPANY',
    image: COMPANY,
  },
  {
    title: 'AWARDS',
    image: AWARDS,
  },
];

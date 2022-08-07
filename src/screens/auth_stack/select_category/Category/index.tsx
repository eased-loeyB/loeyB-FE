import React, {FC, useState} from 'react';
import {FlatList} from 'react-native';

import {remove, some} from 'lodash';
import {rgba} from 'polished';
import styled from 'styled-components/native';

import {ColorMap} from '~/utils/Colors';

import CategoryItem, {SubCategoryProps} from './CategoryItem';

export interface CategoryProps {
  title: string;
  child: SubCategoryProps[];
  color: string;
  callback: (o: SubCategoryProps[]) => void;
}

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const TitleWrapper = styled.View`
  width: 60px;
  height: 28px;
  background-color: ${rgba(ColorMap.White, 0.08)};
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const Title = styled.Text<{color: string}>`
  font-size: 12px;
  font-weight: 500;
  color: ${({color}) => color};
`;

const Category: FC<CategoryProps> = ({title, child, color, callback}) => {
  const [selected, setSetected] = useState<SubCategoryProps[]>([]);
  const [focusUpdate, setFocusUpdate] = useState(false);

  return (
    <Container>
      <TitleWrapper>
        <Title color={color}>{title}</Title>
      </TitleWrapper>
      <FlatList
        data={child ?? []}
        keyExtractor={item => `${item.title}`}
        extraData={focusUpdate}
        renderItem={({item}) => {
          const isSelected = some(selected, i => i.title === item.title);
          const itemCallback = () => {
            const currentList = [...selected];
            if (isSelected) {
              remove(currentList, i => i.title === item.title);
            } else {
              currentList.push(item);
            }
            setSetected(currentList);
            setFocusUpdate(!focusUpdate);
            callback(currentList);
          };

          return (
            <CategoryItem
              isSelected={isSelected}
              color={color}
              callback={itemCallback}
              {...item}
            />
          );
        }}
      />
    </Container>
  );
};

export default Category;

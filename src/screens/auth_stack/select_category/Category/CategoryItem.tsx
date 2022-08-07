import React, {FC} from 'react';
import {Image, ImageRequireSource, TouchableOpacity} from 'react-native';

import styled from 'styled-components/native';

export interface SubCategoryProps {
  title: string;
  image: ImageRequireSource;
}

interface Props extends SubCategoryProps {
  isSelected: boolean;
  callback: () => void;
  color: string;
}

const Wrapper = styled.View<Pick<Props, 'isSelected'>>`
  align-items: center;
  opacity: ${({isSelected}) => (isSelected ? 1 : 0.4)};
  margin-top: 24px;
`;

const ButtonText = styled.Text<Pick<Props, 'color'>>`
  font-size: 10px;
  font-weight: 600;
  color: ${({color}) => color};
  margin-top: 4px;
`;

const CategoryItem: FC<Props> = ({
  title,
  image,
  isSelected,
  callback,
  color,
}) => {
  const opacity = isSelected ? 1 : 0.4;
  console.log('isSelected', isSelected, opacity);
  return (
    <TouchableOpacity onPress={callback}>
      <Wrapper isSelected={isSelected}>
        <Image source={image} />
        <ButtonText color={color}>{title}</ButtonText>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default CategoryItem;

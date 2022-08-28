import React, {FC} from 'react';
import {ImageSourcePropType} from 'react-native';

import styled from 'styled-components/native';

import {ColorMap} from '~/utils/Colors';

interface Props {
  iconSrc: ImageSourcePropType;
  callback?: () => void;
}

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.Image`
  margin-right: 4px;
`;

const IconText = styled.Text`
  color: ${ColorMap.White};
`;

const IconButton: FC<Props> = ({iconSrc, callback, children}) => (
  <Button onPress={callback}>
    <Icon source={iconSrc} />
    <IconText>{children}</IconText>
  </Button>
);

export default IconButton;

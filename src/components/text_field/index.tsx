import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardType,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {isEmpty} from 'lodash';
import {rgba} from 'polished';
import styled from 'styled-components/native';

import {ColorMap} from '~/utils/Colors';

import {TextInputVariant} from './colorPalattes';

export interface TextFieldProps {
  value: string;
  defaultValue?: string;
  placeholder?: string;
  multiline?: boolean;
  editable?: boolean;
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
  keyboardType?: KeyboardType;
  errorMsg?: string;
  backgroundColor?: string;
  onTextChange?: (value: string) => void;
  onRightPress?: () => void;
  onLeftPress?: () => void;
  alwaysShowBorder?: boolean;
  maxLength?: number;
  containerStyle?: StyleProp<ViewStyle>;
  activeVariant?: TextInputVariant;
  variant?: TextInputVariant;
  autoFocus?: boolean;
  customTextInputStyle?: TextStyle;
  secureTextEntry?: boolean;
  customWrapperContainer?: ViewStyle;
}

const Wrapper = styled.View<Pick<TextFieldProps, 'editable'>>`
  border-width: ${({editable}) => (editable ? 1 : 0)}px;
  border-radius: 8px;
  border-color: ${ColorMap.White};
`;

const TextInputOverlay = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${rgba(ColorMap.LightBlue2, 0.08)};
  border-radius: 8px;
`;

const Container = styled.View`
  height: 48px;
  flex-direction: row;
  align-items: center;
  background-color: ${rgba(ColorMap.LightBlue2, 0.08)};
  border-radius: 8px;
`;

const IconButton = styled.TouchableOpacity`
  padding: 12px;
  justify-content: center;
  align-items: center;
`;

const TextInput = styled.TextInput<
  Pick<TextFieldProps, 'editable' | 'iconLeft'>
>`
  flex: 1;
  background-color: transparent;
  color: ${({editable}) =>
    editable ? ColorMap.LightBlue2 : ColorMap.LightBlue};
  ${({iconLeft}) => iconLeft === undefined && 'padding: 0 16px;'};
`;

const ErrorMessageWrapper = styled.View`
  margin-top: 4px;
`;

const ErrorMessage = styled.Text`
  color: ${ColorMap.LightBlue};
`;

const TextField = ({
  value,
  defaultValue,
  placeholder,
  multiline,
  editable = true,
  iconLeft,
  iconRight,
  keyboardType,
  errorMsg,
  onTextChange,
  onLeftPress,
  onRightPress,
  alwaysShowBorder = false,
  maxLength,
  containerStyle,
  activeVariant = 'active',
  variant = 'inactive',
  autoFocus = false,
  customTextInputStyle,
  secureTextEntry = false,
  customWrapperContainer = {},
}: TextFieldProps) => {
  const [currentVariant, setCurrentVariant] =
    useState<TextInputVariant>(variant);

  const onFocus = () => {
    setCurrentVariant(activeVariant);
  };
  const onBlur = () => {
    setCurrentVariant('inactive');
  };

  useEffect(() => {
    if (!isEmpty(errorMsg)) {
      setCurrentVariant('error');
    }
  }, [currentVariant]);

  return (
    <View>
      <Wrapper style={customWrapperContainer}>
        <TextInputOverlay />
        <Container style={containerStyle}>
          {iconLeft && (
            <IconButton onPress={onLeftPress}>
              <Image
                source={iconLeft}
                style={{tintColor: ColorMap.Secondary}}
              />
            </IconButton>
          )}

          <TextInput
            style={customTextInputStyle}
            placeholder={placeholder}
            placeholderTextColor={ColorMap.Gray600}
            multiline={multiline}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onChangeText={text => {
              if (onTextChange) {
                onTextChange(text);
              }
            }}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            onFocus={onFocus}
            onBlur={onBlur}
            underlineColorAndroid="transparent"
            editable={editable}
            autoCapitalize="none"
            autoFocus={autoFocus}
          />

          {iconRight && (
            <IconButton onPress={onRightPress}>
              <Image
                source={iconRight}
                style={{tintColor: ColorMap.Secondary}}
              />
            </IconButton>
          )}
        </Container>
      </Wrapper>
      {/* ERROR MSG */}
      {errorMsg && errorMsg?.length > 0 ? (
        <ErrorMessageWrapper>
          <ErrorMessage>{errorMsg}</ErrorMessage>
        </ErrorMessageWrapper>
      ) : null}
    </View>
  );
};

export default TextField;

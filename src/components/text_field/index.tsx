import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardType,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {isEmpty} from 'lodash';
import {rgba} from 'polished';

import {LightBlue2, TextColors, GrayColors, LightBlue} from '~/utils/Colors';
import {convertWidth, convertHeight} from '~/utils/design';

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
      <View
        style={[
          {
            borderWidth: editable ? 1 : 0,
            borderRadius: 8,
            borderColor: 'white',
          },
          customWrapperContainer,
        ]}>
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            opacity: 0.08,
            backgroundColor: LightBlue2,
            borderRadius: 8,
          }}
        />
        <View style={[styles.textField, containerStyle]}>
          {iconLeft && (
            <TouchableOpacity style={styles.icon} onPress={onLeftPress}>
              <Image
                source={iconLeft}
                style={{tintColor: TextColors.Secondary}}
              />
            </TouchableOpacity>
          )}

          <TextInput
            style={[
              styles.textInput,
              !editable && styles.errorText,
              customTextInputStyle,
              iconLeft === undefined
                ? {paddingHorizontal: convertWidth(16)}
                : null,
            ]}
            placeholder={placeholder}
            placeholderTextColor={GrayColors.Gray600}
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
            <TouchableOpacity style={styles.icon} onPress={onRightPress}>
              <Image
                source={iconRight}
                style={{tintColor: TextColors.Secondary}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* ERROR MSG */}
      {errorMsg && errorMsg?.length > 0 ? (
        <View style={styles.error}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  textField: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: convertHeight(48),
    backgroundColor: rgba(LightBlue2, 0.08),
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    color: LightBlue2,
  },
  icon: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    marginTop: 3,
  },
  errorText: {
    color: LightBlue,
  },
});

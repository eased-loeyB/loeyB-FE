import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {CLEAR_ICON} from '~/assets';
import {ErrorColors, TextColors, CommonColors} from '~/utils/Colors';
import {
  deviceWidth,
  convertWidth,
  convertHeight,
  convertFontSize,
} from '~/utils/design';
import ToastService from '~/utils/ToastService';

interface SnackBarProps {
  text: string;
  error?: boolean;
  icon?: ImageSourcePropType;
}

const SnackBar = ({text, error, icon = CLEAR_ICON}: SnackBarProps) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.contentRow,
          {backgroundColor: error ? ErrorColors.Light : TextColors.Primary},
        ]}>
        <View style={styles.messageSection}>
          <Text
            style={[
              styles.contentText,
              {color: error ? ErrorColors.Main : CommonColors.White},
            ]}>
            {text}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.iconSection}
          onPress={() => {
            ToastService.close();
          }}>
          <Image
            source={icon}
            resizeMode="contain"
            style={[
              styles.iconSectionImg,
              {tintColor: error ? ErrorColors.Main : CommonColors.White},
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SnackBar;

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginHorizontal: convertWidth(16),
    paddingHorizontal: convertWidth(20),
    paddingVertical: convertHeight(12),
    borderRadius: 8,
  },
  iconSection: {
    width: convertWidth(28),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSectionImg: {
    width: 24,
    height: 24,
    tintColor: CommonColors.White,
  },
  messageSection: {
    flex: 1,
  },
  contentText: {
    fontWeight: '400',
    fontSize: convertFontSize(13),
    letterSpacing: -0.1,
  },
});

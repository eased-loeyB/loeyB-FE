import React, {useEffect, useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Modal, {ModalProps} from 'react-native-modal';

import {CLEAR_ICON, PUBLIC} from '~/assets';
import {DarkBlue, LightBlue2} from '~/utils/Colors';
import {convertHeight, convertWidth, deviceWidth} from '~/utils/design';

import {useGetCity} from './useGetCity';

export interface MyDatePickerProps {
  open: boolean;
  callback: (city: string) => void;
  dismiss: () => void;
  city: string;
}

export const LocationPicker = (props: MyDatePickerProps) => {
  const {city} = useGetCity();
  const scrollViewRef = useRef<ScrollView>(null);
  const handleScrollTo: ModalProps['scrollTo'] = p => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  useEffect(() => {
    if (city) {
      props.callback(city[0]);
    }
  }, [city]);

  return (
    <Modal
      isVisible={props.open}
      onDismiss={() => {
        props.dismiss();
      }}
      onSwipeComplete={props.dismiss}
      swipeDirection={['down']}
      scrollTo={handleScrollTo}
      // scrollOffset={this.state.scrollOffset}
      scrollOffsetMax={400 - 300} // content height - ScrollView height
      propagateSwipe={true}
      style={styles.view}>
      <View
        style={{
          paddingBottom: 50,
          backgroundColor: DarkBlue,
          height: convertHeight(350),
          width: deviceWidth,
          borderRadius: 24,
          paddingTop: 15,
        }}>
        <ScrollView ref={scrollViewRef} scrollEventThrottle={16}>
          {(city ?? []).map(item => {
            const isSelected = props.city === item;
            return (
              <TouchableOpacity
                style={{
                  paddingHorizontal: convertWidth(30),
                  paddingVertical: convertHeight(15),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  props.callback(item);
                }}>
                {isSelected ? (
                  <Image source={PUBLIC} />
                ) : (
                  <View style={{width: 25}} />
                )}
                <Text
                  style={{
                    color: LightBlue2,
                    marginLeft: 9,
                  }}>
                  {item}, Korea
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={{position: 'absolute', top: 30, right: 30}}
          onPress={props.dismiss}>
          <Image source={CLEAR_ICON} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

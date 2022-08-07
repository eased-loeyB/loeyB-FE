import React, {FC, useEffect, useRef} from 'react';
import {Image, ScrollView} from 'react-native';

import Modal, {ModalProps} from 'react-native-modal';
import styled from 'styled-components/native';

import {CLEAR_ICON, PUBLIC} from '~/assets';
import {ColorMap} from '~/utils/Colors';
import {deviceWidth} from '~/utils/design';

import {useGetCities} from './useGetCities';

export interface MyDatePickerProps {
  open: boolean;
  callback: (city: string) => void;
  dismiss: () => void;
  city: string;
}

const Base = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`;

const Wrapper = styled.View`
  width: ${deviceWidth};
  height: 350px;
  border-radius: 24px;
  padding: 15px 0 50px;
  background-color: ${ColorMap.DarkBlue};
`;

const Location = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px 30px;
`;

const LocationText = styled.Text`
  color: ${ColorMap.LightBlue2};
  margin-eft: 8px;
`;

const IconWrapper = styled.View`
  width: 24px;
  height: 24px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  right: 30px;
`;

export const LocationPicker: FC<MyDatePickerProps> = ({
  open,
  callback,
  dismiss,
  city,
}) => {
  const {cities} = useGetCities();
  const scrollViewRef = useRef<ScrollView>(null);
  const handleScrollTo: ModalProps['scrollTo'] = p => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  useEffect(() => {
    if (cities) {
      callback(cities[0]);
    }
  }, [cities]);

  return (
    <Base
      isVisible={open}
      onDismiss={() => {
        dismiss();
      }}
      onSwipeComplete={dismiss}
      swipeDirection={['down']}
      scrollTo={handleScrollTo}
      // scrollOffset={this.state.scrollOffset}
      scrollOffsetMax={400 - 300} // content height - ScrollView height
      propagateSwipe={true}>
      <Wrapper>
        <ScrollView ref={scrollViewRef} scrollEventThrottle={16}>
          {(cities ?? []).map(item => {
            const isSelected = city === item;
            return (
              <Location onPress={() => callback(item)}>
                <IconWrapper>
                  {isSelected && <Image source={PUBLIC} />}
                </IconWrapper>
                <LocationText>{item}, Korea</LocationText>
              </Location>
            );
          })}
        </ScrollView>
        <CloseButton onPress={dismiss}>
          <Image source={CLEAR_ICON} />
        </CloseButton>
      </Wrapper>
    </Base>
  );
};

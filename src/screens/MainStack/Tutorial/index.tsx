import React, {FC, useRef} from 'react';
import {Image} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';

import {
  TUTORIAL_PAGE_1,
  TUTORIAL_PAGE_2,
  TUTORIAL_PAGE_3,
  TUTORIAL_PAGE_4,
} from '~/assets';
import {ColorMap} from '~/utils/Colors';
import {ContainerStyle} from '~/utils/Styles';

const Container = styled.View`
  ${ContainerStyle}
`;

const ModalView = styled.View`
  position: absolute;
  background-color: ${ColorMap.DarkBlue};
  align-items: center;
  height: 206px;
  width: 100%;
  bottom: 0;
`;

const TextView = styled.View`
  align-items: center
  margin-top: 22px;
  margin-left: 80px;
  margin-right: 88px;
  margin-bottom: 16px;
`;

const ModalText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 18px;
`;

const DoneButton = styled.TouchableOpacity`
  width: 90%;
  height: 60px;
  background-color: ${ColorMap.LightBlue};
  justify-content: center;
  margin-top: 43px;
  margin-bottom: 19px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

const DoneText = styled.Text`
  color: ${ColorMap.Navy};
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const ImageView = styled.TouchableOpacity`
  bottom: 106;
  position: absolute;
  left: 38px;
`;
const ImageText = styled.Text`
  color: ${ColorMap.White};
  font-size: 14px;
  font-weight: 400;
`;

const Tutorial: FC = () => {
  const {bottom} = useSafeAreaInsets();
  const swiper = useRef(null);

  return (
    <Swiper
      ref={swiper}
      index={0}
      paginationStyle={{bottom: 106}}
      dotStyle={{width: 12, height: 12, borderRadius: 6}}
      dotColor="#868E96"
      activeDotColor="white"
      activeDotStyle={{width: 12, height: 12, borderRadius: 6}}>
      <Container>
        <Image
          source={TUTORIAL_PAGE_1}
          style={{width: '100%', height: '100%'}}
        />
        <ImageView onPress={() => swiper?.current?.scrollBy(1)}>
          <ImageText>Skip</ImageText>
        </ImageView>
      </Container>
      <Container>
        <Image
          source={TUTORIAL_PAGE_2}
          style={{width: '100%', height: '100%'}}
        />
        <ImageView onPress={() => swiper?.current?.scrollBy(1)}>
          <ImageText>Skip</ImageText>
        </ImageView>
      </Container>
      <Container>
        <Image
          source={TUTORIAL_PAGE_3}
          style={{width: '100%', height: '100%'}}
        />
        <ImageView onPress={() => swiper?.current?.scrollBy(1)}>
          <ImageText>Skip</ImageText>
        </ImageView>
      </Container>
      <Container>
        <Image
          source={TUTORIAL_PAGE_4}
          style={{width: '100%', height: '100%'}}
        />
        <ModalView>
          <TextView>
            <ModalText>Add & select tags</ModalText>
            <ModalText>about the experience</ModalText>
          </TextView>
          <DoneButton>
            <DoneText>Done!</DoneText>
          </DoneButton>
        </ModalView>
      </Container>
    </Swiper>
  );
};

export default Tutorial;

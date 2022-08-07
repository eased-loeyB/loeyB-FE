import React, {useState} from 'react';
import {Image, Platform, TouchableOpacity} from 'react-native';

import dayjs from 'dayjs';
import {isEmpty} from 'lodash';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';

import {
  CAMERA,
  CLEAR_ICON,
  LAST_PAGE,
  loeyB,
  PUBLIC,
  SEARCH,
  TIME,
  TRASH,
  VIDEO_CAMERA,
  VIEW_CAROUSEL,
} from '~/assets';
import BackgroundCommon from '~/components/BackgroundCommon';
import {BottomModal} from '~/components/bottom_modal';
import {MyDatePicker} from '~/components/date_picker';
import {LocationPicker} from '~/components/location_picker';
import {ChooseMultiple, FileAttachment, OpenCamera} from '~/utils/Camera';
import {ColorMap} from '~/utils/Colors';

import {DeleteModal} from '../../tutorial_stack/delete_modal';
import IconButton from './IconButton';

const PageWrapper = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Base = styled.View`
  flex: 1;
  align-items: center;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 412px;
  margin-top: 16px;
  padding: 0 16px;
`;

const StyledImage = styled.Image`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const ClearButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 24px;
`;

const Icon = styled.Image`
  position: absolute;
  bottom: 148px;
  right: 4px;
`;

const TrashIcon = styled(Icon)`
  bottom: 108px;
`;

const SearchIcon = styled(Icon)`
  bottom: 64px;
`;

const LastPageIcon = styled(Icon)`
  bottom: 24px;
`;

const InformationContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 14px;
  padding: 0 16px;
`;

const TextInputContainer = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 12px;
  padding: 0 16px;
`;

const StyledTextInput = styled.TextInput`
  background-color: rgba(244, 250, 255, 0.04);
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
  padding: 12px 10px;
  color: ${ColorMap.White};
`;

export const FirstMemory = () => {
  const [image, setImage] = useState<FileAttachment[]>();
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [city, setCity] = useState('');
  const [openCityPicker, setCityPicker] = useState(false);
  const [textMode, setTextMode] = useState(false);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <BackgroundCommon edges={['top', 'right', 'left']}>
      <PageWrapper
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <Base>
          {!textMode && (
            <ImageContainer>
              <Swiper>
                {(image ?? [])?.map(i => (
                  <StyledImage
                    source={{
                      uri: i ? i.uri : 'https://picsum.photos/343/412',
                    }}
                  />
                ))}
              </Swiper>
              <ClearButton
                onPress={() => {
                  setTextMode(true);
                }}>
                <Image
                  source={CLEAR_ICON}
                  style={{tintColor: ColorMap.White}}
                />
              </ClearButton>
              <TouchableOpacity
                onPress={async () => {
                  await OpenCamera('photo', async res => {
                    console.log('tempp', [...(image ?? []), ...res]);
                    setImage([...(image ?? []), ...res]);
                  });
                }}>
                <Icon source={CAMERA} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await OpenCamera('video', async res => {
                    if (!isEmpty(res)) {
                      // setImage(res[0]);
                    }
                  });
                }}>
                <Icon source={VIDEO_CAMERA} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOpenDeleteModal(true)}>
                <TrashIcon source={TRASH} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await ChooseMultiple('any', result => {
                    setImage([...(image ?? []), ...result]);
                  });
                }}>
                <SearchIcon source={SEARCH} />
              </TouchableOpacity>
              <TouchableOpacity>
                <LastPageIcon source={LAST_PAGE} />
              </TouchableOpacity>
            </ImageContainer>
          )}
          {!textMode && (
            <InformationContainer>
              <IconButton
                iconSrc={TIME}
                callback={() => setOpenTimePicker(!openTimePicker)}>
                {dayjs(date).format('YYYY.MM.DD')}
              </IconButton>
              <IconButton
                iconSrc={PUBLIC}
                callback={() => setCityPicker(!openCityPicker)}>
                {city}, Korea
              </IconButton>
              <IconButton iconSrc={loeyB}> 1</IconButton>
            </InformationContainer>
          )}
          <TextInputContainer>
            <StyledTextInput
              multiline={true}
              placeholder={'Write about the experience'}
              placeholderTextColor={ColorMap.LightBlue2}
            />
          </TextInputContainer>
          {textMode && (
            <InformationContainer>
              <IconButton
                iconSrc={TIME}
                callback={() => setOpenTimePicker(!openTimePicker)}>
                {dayjs(date).format('YYYY.MM.DD')}
              </IconButton>
              <IconButton
                iconSrc={PUBLIC}
                callback={() => setCityPicker(!openCityPicker)}>
                {city}, Korea
              </IconButton>
              <IconButton
                iconSrc={VIEW_CAROUSEL}
                callback={() => {
                  setTextMode(!textMode);
                }}>
                {' 1'}
              </IconButton>
            </InformationContainer>
          )}
          <MyDatePicker
            callback={d => {
              setDate(dayjs(d));
              console.log('da', dayjs(d).toString());
              setOpenTimePicker(false);
            }}
            open={openTimePicker}
            date={date}
            dismiss={() => {
              setOpenTimePicker(false);
            }}
          />
          <LocationPicker
            dismiss={() => {
              setCityPicker(false);
            }}
            callback={c => {
              setCity(c);
              setCityPicker(false);
            }}
            city={city}
            open={openCityPicker}
          />
          <DeleteModal
            callback={() => {
              setOpenDeleteModal(false);
              setImage(undefined);
            }}
            open={openDeleteModal}
            dismiss={() => setOpenDeleteModal(false)}
          />
        </Base>
        <BottomModal />
      </PageWrapper>
    </BackgroundCommon>
  );
};

import React, {useCallback, useRef, useState} from 'react';
import {Image, Platform, TouchableOpacity} from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import {
  AreaCategoryTagInput,
  useFetchRegisteredRecordsLazyQuery,
  useRegisterRecordMutation,
} from '~/apollo/generated';
import {isSuccessResponse} from '~/apollo/utils/error';
import {
  CAMERA,
  CLEAR_ICON,
  DELETE_MODAL,
  FIRST_STARDUST,
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
import IconButton from '~/components/IconButton';
import LocationPicker from '~/components/LocationPicker';
import Modal from '~/components/Modal';
import MyDatePicker from '~/components/MyDatePicker';
import TagSheet, {MINIMIZED_TAG_SHEET_HEIGHT} from '~/components/TagSheet';
import {updateUserData} from '~/store/reduxtoolkit/user/userSlice';
import {ChooseMultiple, FileAttachment, OpenCamera} from '~/utils/Camera';
import {ColorMap} from '~/utils/Colors';
import ToastService from '~/utils/ToastService';

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

const TextInputContainer = styled.View<{footerHeight: number}>`
  flex: 1;
  width: 100%;
  margin-top: 12px;
  padding: 0 16px;
  margin-bottom: ${({footerHeight}) => footerHeight + 12}px;
`;

const StyledTextInput = styled.TextInput`
  background-color: rgba(244, 250, 255, 0.04);
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
  padding: 12px 10px;
  color: ${ColorMap.White};
`;

const GuideContent = styled.Text`
  font-size: 18px;
  font-weight: 500;
  line-height: 32px;
`;

const FirstMemory = () => {
  const {bottom} = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [openGuideModal, setOpenGuideModal] = useState(true);
  const [images, setImages] = useState<FileAttachment[]>([]);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [city, setCity] = useState('');
  const [openCityPicker, setCityPicker] = useState(false);
  const [textMode, setTextMode] = useState(false);
  const [description, setDescription] = useState<string>('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState<AreaCategoryTagInput[]>([]);

  const tagSheetRef = useRef<BottomSheet>(null);

  const [fetchRecords] = useFetchRegisteredRecordsLazyQuery({
    onCompleted: ({fetchRegisteredRecords: {data, result}}) => {
      if (isSuccessResponse(result)) {
        if (data) {
          dispatch(
            updateUserData({
              stardustRecords: data,
            }),
          );
        }
      }
    },
  });

  const [registerRecord] = useRegisterRecordMutation({
    onCompleted: async ({registerRecord: {result}}) => {
      if (isSuccessResponse(result)) {
        await fetchRecords();
        // TODO: change success logic
        setImages([]);
        setDate(dayjs());
        setCity('');
        setDescription('');
        setSelectedTags([]);
        tagSheetRef.current?.collapse();
      } else {
        ToastService.showError('Failed to save stardust');
      }
    },
    onError: () => {
      ToastService.showError('Failed to save stardust');
    },
  });

  const onSelectTag = (input: AreaCategoryTagInput) => {
    setSelectedTags(prev => {
      const prevIndex = prev.findIndex(
        ({tag: prevTag}) => prevTag === input.tag,
      );
      if (prevIndex > -1) {
        const copied = [...prev];
        copied.splice(prevIndex, 1);

        return copied;
      }

      return [...prev, input];
    });
  };

  const onRegisterRecord = useCallback(async (): Promise<void> => {
    const imgFiles = images.map(({id, name}) => ({
      fileId: id,
      fileName: name,
    }));

    const hasContent = imgFiles.length > 0 || !!description;
    const hasDateAndLocation = !!date && !!city;
    const hasTag = selectedTags.length > 0;

    if (!hasContent || !hasDateAndLocation || !hasTag) {
      ToastService.showError('Invalid parameters');
      return;
    }

    await registerRecord({
      variables: {
        imgFiles,
        description,
        areaCategoryTag: selectedTags,
        date: date.toISOString(),
        location: city,
        importance: 1,
      },
    });
  }, [city, date, description, images, registerRecord, selectedTags]);

  return (
    <BackgroundCommon edges={['top', 'right', 'left']}>
      <PageWrapper
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <Base>
          {!textMode && (
            <ImageContainer>
              <Swiper>
                {images.map(({id, uri}) => (
                  <StyledImage key={id} source={{uri}} />
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
                  await OpenCamera('photo', res => {
                    setImages(prev => prev.concat(res));
                  });
                }}>
                <Icon source={CAMERA} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await OpenCamera('video', res => {
                    setImages(prev => prev.concat(res));
                  });
                }}>
                <Icon source={VIDEO_CAMERA} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOpenDeleteModal(true)}>
                <TrashIcon source={TRASH} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await ChooseMultiple('any', res => {
                    setImages(prev => prev.concat(res));
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
          <TextInputContainer
            footerHeight={bottom + MINIMIZED_TAG_SHEET_HEIGHT}>
            <StyledTextInput
              value={description}
              onChangeText={setDescription}
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
        </Base>

        <Modal
          open={openGuideModal}
          dismiss={() => setOpenGuideModal(false)}
          callback={() => setOpenGuideModal(false)}
          content={
            <GuideContent>
              {'Create 5 stardusts and\nyour star will be created!'}
            </GuideContent>
          }
          iconSource={FIRST_STARDUST}
          buttonText="Next"
        />

        <MyDatePicker
          onChange={d => {
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
          location={city}
          open={openCityPicker}
        />

        <Modal
          open={openDeleteModal}
          dismiss={() => setOpenDeleteModal(false)}
          callback={() => {
            setOpenDeleteModal(false);
            setImages([]);
          }}
          content="Are you sure to delete this image from your device album?"
          iconSource={DELETE_MODAL}
          buttonText="Delete from device album"
        />

        <TagSheet
          ref={tagSheetRef}
          selectedTags={selectedTags}
          onSelectTag={onSelectTag}
          onSubmit={onRegisterRecord}
        />
      </PageWrapper>
    </BackgroundCommon>
  );
};

export default FirstMemory;

import React, {useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {convertHeight, convertWidth, LightBlue2} from '../../../utils';
import BackgroundCommon from '../../../components/BackgroundCommon';
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
} from '../../../assets';
import dayjs from 'dayjs';
import {
  ChooseMultiple,
  FileAttachment,
  OpenCamera,
} from '../../../utils/Camera';
import _ from 'lodash';
import {MyDatePicker} from '../../../components/date_picker';
import {LocationPicker} from '../../../components/location_picker';
import {DeleteModal} from '../../tutorial_stack/delete_modal';
import Swiper from 'react-native-swiper';
import {BottomModal} from '../../../components/bottom_modal';

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
      <View style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            {!textMode && (
              <View style={styles.containerImage}>
                <Swiper>
                  {(image ?? [])?.map(i => {
                    console.log('i', i);
                    return (
                      <Image
                        source={{
                          uri: i ? i.uri : 'https://picsum.photos/343/412',
                        }}
                        style={styles.image}
                      />
                    );
                  })}
                </Swiper>
                <TouchableOpacity
                  style={styles.imageClear}
                  onPress={() => {
                    setTextMode(true);
                  }}>
                  <Image source={CLEAR_ICON} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    await OpenCamera('photo', async res => {
                      console.log('tempp', [...(image ?? []), ...res]);
                      setImage([...(image ?? []), ...res]);
                    });
                  }}>
                  <Image
                    source={CAMERA}
                    style={{
                      position: 'absolute',
                      bottom: 187,
                      right: 5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    await OpenCamera('video', async res => {
                      if (!_.isEmpty(res)) {
                        // setImage(res[0]);
                      }
                    });
                  }}>
                  <Image
                    source={VIDEO_CAMERA}
                    style={{
                      position: 'absolute',
                      bottom: 147,
                      right: 5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpenDeleteModal(true)}>
                  <Image
                    source={TRASH}
                    style={{
                      position: 'absolute',
                      bottom: 107,
                      right: 5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    await ChooseMultiple('any', result => {
                      setImage([...(image ?? []), ...result]);
                    });
                  }}>
                  <Image
                    source={SEARCH}
                    style={{
                      position: 'absolute',
                      bottom: 63,
                      right: 5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={LAST_PAGE}
                    style={{position: 'absolute', bottom: 23, right: 5}}
                  />
                </TouchableOpacity>
              </View>
            )}
            {!textMode && (
              <View style={styles.containerInformation}>
                <Timer
                  callback={() => setOpenTimePicker(!openTimePicker)}
                  date={date}
                />
                <Location
                  callback={() => setCityPicker(!openCityPicker)}
                  city={city}
                />
                <Star callback={() => {}} />
              </View>
            )}
            <View style={styles.containerTextInput}>
              <TextInput
                multiline={true}
                style={styles.textInput}
                placeholder={'Write about the experience'}
                placeholderTextColor={LightBlue2}
              />
            </View>
            {textMode && (
              <View style={styles.containerInformation}>
                <Timer
                  callback={() => setOpenTimePicker(!openTimePicker)}
                  date={date}
                />
                <Location
                  callback={() => setCityPicker(!openCityPicker)}
                  city={city}
                />
                <Carousel
                  callback={() => {
                    setTextMode(!textMode);
                  }}
                />
              </View>
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
          </View>
        </KeyboardAvoidingView>
        <BottomModal />
      </View>
    </BackgroundCommon>
  );
};

interface ItemProps {
  callback: () => void;
  date?: dayjs.Dayjs;
  city?: string;
}

const Timer = (props: ItemProps) => {
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', alignItems: 'center'}}
      onPress={props.callback}>
      <Image source={TIME} style={{marginRight: 5}} />
      <Text style={{color: 'white'}}>
        {dayjs(props.date).format('YYYY.MM.DD')}
      </Text>
    </TouchableOpacity>
  );
};

const Location = (props: ItemProps) => {
  return (
    <TouchableOpacity
      onPress={props.callback}
      style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image source={PUBLIC} style={{marginRight: 5}} />
      <Text style={{color: 'white'}}> {props.city}, Korea</Text>
    </TouchableOpacity>
  );
};

const Star = (props: ItemProps) => {
  return (
    <TouchableOpacity onPress={props.callback}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={loeyB} style={{marginRight: 5}} />
        <Text style={{color: 'white'}}> 1</Text>
      </View>
    </TouchableOpacity>
  );
};

const Carousel = (props: ItemProps) => {
  return (
    <TouchableOpacity onPress={props.callback}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={VIEW_CAROUSEL} style={{marginRight: 5}} />
        <Text style={{color: 'white'}}> 1</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    // width: convertWidth(343),
    // height: convertHeight(412),
  },
  containerImage: {
    width: '100%',
    height: convertHeight(412),
    marginTop: convertHeight(18),
    paddingHorizontal: convertWidth(16),
  },
  textInput: {
    backgroundColor: 'rgba(244, 250, 255, 0.04)',
    width: '100%',
    height: '100%',
    marginBottom: 30,
    paddingHorizontal: 10,
    paddingVertical: 13,
    color: 'white',
  },
  containerInformation: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: convertHeight(14),
    paddingHorizontal: convertWidth(16),
  },
  imageClear: {
    position: 'absolute',
    top: 21,
    right: 22,
    tintColor: 'white',
  },
  containerTextInput: {
    flex: 1,
    width: '100%',
    marginTop: convertHeight(12),
    paddingHorizontal: convertWidth(16),
  },
});

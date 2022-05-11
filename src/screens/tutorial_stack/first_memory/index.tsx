import React, {useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewComponent,
  Platform,
  ScrollView,
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
  CLEAR_ICON,
  LAST_PAGE,
  loeyB,
  PUBLIC,
  SEARCH,
  TIME,
  TRASH,
} from '../../../assets';
import dayjs from 'dayjs';
import {useCameraDevices} from 'react-native-vision-camera';
import {FileAttachment, OpenCamera} from '../../../utils/Camera';
import _ from 'lodash';
import {PlacePicker} from '../../place_picker';
import {MyDatePicker} from '../../../components/date_picker';
import {LocationPicker} from '../../../components/location_picker';
import {navigate} from '../../../navigation';
import {MainStackName} from '../../../navigation/stacks/MainStack';

export const FirstMemory = () => {
  const devices = useCameraDevices('wide-angle-camera');
  const [image, setImage] = useState<FileAttachment>();
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [city, setCity] = useState('');
  const [openCityPicker, setCityPicker] = useState(false);
  const [textMode, setTextMode] = useState(false);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <BackgroundCommon edges={['top', 'right', 'left']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            {!textMode && (
              <View style={styles.containerImage}>
                <TouchableWithoutFeedback
                  onPress={async () => {
                    await OpenCamera('video', async res => {
                      if (!_.isEmpty(res)) {
                        setImage(res[0]);
                      }
                    });
                  }}>
                  <Image
                    source={{
                      uri: image ? image.uri : 'https://picsum.photos/343/412',
                    }}
                    style={styles.image}
                  />
                </TouchableWithoutFeedback>
                <TouchableOpacity
                  style={styles.imageClear}
                  onPress={() => {
                    setTextMode(true);
                  }}>
                  <Image source={CLEAR_ICON} />
                </TouchableOpacity>
                <Image
                  source={TRASH}
                  style={{position: 'absolute', bottom: 107, right: 22}}
                />
                <Image
                  source={SEARCH}
                  style={{position: 'absolute', bottom: 63, right: 22}}
                />
                <Image
                  source={LAST_PAGE}
                  style={{position: 'absolute', bottom: 23, right: 22}}
                />
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
                <Star />
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
            <View
              style={{
                backgroundColor: 'rgba(244, 250, 255, 0.12)',
                height: convertHeight(60),
                width: '100%',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <View style={{height: 4, width: 66, backgroundColor: 'black'}} />
              <Text style={{marginTop: 10, color: LightBlue2}}>
                Swipe up to save
              </Text>
            </View>
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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

const Star = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image source={loeyB} style={{marginRight: 5}} />
      <Text style={{color: 'white'}}> 1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
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

import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import dayjs, {Dayjs} from 'dayjs';
import {
  CommonColors,
  convertFontSize,
  convertHeight,
  convertWidth,
  DarkBlue,
} from '../../utils';

export interface MyDatePickerProps {
  open: boolean;
  callback: (date: Date) => void;
  dismiss: () => void;
  date: Dayjs;
}

export const MyDatePicker = (props: MyDatePickerProps) => {
    console.log("props.date.toString()", props.date.toString());
  return (
    <Modal
      swipeDirection={['down']}
      isVisible={props.open}
      onDismiss={() => {
        props.dismiss();
      }}
      onSwipeComplete={props.dismiss}
      style={styles.view}>
      <View style={{paddingBottom: 50, backgroundColor: DarkBlue}}>
        <Calendar
          current={props.date.toString()}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={day => {
            const d = new Date(day.year, day.month - 1, day.day, 9, 0);
            props.callback(d);
          }}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
          renderHeader={d => {
            return (
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: 'rgba(229, 249, 255, 0.08)',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: convertHeight(38),
                  width: convertWidth(150),
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '700',
                    fontSize: convertFontSize(20),
                  }}>
                  {dayjs(d).format('MM-YYYY')}
                </Text>
              </View>
            );
          }}
          theme={{
            backgroundColor: '#050D20',
            calendarBackground: '#050D20',
            textSectionTitleColor: '#A7DAF6',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: 'red',
            dayTextColor: '#F2F2F2',
            textDisabledColor: 'rgba(229, 249, 255, 0.6)',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#E5F9FF',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
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

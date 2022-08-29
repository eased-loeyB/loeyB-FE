import React, {FC} from 'react';

import dayjs, {Dayjs} from 'dayjs';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import {ColorMap} from '~/utils/Colors';

export interface MyDatePickerProps {
  open: boolean;
  callback: (date: Date) => void;
  dismiss: () => void;
  date: Dayjs;
}

const Base = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`;

const CalendarWrapper = styled.View`
  padding-bottom: 50px;
  background-color: ${ColorMap.DarkBlue};
`;

const Header = styled.View`
  width: 150px;
  height: 38px;
  margin-top: 10px;
  background-color: rgba(229, 249, 255, 0.08);
  border-radius: 8px;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${ColorMap.White};
`;

const MyDatePicker: FC<MyDatePickerProps> = ({
  open,
  callback,
  dismiss,
  date,
}) => (
  <Base
    swipeDirection={['down']}
    isVisible={open}
    onDismiss={() => {
      dismiss();
    }}
    onSwipeComplete={dismiss}>
    <CalendarWrapper>
      <Calendar
        current={date.toString()}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          const d = new Date(day.year, day.month - 1, day.day, 9, 0);
          callback(d);
        }}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
        renderHeader={d => {
          return (
            <Header>
              <HeaderText>{dayjs(d).format('MM-YYYY')}</HeaderText>
            </Header>
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
    </CalendarWrapper>
  </Base>
);

export default MyDatePicker;

import React, {FC} from 'react';

import dayjs, {Dayjs} from 'dayjs';
import {rgba} from 'polished';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import {ColorMap} from '~/utils/Colors';

export interface MyDatePickerProps {
  open: boolean;
  onChange: (date: Date) => void;
  dismiss: () => void;
  date: Dayjs;
}

const Base = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`;

const CalendarWrapper = styled.View<{bottom: number}>`
  margin-bottom: ${({bottom}) => -bottom}px;
`;

const StyledCalendar = styled(Calendar)<{bottom: number}>`
  border-radius: 24px;
  padding-top: 20px;
  padding-bottom: ${({bottom}) => bottom + 16}px;
`;

const Header = styled.View`
  display: flex;
  justify-content: center;
  background-color: rgba(230, 249, 255, 0.08);
  border-radius: 8px;
  padding: 8px 16px;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  color: ${ColorMap.White};
  text-align: center;
`;

const MyDatePicker: FC<MyDatePickerProps> = ({
  open,
  onChange,
  dismiss,
  date,
}) => {
  const {bottom} = useSafeAreaInsets();

  const dateString = date.format('YYYY-MM-DD');

  return (
    <Base
      swipeDirection={['down']}
      isVisible={open}
      onBackdropPress={dismiss}
      onSwipeComplete={dismiss}>
      <CalendarWrapper bottom={bottom}>
        <StyledCalendar
          initialDate={dateString}
          current={dateString}
          maxDate={new Date().toDateString()}
          markedDates={{[dateString]: {selected: true}}}
          onDayPress={day =>
            onChange(new Date(day.year, day.month - 1, day.day))
          }
          disableAllTouchEventsForDisabledDays
          enableSwipeMonths
          renderHeader={d => (
            <Header>
              <HeaderText>{dayjs(d).format('MMMM YYYY')}</HeaderText>
            </Header>
          )}
          bottom={bottom}
          theme={{
            backgroundColor: ColorMap.DarkBlue,
            calendarBackground: ColorMap.DarkBlue,
            textSectionTitleColor: ColorMap.LightBlue,
            selectedDayBackgroundColor: ColorMap.LightBlue2,
            selectedDayTextColor: ColorMap.DarkBlue,
            dayTextColor: '#F2F2F2',
            todayTextColor: '#F2F2F2',
            textDisabledColor: rgba(ColorMap.LightBlue2, 0.6),
            arrowColor: ColorMap.LightBlue2,
            textDayFontSize: 16,
            textDayFontWeight: '400',
            textDayHeaderFontSize: 12,
            textDayHeaderFontWeight: '400',
            'stylesheet.calendar.header': {
              week: {
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 20,
              },
            },
          }}
        />
      </CalendarWrapper>
    </Base>
  );
};

export default MyDatePicker;

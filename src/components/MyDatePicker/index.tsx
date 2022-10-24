import React, {FC, Fragment, useState} from 'react';

import dayjs, {Dayjs} from 'dayjs';
import {rgba} from 'polished';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import {ColorMap} from '~/utils/Colors';
import {deviceWidth} from '~/utils/design';

import {MONTH_LIST, YEAR_LIST} from './utils';

dayjs.locale('en');

export interface MyDatePickerProps {
  open: boolean;
  onChange: (date: Date) => void;
  dismiss: () => void;
  date: Dayjs;
}

const Base = styled(Modal)`
  justify-content: center;
  margin: 0 8px;
`;

const CalendarWrapper = styled.View<{bottom: number}>`
  margin-bottom: ${({bottom}) => -bottom}px;
`;

const StyledCalendar = styled(Calendar)<{bottom: number}>`
  border-radius: 24px;
  padding-top: 20px;
  padding-bottom: ${({bottom}) => bottom + 16}px;
`;

const Header = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  background-color: rgba(230, 249, 255, 0.08);
  border-radius: 8px;
  padding: 8px 16px;
  margin: 0 6px;
`;

const YearHeader = styled(Header)`
  width: 82px;
`;

const MonthHeader = styled(Header)`
  width: 78px;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  color: ${ColorMap.White};
  text-align: center;
`;

const Picker = styled.ScrollView<{isVisible: boolean}>`
  display: ${({isVisible}) => (isVisible ? 'flex' : 'none')};
  position: absolute;
  top: 58px;
  height: 400px;
  background-color: ${ColorMap.DarkBlue};
  border-radius: 8px;
  padding: 8px 0;
`;

const YearPicker = styled(Picker)`
  right: ${deviceWidth / 2}px;
  width: 68px;
`;

const MonthPicker = styled(Picker)`
  left: ${deviceWidth / 2 + 8}px;
  width: 112px;
`;

const PickerItem = styled.TouchableOpacity<{isSelected: boolean}>`
  display: flex;
  justify-content: center;
  background-color: ${({isSelected}) =>
    isSelected ? ColorMap.LightBlue2 : 'transparent'};
  padding: 4px 16px;
`;

const PickerItemText = styled.Text<{isSelected: boolean}>`
  font-size: 14px;
  line-height: 24px;
  color: ${({isSelected}) => (isSelected ? ColorMap.DarkBlue : ColorMap.White)};
`;

const MyDatePicker: FC<MyDatePickerProps> = ({
  open,
  onChange,
  dismiss,
  date,
}) => {
  const {bottom} = useSafeAreaInsets();

  const [openYearPicker, setOpenYearPicker] = useState(false);
  const [openMonthPicker, setOpenMonthPicker] = useState(false);

  const dateString = date.format('YYYY-MM-DD');

  const onChangeYear = (year: number): void => {
    onChange(new Date(year, date.month(), date.date()));
    setOpenYearPicker(false);
  };

  const onChangeMonth = (monthIndex: number): void => {
    onChange(new Date(date.year(), monthIndex, date.date()));
    setOpenMonthPicker(false);
  };

  return (
    <Base
      isVisible={open}
      backdropOpacity={0.1}
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
          renderHeader={d => {
            const headerDate = dayjs(d);

            return (
              <>
                <YearHeader onPress={() => setOpenYearPicker(prev => !prev)}>
                  <HeaderText>{headerDate.year()}</HeaderText>
                </YearHeader>
                <MonthHeader onPress={() => setOpenMonthPicker(prev => !prev)}>
                  <HeaderText>{headerDate.format('MMM')}</HeaderText>
                </MonthHeader>
              </>
            );
          }}
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
        <YearPicker
          isVisible={openYearPicker}
          showsVerticalScrollIndicator={false}>
          {YEAR_LIST.map(year => {
            const isSelected = year === date.year();

            return (
              <PickerItem
                key={year}
                isSelected={isSelected}
                onPress={() => onChangeYear(year)}>
                <PickerItemText isSelected={isSelected}>{year}</PickerItemText>
              </PickerItem>
            );
          })}
        </YearPicker>

        <MonthPicker
          isVisible={openMonthPicker}
          showsVerticalScrollIndicator={false}>
          {MONTH_LIST.map((month: string, monthIndex: number) => {
            const isSelected = monthIndex === date.month();

            return (
              <PickerItem
                key={month}
                isSelected={isSelected}
                onPress={() => onChangeMonth(monthIndex)}>
                <PickerItemText isSelected={isSelected}>{month}</PickerItemText>
              </PickerItem>
            );
          })}
        </MonthPicker>
      </CalendarWrapper>
    </Base>
  );
};

export default MyDatePicker;

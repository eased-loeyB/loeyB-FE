import React, {useCallback, useMemo, useRef} from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

import {ColorMap} from '~/utils/Colors';

const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: gray;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 328px;
  background-color: ${ColorMap.DarkBlue};
`;

export const PlacePicker = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // const data = [
  //   'Seoul, Korea',
  //   'Seoul, Korea',
  //   'Seoul, Korea',
  //   'Seoul, Korea',
  //   'Seoul, Korea',
  // ];
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <Container>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <Wrapper>
          {/*<FlatList*/}
          {/*  data={data}*/}
          {/*  renderItem={({item}) => {*/}
          {/*    return (*/}
          {/*      <TouchableOpacity*/}
          {/*        style={{flexDirection: 'row', paddingVertical: 8}}>*/}
          {/*        <Image source={PUBLIC} />*/}
          {/*        <Text*/}
          {/*          style={{color: LightBlue2, opacity: 0.8, marginLeft: 7}}>*/}
          {/*          {item}*/}
          {/*        </Text>*/}
          {/*      </TouchableOpacity>*/}
          {/*    );*/}
          {/*  }}*/}
          {/*/>*/}
        </Wrapper>
      </BottomSheet>
    </Container>
  );
};

import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';

import {DarkBlue} from '~/utils/Colors';
import {convertHeight} from '~/utils/design';

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
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View
          style={{
            width: '100%',
            height: convertHeight(327),
            backgroundColor: DarkBlue,
          }}>
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
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

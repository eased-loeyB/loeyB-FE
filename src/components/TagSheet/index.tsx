import React, {Children, FC, useMemo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import {rgba} from 'polished';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import {
  LoeybAreaType,
  useFetchRegisteredAreaAndCategoryAndTagQuery,
} from '~/apollo/generated';
import {AreaColorMap, ColorMap} from '~/utils/Colors';
import {SubtitleStyle, TitleStyle} from '~/utils/Styles';

import AddTagButton from './AddTagButton';

interface Props {
  selectedTags: string[];
  onSelectTag: (tag: string) => void;
}

const TagSheetTitle = styled.Text`
  ${SubtitleStyle}
  opacity: 0.3;
  text-align: center;
`;

const TagListWrapper = styled.View`
  padding: 0 12px 36px;
`;

const TagTitle = styled.Text<{color?: string}>`
  ${TitleStyle}
  font-size: 18px;
  line-height: 26px;
  ${({color}) => !!color && `color: ${color}`};
`;

const TagList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const TagItem = styled.TouchableOpacity<{color: string; isSelected?: boolean}>`
  border-radius: 20px;
  padding: 10px;
  margin: 8px 8px 0 0;
  color: ${({isSelected}) => rgba(ColorMap.White, isSelected ? 1 : 0.6)};
  background-color: ${({color, isSelected}) =>
    rgba(color, isSelected ? 0.8 : 0.2)};
`;

const TagItemText = styled.Text`
  ${SubtitleStyle}
  line-height: 17px;
`;

export const MINIMIZED_TAG_SHEET_HEIGHT = 88;

const TagSheet: FC<Props> = ({selectedTags, onSelectTag}) => {
  const {bottom} = useSafeAreaInsets();
  const [openTagSheet, setOpenTagSheet] = useState(false);

  const tagSheetRef = useRef<BottomSheet>(null);

  const minimizedHeight = useMemo(
    () => bottom + MINIMIZED_TAG_SHEET_HEIGHT,
    [bottom],
  );

  const {
    data: {fetchRegisteredAreaAndCategoryAndTag: fetchedData} = {},
    refetch,
  } = useFetchRegisteredAreaAndCategoryAndTagQuery();

  const handleTagSheetOpen = (index: number) => {
    setOpenTagSheet(index === 1);
  };

  return (
    <BottomSheet
      ref={tagSheetRef}
      index={0}
      snapPoints={[minimizedHeight, '95%']}
      onChange={handleTagSheetOpen}
      backgroundStyle={styles.tagSheetBackground}
      handleIndicatorStyle={styles.tagSheetHandle}>
      {!openTagSheet ? (
        <TagSheetTitle>Swipe up to save</TagSheetTitle>
      ) : (
        <>
          <TagListWrapper>
            <TagTitle>Recent</TagTitle>
            <TagList>
              {Children.toArray(
                /**
                 * @todo apply fetchRecentCategoryAndTag query
                 */
                ['salad', 'fried chicken'].map(tag => (
                  <TagItem
                    color={AreaColorMap[LoeybAreaType.Health]}
                    isSelected={selectedTags.includes(tag)}
                    onPress={() => onSelectTag(tag)}>
                    <TagItemText>{tag}</TagItemText>
                  </TagItem>
                )),
              )}
            </TagList>
          </TagListWrapper>

          {Children.toArray(
            Object.values(LoeybAreaType).map(area => {
              const color = AreaColorMap[area];
              const categoryAndTagList =
                fetchedData?.data?.filter(d => d.area === area) || [];

              return Children.toArray(
                categoryAndTagList.map(
                  ({category, tag: tags}) =>
                    category && (
                      <TagListWrapper>
                        <TagTitle color={color}>{category}</TagTitle>

                        <TagList>
                          {Children.toArray(
                            tags?.map(tag => (
                              <TagItem
                                color={color}
                                isSelected={selectedTags.includes(tag)}
                                onPress={() => onSelectTag(tag)}>
                                <TagItemText>{tag}</TagItemText>
                              </TagItem>
                            )),
                          )}

                          <AddTagButton
                            color={color}
                            category={category}
                            onSubmit={refetch}
                          />
                        </TagList>
                      </TagListWrapper>
                    ),
                ),
              );
            }),
          )}
        </>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  tagSheetBackground: {
    backgroundColor: ColorMap.Navy1,
    borderRadius: 50,
  },
  tagSheetHandle: {
    width: 66,
    height: 4,
    marginVertical: 12,
  },
});

export default TagSheet;

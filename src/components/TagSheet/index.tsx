import React, {
  Children,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';

import BottomSheet, {
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {useKeyboard} from '@react-native-community/hooks';
import {rgba} from 'polished';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';

import {
  AreaCategoryTagInput,
  LoeybAreaType,
  useFetchRegisteredAreaAndCategoryAndTagQuery,
} from '~/apollo/generated';
import {isSuccessResponse} from '~/apollo/utils/error';
import {updateUserData} from '~/store/reduxtoolkit/user/userSlice';
import {AreaColorMap, ColorMap} from '~/utils/Colors';
import {ContainerStyle, SubtitleStyle, TitleStyle} from '~/utils/Styles';

import AddTagButton from './AddTagButton';

interface Props {
  selectedTags: AreaCategoryTagInput[];
  onSelectTag: (input: AreaCategoryTagInput) => void;
  onSubmit: () => Promise<any>;
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

const SaveButton = styled.TouchableOpacity<{bottom: number; disabled: boolean}>`
  ${ContainerStyle}
  height: ${({bottom}) => bottom + 64}px;
  padding-bottom: ${({bottom}) => bottom}px;
  background-color: ${ColorMap.LightBlue2};
  mix-blend-mode: normal;
  opacity: ${({disabled}) => (disabled ? 0.6 : 1)};
`;

const SaveButtonText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${ColorMap.Navy};
`;

export const MINIMIZED_TAG_SHEET_HEIGHT = 88;

const TagSheet = forwardRef<BottomSheet, Props>(
  ({selectedTags, onSelectTag, onSubmit}, tagSheetRef) => {
    const {bottom} = useSafeAreaInsets();
    const {keyboardShown} = useKeyboard();
    const dispatch = useDispatch();
    const [openTagSheet, setOpenTagSheet] = useState(false);

    const minimizedHeight = useMemo(
      () => bottom + MINIMIZED_TAG_SHEET_HEIGHT,
      [bottom],
    );

    const {
      data: {fetchRegisteredAreaAndCategoryAndTag: fetchedData} = {},
      refetch,
    } = useFetchRegisteredAreaAndCategoryAndTagQuery({
      onCompleted: ({fetchRegisteredAreaAndCategoryAndTag: {data, result}}) => {
        if (isSuccessResponse(result)) {
          if (data) {
            dispatch(
              updateUserData({
                areaAndCategoryAndTags: data,
              }),
            );
          }
        }
      },
    });

    const handleTagSheetOpen = (index: number) => {
      setOpenTagSheet(index === 1);
    };

    const getIsSelectedTag = (tag: string) => {
      return !!selectedTags.find(({tag: selectedTag}) => selectedTag === tag);
    };

    const renderFooter = useCallback(
      (props: BottomSheetFooterProps) => {
        if (!openTagSheet || keyboardShown) {
          return null;
        }

        return (
          <BottomSheetFooter {...props}>
            <SaveButton
              bottom={bottom}
              disabled={selectedTags.length === 0}
              onPress={onSubmit}>
              <SaveButtonText>Save Stardust</SaveButtonText>
            </SaveButton>
          </BottomSheetFooter>
        );
      },
      [bottom, openTagSheet, keyboardShown, selectedTags, onSubmit],
    );

    return (
      <BottomSheet
        ref={tagSheetRef}
        index={0}
        snapPoints={[minimizedHeight, '95%']}
        onChange={handleTagSheetOpen}
        backgroundStyle={styles.tagSheetBackground}
        handleIndicatorStyle={styles.tagSheetHandle}
        footerComponent={renderFooter}>
        {!openTagSheet ? (
          <TagSheetTitle>Swipe up to save</TagSheetTitle>
        ) : (
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            <TagListWrapper>
              <TagTitle>Recent</TagTitle>
              <TagList>
                {Children.toArray(
                  /**
                   * @todo apply fetchRecentCategoryAndTag query
                   */
                  ([] as AreaCategoryTagInput[]).map(input => (
                    <TagItem
                      color={AreaColorMap[input.area!]}
                      isSelected={getIsSelectedTag(input.tag!)}
                      onPress={() => onSelectTag(input)}>
                      <TagItemText>{input.tag}</TagItemText>
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
                                  isSelected={getIsSelectedTag(tag)}
                                  onPress={() =>
                                    onSelectTag({
                                      area,
                                      category,
                                      tag,
                                    })
                                  }>
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
          </BottomSheetScrollView>
        )}
      </BottomSheet>
    );
  },
);

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

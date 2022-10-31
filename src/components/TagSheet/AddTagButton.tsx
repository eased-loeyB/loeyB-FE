import React, {FC, useCallback, useRef, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';

import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {rgba} from 'polished';
import styled from 'styled-components/native';

import {
  LoeybCategoryType,
  LoeybErrorCode,
  useAddTagMutation,
  useFetchRegisteredAreaAndCategoryAndTagQuery,
} from '~/apollo/generated';
import {isSuccessResponse} from '~/apollo/utils/error';
import {PLUS} from '~/assets';
import {ColorMap} from '~/utils/Colors';
import ToastService from '~/utils/ToastService';

interface Props {
  color: string;
  category: LoeybCategoryType;
  onSubmit: () => Promise<any>;
}

const AddTagItem = styled.TouchableOpacity<{color: string; active: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${({active}) => (active ? ColorMap.LightBlue2 : 'transparent')};
  background-color: ${({color}) => rgba(color, 0.2)};
  padding: 8px 10px;
  margin: 8px 8px 0 0;
`;

const AddTagItemIcon = styled.Image`
  position: absolute;
`;

const AddTagButton: FC<Props> = ({color, category, onSubmit}) => {
  const [active, setActive] = useState<boolean>(false);
  const [tag, setTag] = useState<string>('');
  const inputRef = useRef<TextInput | any>(null);

  const {data: {fetchRegisteredAreaAndCategoryAndTag: fetchedData} = {}} =
    useFetchRegisteredAreaAndCategoryAndTagQuery();

  const getTagExists = useCallback(
    (newTag: string) => {
      const {data} = fetchedData || {};
      if (!data) {
        return;
      }

      return data.find(({tag: tags}) => tags?.includes(newTag));
    },
    [fetchedData],
  );

  const checkDuplicatedTag = (): boolean => {
    const {category: foundCategory = ''} = getTagExists(tag.trim()) || {};

    if (foundCategory) {
      ToastService.showError(`The tag already exsists in ${foundCategory}`);
      return false;
    }

    return true;
  };

  const [addTag] = useAddTagMutation({
    onCompleted: async ({addTag: {result}}) => {
      if (isSuccessResponse(result)) {
        ToastService.showSuccess('Tag created!');
        await onSubmit();
      } else if (result === LoeybErrorCode.AlreadyRegisteredTag) {
        checkDuplicatedTag();
      } else {
        ToastService.showError('Failed to create the tag. Please try again');
      }
    },
    onError: () => {
      ToastService.showError('Failed to create the tag. Please try again');
    },
  });

  const onClick = () => {
    inputRef.current?.focus();
  };

  const onFocus = () => setActive(true);

  const onBlur = async () => {
    setActive(false);

    if (tag.trim() && checkDuplicatedTag()) {
      await addTag({
        variables: {
          category,
          tag: tag.trim(),
        },
      });
    }

    setTag('');
  };

  return (
    <AddTagItem color={color} active={active} onPress={onClick}>
      <>
        {!active && !tag && <AddTagItemIcon source={PLUS} />}
        <BottomSheetTextInput
          ref={inputRef}
          style={styles.textInput}
          value={tag}
          onChangeText={setTag}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </>
    </AddTagItem>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 14,
    lineHeight: 17,
    color: ColorMap.White,
  },
});

export default AddTagButton;

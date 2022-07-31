import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageRequireSource,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {find, remove} from 'lodash';

import {convertFontSize, convertHeight, convertWidth} from '~/utils/design';

export interface SubCategoryProps {
  title: string;
  image: ImageRequireSource;
}

export interface CategoryProps {
  title: string;
  child: SubCategoryProps[];
  style: StyleProp<any>;
  callback: (o: SubCategoryProps[]) => void;
}

export const Category = (props: CategoryProps) => {
  const [selected, setSetected] = useState<SubCategoryProps[]>([]);
  const [focusUpdate, setFocusUpdate] = useState(false);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View
        style={{
          width: convertWidth(60),
          height: convertHeight(28),
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}>
        <Text
          style={{
            color: props.style.color,
            fontSize: convertFontSize(12),
            fontWeight: '500',
          }}>
          {props.title}
        </Text>
      </View>
      <FlatList
        data={props.child ?? []}
        keyExtractor={item => `${item.title}`}
        scrollEnabled={false}
        extraData={focusUpdate}
        renderItem={({item}) => {
          const isSelected = !!find(selected, i => i.title === item.title);
          return CategoryItem(
            item,
            isSelected,
            () => {
              const currentList = [...selected];
              if (isSelected) {
                remove(currentList, i => i.title === item.title);
              } else {
                currentList.push(item);
              }
              setSetected(currentList);
              setFocusUpdate(!focusUpdate);
              props.callback(currentList);
            },
            props.style,
          );
        }}
      />
    </View>
  );
};

const CategoryItem = (
  item: SubCategoryProps,
  isSelected: boolean,
  callback: () => void,
  style: any,
) => {
  const opacity = isSelected ? 1 : 0.4;
  console.log('isSelected', isSelected, opacity);
  return (
    <TouchableOpacity
      onPress={() => {
        callback();
      }}>
      <View
        style={{
          alignItems: 'center',
          marginTop: convertHeight(25),
          opacity: opacity,
        }}>
        <Image source={item.image} />
        <Text
          style={{
            fontSize: 10,
            fontWeight: '600',
            marginTop: 5,
            color: style.color,
          }}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

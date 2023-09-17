import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {Add, Complated, UnComplated} from '@/assets/index';
import {actions} from '@/utils/redux/reducer/bottomRedux';
import * as ThemeAction from '@/utils/redux/reducer/ThemeRedux';
import {useDispatch} from 'react-redux';
import {enableFreeze, enableScreens} from 'react-native-screens';

enableScreens(true);
enableFreeze(true);

const HomeScreen = () => {
  const data = [
    {title: '1'},
    {title: '2'},
    {title: '1'},
    {title: '2'},
    {title: '1'},
    {title: '2'},
    {title: '1'},
    {title: '2'},
    {title: '1'},
    {title: '2'},
    {title: '1'},
    {title: '2'},
    {title: '1'},
    {title: '2'},
    {title: '1'},
    {title: '2'},
    {title: '1'},
    {title: '2'},
    {title: '1'},
    {title: '2'},
    {title: '1'},
    {title: '2'},
    {title: '1'},
    {title: '2'},
  ];
  const dispatch = useDispatch();

  // const {toggleColorScheme, colorScheme} = useColorScheme();

  return (
    <View className="flex flex-1 bg-white dark:bg-[#141419]">
      <View className="ml-4 mr-4">
        <View className="mt-8">
          <Text className="font-bold text-[32px] text-black dark:text-white">
            Eylül, 14 2023
          </Text>
        </View>
        <View className="mt-2">
          <Text className=" font-semibold text-sm dark:text-[#575767] opacity-[.3] dark:opacity-100">
            5 tamamlanmadı, 5 tamamlanacak
          </Text>
        </View>
        <View className="border-2 mt-4 bg-[#D0D0D0] dark:bg-[#575767] rounded-2xl h-[2px] opacity-[.3]" />
        <View className="mt-4">
          <Text className="text-lg font-bold text-[#575767] dark:text-white">
            Tamamlanmadı
          </Text>
        </View>
        <ScrollView className="h-3/6">
          {data.map((r: any, index: any) => {
            return (
              <View className="mt-4" key={index}>
                <View className="flex-row items-center">
                  <TouchableOpacity activeOpacity={0.5}>
                    <UnComplated />
                  </TouchableOpacity>

                  <Text className="ml-4 font-medium text-lg text-[#575767] dark:text-white">
                    {r.title}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View className="felx">
          <View className="mt-4">
            <Text className="text-lg font-bold text-[#575767] dark:text-white">
              Tamamlandı
            </Text>
          </View>
          <ScrollView className=" h-3/6">
            {data.map((r: any, index: any) => {
              return (
                <View className="mt-4" key={index}>
                  <View className="flex-row items-center">
                    <TouchableOpacity className="flex" activeOpacity={0.5}>
                      <View className="rounded-md">
                        <Complated />
                      </View>
                    </TouchableOpacity>

                    <Text className="ml-4 font-medium text-lg text-[#575767] line-through dark:text-white">
                      {r.title}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      {/* <TouchableOpacity
        onPress={() => {
          ThemeAction.actions.setDarkTheme(dispatch, colorScheme);
          toggleColorScheme();
        }}>
        <Text className="text-black dark:text-white">Tema</Text>
      </TouchableOpacity> */}
      <View className=" w-14 h-14 rounded-full bg-red-500 absolute bottom-3 right-3">
        <TouchableOpacity
          className="flex flex-1  justify-center items-center"
          onPress={() => {
            actions.changeBottom(dispatch, 1, true);
          }}>
          <Add />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

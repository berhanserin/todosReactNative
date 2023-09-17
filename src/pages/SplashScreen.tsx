import {View, Text, TouchableOpacity} from 'react-native';
import {useColorScheme} from 'nativewind';
import React from 'react';
import {useDispatch} from 'react-redux';
import {actions} from '@/utils/redux/reducer/ThemeRedux';

const SplashScreen = () => {
  const dispatch = useDispatch();
  const {toggleColorScheme, colorScheme} = useColorScheme();

  return (
    <View className="flex-1 flex bg-white dark:bg-black">
      <Text className="text-black dark:text-white">SplashScreen</Text>
      <TouchableOpacity
        onPress={() => {
          actions.setDarkTheme(dispatch, colorScheme);
          toggleColorScheme();
        }}>
        <Text className="text-black dark:text-white">Tema</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;

import React, {useEffect} from 'react';
import Root from '@/root';
import {Platform, SafeAreaView, StatusBar} from 'react-native';
import {useColorScheme} from 'nativewind';
import {Provider} from 'react-redux';
import store from '@/utils/redux/store';
import {SettingService} from '@/models/setting';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const {colorScheme, setColorScheme} = useColorScheme();

  useEffect(() => {
    StatusBar.setBarStyle(
      colorScheme === 'light' ? 'dark-content' : 'light-content',
    );
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(
        colorScheme === 'dark' ? 'rgba(255,255,255,0)' : 'rgba(0,0,0,0)',
      );
      StatusBar.setTranslucent(true);
    }
  }, [colorScheme]);

  useEffect(() => {
    let theme = SettingService.find('theme');
    if (!theme) {
      SettingService.save('theme', String(colorScheme));
    }
    setColorScheme(theme.toJSON().value === 'dark' ? 'light' : 'dark');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <SafeAreaView className="flex flex-1 bg-white dark:bg-[#141419]">
          <Root />
        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

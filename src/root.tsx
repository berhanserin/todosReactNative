/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@/pages/HomeScreen';
import {actions} from '@/utils/redux/reducer/bottomRedux';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import TodoAdd from '@/pages/TodoAdd';
import {View} from 'react-native';

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Todo"
          options={{presentation: 'modal'}}
          component={TodoAdd}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Roots = () => {
  return (
    <BottomSheetModalProvider>
      <Root />
      <BottomModal className=" shadow-2xl shadow-black" />
    </BottomSheetModalProvider>
  );
};

const BottomModal = (props: any) => {
  const [page, setPage] = useState<Number>(0);
  const [status, setStatus] = useState<Boolean>(false);
  const dispath = useDispatch();
  const counter = useSelector(
    (state: {bottom: {show: Boolean; pages: Number}}) => state.bottom,
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['25%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeBottom = () => {
    bottomSheetModalRef.current?.present();
    bottomSheetModalRef.current?.snapToIndex(-1);
    actions.changeBottom(dispath, 0, false);
  };

  useEffect(() => {
    if (counter.show) {
      bottomSheetModalRef.current?.snapToIndex(0);
      bottomSheetModalRef.current?.present();
      setPage(counter.pages);
      setStatus(counter.show);
    } else if (counter.show === false) {
      bottomSheetModalRef.current?.forceClose();
      bottomSheetModalRef.current?.dismiss();

      setStatus(counter.show);
      setPage(counter.pages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter.show]);

  useEffect(() => {
    handlePresentModalPress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    setPage(counter.pages);
  }, [counter.pages]);

  useEffect(() => {
    if (counter.pages === 0) {
      closeBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter.pages]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enablePanDownToClose
      style={[props.style, {}]}
      onChange={r => {
        if (r === -1) {
          closeBottom();
        }
      }}
      index={-1}
      snapPoints={snapPoints}>
      <View className="flex flex-1 bg-white dark:bg-[#141419]">
        <Page page={page} closeBottom={closeBottom} />
      </View>
    </BottomSheetModal>
  );
};

const Page = (props: any) => {
  if (props.page === 1) {
    return <TodoAdd closeBottom={props.closeBottom} />;
  } else if (props.page === 0) {
    return null;
  }
};

export default Roots;

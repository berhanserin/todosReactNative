import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {Formik} from 'formik';

const TodoAdd = (props: any) => {
  return (
    <View className="ml-4 mr-4 flex flex-1 ">
      <Formik
        initialValues={{email: ''}}
        onSubmit={values => {
          props.closeBottom();
          // props.navigation.navigate('Home');

          console.log(values);
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View className="flex flex-1">
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-red-900 rounded-2xl justify-center items-center w-28 pt-2 pb-2"
              onPress={() => handleSubmit()}>
              <Text className="text-white dark:text-black">Kaydet</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default TodoAdd;

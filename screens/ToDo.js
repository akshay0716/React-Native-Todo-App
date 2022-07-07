import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ToDo({navigation}) {
  return (
    <View style={styles.body}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Add-task')}>
        <FontAwesome5 name={'plus'} size={35} color={'#ffffff'}></FontAwesome5>
      </TouchableOpacity>

      <Text>ToDosad</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // width: '100%',
    // height: '100%',
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#0080ff',
    borderRadius: 30,
    elevation: 5,
    position: 'absolute',
    right: 20,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

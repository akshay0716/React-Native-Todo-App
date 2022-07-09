import {StyleSheet, Text, View, Image, Button, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

// PUSH NOTIFICATIONS
import PushNotification from 'react-native-push-notification';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  // const {name, age} = useSelector(state => state.user);

  useEffect(() => {
    createChannel();
    setTimeout(() => {
      navigation.replace('My Tasks');
    }, 2000);
  }, []);

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'task-channel',
      channelName: 'Task Channel',
    });
  };

  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require('../assets/checklist.png')}></Image>
      {/* <Text style={styles.text}>Async Storage</Text> */}
      <Text style={styles.text}>To Do App</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20,
  },
  text: {
    fontSize: 40,
    color: '#ffffff',
  },
  inputSection: {
    marginTop: 130,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#555',
    backgroundColor: '#ffffff',
    // marginTop: 130,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
  },
});

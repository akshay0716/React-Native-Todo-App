import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTasks, setTaskId} from '../src/redux/action';

export default function ToDo({navigation}) {
  const dispatch = useDispatch();
  const {tasks} = useSelector(state => state.taskReducer);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    AsyncStorage.getItem('Tasks')
      .then(task => {
        let parsedTasks = JSON.parse(task);
        if (parsedTasks && typeof parsedTasks === 'object') {
          dispatch(setTasks(parsedTasks));
        }
      })
      .catch(err => console.log(err));
  };

  console.log('tasks', tasks);

  return (
    <View style={styles.body}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(setTaskId(tasks.length + 1));
          navigation.navigate('Add-task');
        }}>
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

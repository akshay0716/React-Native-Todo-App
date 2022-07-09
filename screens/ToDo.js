import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTasks, setTaskId} from '../src/redux/action';
import CheckBox from '@react-native-community/checkbox';

export default function ToDo({navigation}) {
  const dispatch = useDispatch();
  const {tasks} = useSelector(state => state.taskReducer);

  useEffect(() => {
    // alert('getTask');
    getTasks();
  }, []);

  // useEffect(() => {
  //   // alert('getTask');
  //   getTasks();
  // }, [checkBox]);

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

  const deleteTask = taskId => {
    let filteredTasks = tasks.filter(task => task.id !== taskId);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        Alert.alert('Success', 'Task removed successfully');
        dispatch(setTasks(filteredTasks));
      })
      .catch(err => console.log(err));
  };

  const setTaskStatus = (id, newValue) => {
    let index = tasks.findIndex(task => task.id === id);

    if (index > -1) {
      let newTasks = [...tasks];
      newTasks[index]['done'] = newValue;
      console.log('newTasks', newTasks);
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(task => {
          dispatch(setTasks(newTasks));
          Alert.alert('Success', 'Task status changed sucessfully');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <View style={styles.body}>
      <FlatList
        data={tasks.filter(task => task.done === false)}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              dispatch(setTaskId(item.id));
              navigation.navigate('Add-task');
            }}>
            <View style={styles.item_row}>
              <View
                style={[styles.color, {backgroundColor: item.color}]}></View>
              <CheckBox
                disabled={false}
                value={item.done}
                onValueChange={newValue => {
                  setTaskStatus(item.id, newValue);
                }}
              />
              <View style={styles.item_body}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <TouchableOpacity
                onPress={() => deleteTask(item.id)}
                style={styles.delete}>
                <FontAwesome5 name={'trash'} color={'#f03636'} size={25} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(setTaskId(tasks.length + 1));
          navigation.navigate('Add-task');
        }}>
        <FontAwesome5 name={'plus'} size={35} color={'#ffffff'}></FontAwesome5>
      </TouchableOpacity>
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
  item: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 5,
    backgroundColor: '#ffffff',
    elevation: 5,
    borderRadius: 10,
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: '#000000',
    margin: 5,
    fontWeight: '500',
  },
  description: {
    fontSize: 20,
    color: '#999999',
    margin: 5,
  },
  delete: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  color: {
    width: 20,
    height: '100%',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
});

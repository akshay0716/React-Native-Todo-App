import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from './common/CustomButton';
import {setTasks} from '../src/redux/action';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

export default function AddTasks({navigation}) {
  const dispatch = useDispatch();
  const {tasks, taskId} = useSelector(state => state.taskReducer);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    let task = tasks.find(task => task.id === taskId);
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDone(task.done);
    }
  };

  const saveTaskHandler = () => {
    if (title.length === 0) {
      Alert.alert('Warning', 'Please enter title for your task');
    } else {
      try {
        let Task = {
          id: taskId,
          title: title,
          description: description,
          done: done,
        };

        let index = tasks.findIndex(task => task.id === taskId);
        let newTasks = [];
        if (index > -1) {
          newTasks = [...tasks];
          newTasks[index] = Task;
        } else {
          newTasks = [...tasks, Task];
        }

        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(task => {
            dispatch(setTasks(newTasks));
            Alert.alert('Success', 'Task saved successfully');
            navigation.goBack();
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View style={styles.body}>
      <TextInput
        value={title}
        style={styles.input}
        placeholder="Title"
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        value={description}
        style={styles.input}
        placeholder="Description"
        onChangeText={value => setDescription(value)}
      />
      <View style={styles.checkbox}>
        <CheckBox
          disabled={false}
          value={done}
          onValueChange={newValue => setDone(newValue)}
        />
        <Text>Is Done</Text>
      </View>

      <CustomButton
        onPress={saveTaskHandler}
        title="Save Task"
        style={styles.button}
        fontSize={20}
        color={'#ffffff'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {flex: 1, padding: 10},
  input: {
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    borderRadius: 10,
    borderColor: 'gray',
    margin: 10,
  },
  button: {
    backgroundColor: '#1eb900',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

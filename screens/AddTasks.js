import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from './common/CustomButton';
import {setTasks} from '../src/redux/action';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// PUSH NOTIFICATIONS
import PushNotification from 'react-native-push-notification';

export default function AddTasks({navigation}) {
  const dispatch = useDispatch();
  const {tasks, taskId} = useSelector(state => state.taskReducer);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [done, setDone] = useState(false);
  const [color, setColor] = useState('white');
  const [modal, setBellModal] = useState(false);
  const [bellTime, setBellTime] = useState('1');

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    let task = tasks.find(task => task.id === taskId);
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDone(task.done);
      setColor(task.color);
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
          color: color,
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

  const setAlarm = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'task-channel',
      title: title,
      message: description,
      date: new Date(Date.now() + parseInt(bellTime) * 60 * 1000),
      allowWhileIdle: true,
    });
  };
  return (
    <View style={styles.body}>
      <Modal
        visible={modal}
        transparent
        onRequestClose={() => setBellModal(false)}
        animationType="slide"
        hardwareAccelerated>
        <View style={styles.center_viewed}>
          <View style={styles.bellModel}>
            <View style={styles.modalBody}>
              <Text style={styles.text}>Remind me after</Text>
              <TextInput
                style={styles.bell_input}
                keyboardType="numeric"
                value={bellTime}
                onChangeText={newValue => setBellTime(newValue)}
              />
              <Text style={styles.text}>munite(s)</Text>
            </View>
            <View style={styles.modalButton}>
              <TouchableOpacity
                onPress={() => {
                  setBellModal(false), setAlarm();
                }}
                style={styles.bellModalButton}>
                <Text>Ok</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setBellModal(false)}
                style={styles.bellModalButton}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

      <View style={styles.color_bar}>
        <TouchableOpacity
          onPress={() => setColor('white')}
          style={styles.color_white}>
          {color === 'white' && (
            <FontAwesome5 name={'check'} color={'#000000'} size={25} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setColor('blue')}
          style={styles.color_blue}>
          {color === 'blue' && (
            <FontAwesome5 name={'check'} color={'#000000'} size={25} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setColor('red')}
          style={styles.color_red}>
          {color === 'red' && (
            <FontAwesome5 name={'check'} color={'#000000'} size={25} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setColor('green')}
          style={styles.color_green}>
          {color === 'green' && (
            <FontAwesome5 name={'check'} color={'#000000'} size={25} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.extra_row}>
        <TouchableOpacity
          style={styles.extra_button}
          onPress={() => setBellModal(true)}>
          <FontAwesome5 name={'bell'} size={25} color={'#ffffff'} />
        </TouchableOpacity>
      </View>
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
  color_bar: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'darkgray',
    height: 50,
    margin: 10,
    borderRadius: 10,
  },
  color_white: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  color_blue: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  color_red: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  color_green: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  extra_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: 50,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#0080ff',
  },
  extra_button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center_viewed: {
    flex: 1,
    backgroundColor: '#00000099',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellModel: {
    width: 300,
    height: 200,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  modalBody: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRifRadius: 10,
  },
  bell_input: {
    width: 50,
    borderColor: '#555555',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  bellModalButton: {
    flex: 1,
    borderWidth: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
  },
});

import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ToDo from './screens/ToDo';
import Splash from './screens/Splash';
import Done from './screens/Done';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import Map from './screens/Map';
import CameraComponent from './screens/CameraComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AddTasks from './screens/AddTasks';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const MaterialBottomTab = createMaterialBottomTabNavigator();
// const MaterialTopTabs = createMaterialTopTabNavigator();
// const DrawerNavigation = createDrawerNavigator();

function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#0080ff',
        tabBarInActiveTintColor: '#777777',
        tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
        headerShown: false,
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'To-do') {
            iconName = 'clipboard-list';
            size = focused ? 25 : 20;
          } else if (route.name === 'Done') {
            iconName = 'clipboard-check';
            size = focused ? 25 : 20;
          }
          return (
            <FontAwesome5
              name={iconName}
              size={size}
              color={color}></FontAwesome5>
          );
        },
      })}>
      <Tab.Screen name="To-do" component={ToDo}></Tab.Screen>
      <Tab.Screen name="Done" component={Done}></Tab.Screen>
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* STACK NAVIGATION */}

        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#0080ff',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: 'bold',
            },
          }}>
          <RootStack.Screen
            name="Splash"
            options={{headerShown: false}}
            component={Splash}
          />
          <RootStack.Screen name="My Tasks" component={HomeTab} />
          <RootStack.Screen
            name="Add-task"
            component={AddTasks}></RootStack.Screen>
        </RootStack.Navigator>

        {/* BOTTOM TAB NAVIGATION */}

        {/* <BottomTab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'Screen A') {
              return (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              );
            } else {
              return (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              );
            }
          },
        })}>
        <BottomTab.Screen name="Screen A" component={ScreenA} />
        <BottomTab.Screen name="Screen B" component={ScreenB} />
      </BottomTab.Navigator> */}

        {/* MATERIAL BOTTOM TAB */}

        {/* <MaterialBottomTab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'Screen A') {
              return (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              );
            } else {
              return (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              );
            }
          },
        })}>
        <MaterialBottomTab.Screen name="Screen A" component={ScreenA} />
        <MaterialBottomTab.Screen name="Screen B" component={ScreenB} />
      </MaterialBottomTab.Navigator> */}

        {/* MATERIAL TOP TABS */}

        {/* <MaterialTopTabs.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'Screen A') {
              return (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              );
            } else {
              return (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              );
            }
          },
        })}>
        <MaterialTopTabs.Screen name="Screen A" component={ScreenA} />
        <MaterialTopTabs.Screen
          name="Screen B"
          component={ScreenB}
          initialParams={{itemId: ''}}
        />
      </MaterialTopTabs.Navigator> */}

        {/* DRAWER NAVIGATION */}

        {/* <DrawerNavigation.Navigator>
        <DrawerNavigation.Screen name="Screen A" component={ScreenA} />
        <DrawerNavigation.Screen name="Screen B" component={ScreenB} />
      </DrawerNavigation.Navigator> */}
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: 'black',
    // margin: 10,
    fontSize: 30,
  },
  input: {
    marginTop: 20,
    borderWidth: 1,
  },
  button: {
    marginTop: 20,
    borderWidth: 1,
    width: 300,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'blue',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

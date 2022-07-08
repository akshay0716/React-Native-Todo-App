import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({title, style, onPress, fontSize, color}) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={{fontSize: fontSize, color: color}}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

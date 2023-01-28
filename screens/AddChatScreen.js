import React, { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Input } from '@rneui/base';
import { Icon } from "react-native-vector-icons/FontAwesome";
import { db } from '../firebase';

export const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new Chat',
      headerBackTitle: 'Chats'
    })
  }, [])

  const createChat = async () => {
    await db.collection('chats').add({
      chatName: input
    }).then(() => {
      navigation.goBack();
    }).catch((error) => alert(error));
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter a chat name'
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
      // leftIcon={
      //   <Icon name="wechat" type="antdesign" size={24} color="black" />
      // }
      />
      <Button onPress={createChat} title='Create new Chat' />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    height: "100%"
  }
})
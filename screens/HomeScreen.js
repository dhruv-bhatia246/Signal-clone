import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { CustomListItem } from '../Components/CustomListItem';
import { Avatar } from "@rneui/base";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

export const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutUser = (auth) => {
    auth.signOutUser().then(() => {
      navigation.replace('Login');
    });
  }

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => <View style={{ marginLeft: 20 }}>
        <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
          <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
        </TouchableOpacity>
      </View>,
      headerRight: () =>
        <View
          style={{
            marginRight: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80
          }}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' color='black' size='24' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddChat')}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name='pencil' color='black' size='24' />
          </TouchableOpacity>
        </View>
    });
  }, [])

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName
    });
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
import React, { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, RootTagContext, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, TextInput, Keyboard } from 'react-native'
import { Avatar } from "@rneui/base";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar';
import { db, auth } from '../firebase';
import * as firebase from 'firebase/compat';

export const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Avatar
            rounded
            source={{ uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" }}
          />
          <Text
            style={{ color: "white", marginLeft: 10, fontWeight: "700" }}
          >{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 70,
            marginRight: 10
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigation.goBack}>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )
    })
  })

  const sendMessage = () => {
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    })

    setInput('');
  }

  useLayoutEffect(() => {
    const unsubscribe = db.collection("chats").doc(route.params.id).collection("messages").orderBy('timestamp', 'asc').onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data()
    }))))

    return unsubscribe;
  }, [route])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.receiver}>
                  <Text style={styles.receiverText}>{data.message}</Text>
                </View>
              ) : (
                <View key={id} style={styles.sender}>
                  <Text style={styles.senderText}>{data.message}</Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              value={input}
              onSubmitEditing={sendMessage}
              placeholder='New Message'
              style={styles.textInput}
              onChangeText={(text) => setInput(text)}
            />
            <TouchableOpacity opacity={0.5} onPress={sendMessage}>
              <Ionicons name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative"
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative"
  },
  senderText: {
    color: "white",
    fontWeight: "500"
  },
  receiverText: {
    fontWeight: "500",
  }
})
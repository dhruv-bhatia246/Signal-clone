import React, { useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image, Text } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import Logo from '../logo.png';
import { auth } from "../firebase";

export const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgURL, setImgURL] = useState("");

  const register = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: imgURL || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
        });
      }).catch(error => alert(error.message))
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Full Name'
          autoFocus
          type="text"
          value={name}
          onChangeText={text => setName(text)}
        />
        <Input
          placeholder='Email'
          type="email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder='Password'
          type="password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Input
          placeholder='Profile Picture URL (Optional)'
          type="text"
          value={imgURL}
          onChangeText={text => setImgURL(text)}
        />
      </View>
      <Button
        raised
        onPress={register}
        title="Register"
        containerStyle={styles.button}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white'
  },
  inputContainer: {
    width: 300
  },
  button: {
    width: 200,
    marginTop: 10
  }
})
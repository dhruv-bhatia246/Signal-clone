import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import Logo from '../logo.png';
import { auth } from "../firebase";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, [])

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error));
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={{ uri: "https://seeklogo.com/images/S/signal-logo-20A1616F60-seeklogo.com.png" }}
        style={{ width: 150, height: 150, margin: 20 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder='Email'
          autoFocus
          type="email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          placeholder='Password'
          secureTextEntry
          type="password"
          value={password}
          onChangeText={text => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>

      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button containerStyle={styles.button} onPress={() => navigation.navigate('Register')} type="outline" title="Register" />
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
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreen } from './HomeScreen';

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

export default function MainScreen() {

  const Tab = createMaterialTopTabNavigator();
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        tabBarOptions={{
          labelStyle: { color: "white" },
          style: { backgroundColor: "#1b1b21", marginTop: insets.top }
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="LeetCode" component={SettingsScreen} />
        <Tab.Screen name="CodeChef" component={SettingsScreen} />
        <Tab.Screen name="Codeforces" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
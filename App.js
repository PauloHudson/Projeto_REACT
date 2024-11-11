import React from "react";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Container, TitleList } from './styles/adm';
import Principal from './screens/Principal';
import Cadastro from './screens/Cadastro';
import Tela3 from './screens/Tela3';
import Tela4 from './screens/Tela4';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Nav2() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Principal} />
      <Stack.Screen name="Tela3" component={Tela3} />
      <Stack.Screen name="Tela4" component={Tela4} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Login"
          component={Nav2}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home-account" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Criar Usuário"
          component={Cadastro}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-details" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Principal from './screens/Principal';
import Cadastro from './screens/Cadastro';
import Tela3 from './screens/Tela3';
import Tela4 from './screens/Tela4';
import Edicao from './screens/Edicao';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LoginStack() {
   return (
      <Stack.Navigator>
         <Stack.Screen 
            name="Login" 
            component={Principal} 
            options={{ headerShown: false }} 
         />
         <Stack.Screen 
            name="Tela3" 
            component={Tela3} 
            options={{ headerShown: false }}
         />
         <Stack.Screen 
            name="Tela4" 
            component={Tela4} 
            options={{ headerShown: false }}
         />
         <Stack.Screen 
            name="Edicao" 
            component={Edicao} 
            options={{ headerShown: false }} 
         />
      </Stack.Navigator>
   );
}

export default function App() {
   return (
      <NavigationContainer>
         <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
               name="Login"
               component={LoginStack}
               options={{
                  tabBarIcon: ({ color, size }) => (
                     <MaterialCommunityIcons name="home-account" color={color} size={size} />
                  ),
               }}
            />
            <Tab.Screen
               name="Cadastro"
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

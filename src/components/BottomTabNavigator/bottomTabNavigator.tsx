import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import CreateAd from '../PostAd/CreateAd'; 
const Stack = createStackNavigator();

function HomeTab() {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Mas Mobile" component={CreateAd} />  
  </Stack.Navigator>
  );
} 
   

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Mas Mobile Billing"
        component={HomeTab}
        options={{
          tabBarLabel: 'Mas Mobile Billing  ',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
     
    </Tab.Navigator>
  );
}

export default function BottomNavigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}


import React from 'react';
import { createAppContainer } from 'react-navigation'; 
import BottomNavigation from './src/components/BottomTabNavigator/bottomTabNavigator';

// export default createAppContainer(AppNavigator);

export default function App() {
    return (
       <BottomNavigation />
    );
  }

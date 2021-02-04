// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import { createAppContainer } from 'react-navigation'; 
import BottomNavigation from './src/components/BottomTabNavigator/bottomTabNavigator';

// export default createAppContainer(AppNavigator);

export default function App() {
    return (
       <BottomNavigation />
    );
  }

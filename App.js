import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// https://oblador.github.io/react-native-vector-icons/
// use this link to find icons
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from './src/screens/Home';
import Lots from './src/screens/Lots';
import Settings from './src/screens/Settings'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (

    //weird bs for the icons
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'local-parking'; // Change this to the actual name of your home icon
          } 
          else if (route.name === 'Lots') {
            iconName = 'format-list-bulleted'; // Change this to the actual name of your settings icon
          }
          else if (route.name === 'Settings') {
            iconName = 'settings'; // Change this to the actual name of your settings icon
          }

          // You can return any component here, not just icons
          return <Icon name={iconName} size={30} color={color} />;
        },
        tabBarShowLabel: false
      })}
    >

      {/* Actual tabs */}
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Lots" component={Lots} />
      <Tab.Screen name="Settings" component={Settings} />


    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

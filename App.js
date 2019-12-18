import HomeScreen from './lib/screens/HomeScreen'
import DetalsScreen from './lib/screens/DetalsScreen'
import { createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const App = createAppContainer(
  createStackNavigator({ 
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        header: null
      },
    },
    Detals: {
      screen: DetalsScreen,
    },
  })
);

export default App;

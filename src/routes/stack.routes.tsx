import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Confirmation from '../pages/Confirmation';
import { MyPlants } from '../pages/MyPlants';
import PlantSave from '../pages/PlantSave';
import { PlantSelect } from '../pages/PlantSelect';
import UserIdentification from '../pages/UserIdentification';
import Welcome from '../pages/Welcome';
import colors from '../styles/colors';
import AuthRoutes from './tab.routes';

const { Navigator, Screen } = createStackNavigator();

const StackRoutes: React.FC = () => (
  <Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <Screen name="Welcome" component={Welcome} />
    <Screen name="UserIdentification" component={UserIdentification} />
    <Screen name="Confirmation" component={Confirmation} />
    <Screen name="PlantSelect" component={AuthRoutes} />
    <Screen name="PlantSave" component={PlantSave} />
    <Screen name="MyPlants" component={AuthRoutes} />
  </Navigator>
);
export default StackRoutes;

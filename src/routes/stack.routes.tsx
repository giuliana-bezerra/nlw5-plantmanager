import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Confirmation from '../pages/Confirmation';
import PlantSave from '../pages/PlantSave';
import colors from '../styles/colors';
import AuthRoutes from './tab.routes';

const { Navigator, Screen } = createStackNavigator();

function StackRoutes() {
  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Screen name="PlantSelect" component={AuthRoutes} />
      <Screen name="PlantSave" component={PlantSave} />
      <Screen name="MyPlants" component={AuthRoutes} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
export default StackRoutes;

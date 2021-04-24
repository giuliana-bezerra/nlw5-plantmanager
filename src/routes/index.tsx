import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import AuthRoutes from './auth.routes';
import StackRoutes from './stack.routes';

const Routes = () => {
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    console.log('Começou...');
    AsyncStorage.getItem('@plantmanager:user').then((user) =>
      user ? setHasOnboarded(true) : setHasOnboarded(false)
    );
  }, [hasOnboarded]);

  return (
    <NavigationContainer>
      {hasOnboarded ? (
        <StackRoutes />
      ) : (
        <AuthRoutes setHasOnboarded={setHasOnboarded} />
      )}
    </NavigationContainer>
  );
};

export default Routes;

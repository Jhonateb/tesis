import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';


import MenuTabs from './src/navegacion/MenuTabs';
import NavegadorAuth from './src/navegacion/NavegadorAuth';

const auth = getAuth();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber; 
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <MenuTabs /> : <NavegadorAuth />}
    </NavigationContainer>
  );
}
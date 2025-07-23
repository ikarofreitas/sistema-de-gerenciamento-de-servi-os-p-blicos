import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserCadastroScreen from './src/screens/UserCadastroScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro">
        <Stack.Screen
          name="Cadastro"
          component={UserCadastroScreen}
          options={{ title: 'Cadastro de Usuário' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

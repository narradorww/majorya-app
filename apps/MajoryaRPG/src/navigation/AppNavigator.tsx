import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { HomeScreen } from '../screens/HomeScreen';
import { PlayerHomeScreen } from '../screens/player/PlayerHomeScreen';
import { CharacterSheetScreen } from '../screens/player/CharacterSheetScreen';
import { InventoryScreen } from '../screens/player/InventoryScreen';
import { EncountersScreen } from '../screens/player/EncountersScreen';
import { GmHomeScreen } from '../screens/gm/GmHomeScreen';
import { SessionsScreen } from '../screens/gm/SessionsScreen';
import { AdventuresScreen } from '../screens/gm/AdventuresScreen';
import { NpcsScreen } from '../screens/gm/NpcsScreen';
import { CreaturesScreen } from '../screens/gm/CreaturesScreen';
import { MapsScreen } from '../screens/gm/MapsScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { authService } from '../services/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { View, ActivityIndicator } from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  PlayerHome: undefined;
  PlayerCharacterSheet: undefined;
  PlayerInventory: undefined;
  PlayerEncounters: undefined;
  GmHome: undefined;
  GmSessions: undefined;
  GmAdventures: undefined;
  GmNpcs: undefined;
  GmCreatures: undefined;
  GmMaps: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = authService.onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={user ? "Home" : "Login"}
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
        contentStyle: { backgroundColor: colors.background },
        headerShown: true,
      }}
    >
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PlayerHome" component={PlayerHomeScreen} options={{ title: 'Jogador' }} />
          <Stack.Screen
            name="PlayerCharacterSheet"
            component={CharacterSheetScreen}
            options={{ title: 'Ficha do Personagem' }}
          />
          <Stack.Screen name="PlayerInventory" component={InventoryScreen} options={{ title: 'Bornel' }} />
          <Stack.Screen name="PlayerEncounters" component={EncountersScreen} options={{ title: 'Encontros' }} />
          <Stack.Screen name="GmHome" component={GmHomeScreen} options={{ title: 'Mestre' }} />
          <Stack.Screen name="GmSessions" component={SessionsScreen} options={{ title: 'Sessões' }} />
          <Stack.Screen name="GmAdventures" component={AdventuresScreen} options={{ title: 'Aventuras' }} />
          <Stack.Screen name="GmNpcs" component={NpcsScreen} options={{ title: 'NPCs' }} />
          <Stack.Screen name="GmCreatures" component={CreaturesScreen} options={{ title: 'Criaturas' }} />
          <Stack.Screen name="GmMaps" component={MapsScreen} options={{ title: 'Mapas' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

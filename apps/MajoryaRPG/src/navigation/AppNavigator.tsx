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

export type RootStackParamList = {
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
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Majorya RPG' }} />
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
    </Stack.Navigator>
  );
}

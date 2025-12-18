import { createStackNavigator } from '@react-navigation/stack';
import RocketVersusShieldOnboard from '../RocketVersusShieldScreens/RocketVersusShieldOnboard';
import RocketVersusShieldHome from '../RocketVersusShieldScreens/RocketVersusShieldHome';
import RocketVersusShieldAbout from '../RocketVersusShieldScreens/RocketVersusShieldAbout';
import RocketVersusShieldGame from '../RocketVersusShieldScreens/RocketVersusShieldGame';
import RocketVersusShieldChooseSide from '../RocketVersusShieldScreens/RocketVersusShieldChooseSide';
import RocketVersusShieldChooseMode from '../RocketVersusShieldScreens/RocketVersusShieldChooseMode';
import RocketVersusShieldPartySetup from '../RocketVersusShieldScreens/RocketVersusShieldPartySetup';
import RocketVersusShieldMultiplayer from '../RocketVersusShieldScreens/RocketVersusShieldMultiplayer';
import RocketVersusShieldMarket from '../RocketVersusShieldScreens/RocketVersusShieldMarket';
import RocketVersusShieldStatistics from '../RocketVersusShieldScreens/RocketVersusShieldStatistics';
import RocketVersusShieldLoader from '../RocketVersusShieldComponents/RocketVersusShieldLoader';

const Stack = createStackNavigator();

const RocketVersusShieldStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="RocketVersusShieldLoader"
        component={RocketVersusShieldLoader}
      />
      <Stack.Screen
        name="RocketVersusShieldOnboard"
        component={RocketVersusShieldOnboard}
      />
      <Stack.Screen
        name="RocketVersusShieldHome"
        component={RocketVersusShieldHome}
      />
      <Stack.Screen
        name="RocketVersusShieldAbout"
        component={RocketVersusShieldAbout}
      />
      <Stack.Screen
        name="RocketVersusShieldGame"
        component={RocketVersusShieldGame}
      />
      <Stack.Screen
        name="RocketVersusShieldChooseSide"
        component={RocketVersusShieldChooseSide}
      />
      <Stack.Screen
        name="RocketVersusShieldChooseMode"
        component={RocketVersusShieldChooseMode}
      />
      <Stack.Screen
        name="RocketVersusShieldPartySetup"
        component={RocketVersusShieldPartySetup}
      />
      <Stack.Screen
        name="RocketVersusShieldMultiplayer"
        component={RocketVersusShieldMultiplayer}
      />
      <Stack.Screen
        name="RocketVersusShieldMarket"
        component={RocketVersusShieldMarket}
      />
      <Stack.Screen
        name="RocketVersusShieldStatistics"
        component={RocketVersusShieldStatistics}
      />
    </Stack.Navigator>
  );
};

export default RocketVersusShieldStack;

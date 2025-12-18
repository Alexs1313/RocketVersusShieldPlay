import { NavigationContainer } from '@react-navigation/native';
import RocketVersusShieldStack from './RocketVersusShieldPlay/RocketVersusShieldNavigation/RocketVersusShieldStack';
import { ContextProvider } from './RocketVersusShieldPlay/RocketVersusShieldStore/rocketVersusShieldContext';

const App = () => {
  return (
    <NavigationContainer>
      <ContextProvider>
        <RocketVersusShieldStack />
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;

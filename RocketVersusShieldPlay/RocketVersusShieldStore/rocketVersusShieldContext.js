import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [rocketStatsRocketVersusShield, setRocketStatsRocketVersusShield] =
    useState({ total: 0, players: {} });
  const [shieldStatsRocketVersusShield, setShieldStatsRocketVersusShield] =
    useState({ total: 0, players: {} });

  const loadStatsRocketVersusShield = async () => {
    const savedRocketStats = await AsyncStorage.getItem('rocket_stats');
    const savedShieldStats = await AsyncStorage.getItem('shield_stats');

    setRocketStatsRocketVersusShield(
      savedRocketStats
        ? JSON.parse(savedRocketStats)
        : { total: 0, players: {} },
    );
    setShieldStatsRocketVersusShield(
      savedShieldStats
        ? JSON.parse(savedShieldStats)
        : { total: 0, players: {} },
    );
  };
  const contextValue = {
    rocketStatsRocketVersusShield,
    shieldStatsRocketVersusShield,
    loadStatsRocketVersusShield,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

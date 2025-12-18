import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import RocketVersusShieldBackground from '../RocketVersusShieldComponents/RocketVersusShieldBackground';
import RocketVersusShieldHeader from '../RocketVersusShieldComponents/RocketVersusShieldHeader';

const RocketVersusShieldChooseMode = ({ navigation }) => {
  const navigationRocketVersusShield = navigation;

  return (
    <RocketVersusShieldBackground>
      <View style={styles.containerRocketVersusShield}>
        <RocketVersusShieldHeader
          onPress={() => navigationRocketVersusShield.goBack()}
          headTitle="Game"
        />

        <View style={styles.modesContainerRocketVersusShield}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigationRocketVersusShield.navigate(
                'RocketVersusShieldChooseSide',
                {
                  mode: 'SOLO',
                },
              )
            }
          >
            <Image
              source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldSolo.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigationRocketVersusShield.navigate(
                'RocketVersusShieldPartySetup',
                {
                  mode: 'PARTY',
                },
              )
            }
          >
            <Image
              source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldParty.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </RocketVersusShieldBackground>
  );
};

const styles = StyleSheet.create({
  containerRocketVersusShield: {
    flex: 1,
    paddingTop: 70,
    alignItems: 'center',
    padding: 10,
  },
  modesContainerRocketVersusShield: {
    marginTop: 60,
    gap: 40,
  },
});

export default RocketVersusShieldChooseMode;

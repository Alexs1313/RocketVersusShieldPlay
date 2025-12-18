import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import RocketVersusShieldBackground from '../RocketVersusShieldComponents/RocketVersusShieldBackground';
import RocketVersusShieldHeader from '../RocketVersusShieldComponents/RocketVersusShieldHeader';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ROCKET_SKINS,
  SHIELD_SKINS,
} from '../RocketVersusShieldData/rocketVersusShieldSkins';

const RocketVersusShieldChooseSide = ({ navigation }) => {
  const [indexRocketVersusShield, setIndexRocketVersusShield] = useState(0);
  const isRocketRocketVersusShield = indexRocketVersusShield === 0;
  const [rocketSkinRocketVersusShield, setRocketSkinRocketVersusShield] =
    useState(null);
  const [shieldSkinRocketVersusShield, setShieldSkinRocketVersusShield] =
    useState(null);

  useEffect(() => {
    const loadSkinsRocketVersusShield = async () => {
      const rocketStoredRocketVersusShield = await AsyncStorage.getItem(
        'rvs_equipped_rocket',
      );
      const shieldStoredRocketVersusShield = await AsyncStorage.getItem(
        'rvs_equipped_shield',
      );

      setRocketSkinRocketVersusShield(
        rocketStoredRocketVersusShield
          ? ROCKET_SKINS.find(
              rocket => rocket.id === rocketStoredRocketVersusShield,
            )?.image
          : require('../../assets/RocketVersusShieldImages/RocketVersusShieldRock.png'),
      );

      setShieldSkinRocketVersusShield(
        shieldStoredRocketVersusShield
          ? SHIELD_SKINS.find(
              shield => shield.id === shieldStoredRocketVersusShield,
            )?.image
          : require('../../assets/RocketVersusShieldImages/RocketVersusShieldSh.png'),
      );
    };

    loadSkinsRocketVersusShield();
  }, []);

  return (
    <RocketVersusShieldBackground>
      <View style={styles.containerRocketVersusShield}>
        <RocketVersusShieldHeader
          onPress={() => navigation.goBack()}
          headTitle="Game"
        />

        <View style={styles.rowRocketVersusShield}>
          <TouchableOpacity
            disabled={isRocketRocketVersusShield}
            onPress={() => setIndexRocketVersusShield(0)}
            style={[
              styles.arrowBtnRocketVersusShield,
              isRocketRocketVersusShield &&
                styles.arrowDisabledRocketVersusShield,
            ]}
          >
            <Text style={styles.arrowTextRocketVersusShield}>‹</Text>
          </TouchableOpacity>

          <ImageBackground
            source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldHomeLogoBg.png')}
            style={styles.rocketBgBlurRocketVersusShield}
          >
            <Image
              source={
                isRocketRocketVersusShield
                  ? rocketSkinRocketVersusShield
                  : shieldSkinRocketVersusShield
              }
              style={styles.imageRocketVersusShield}
            />
          </ImageBackground>

          <TouchableOpacity
            disabled={!isRocketRocketVersusShield}
            onPress={() => setIndexRocketVersusShield(1)}
            style={[
              styles.arrowBtnRocketVersusShield,
              !isRocketRocketVersusShield &&
                styles.arrowDisabledRocketVersusShield,
            ]}
          >
            <Text style={styles.arrowTextRocketVersusShield}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rocketAboutContainerRocketVersusShield}>
          <Text style={styles.titleRocketVersusShield}>
            {isRocketRocketVersusShield ? 'Rocket' : 'Shield'}
          </Text>

          <Text style={styles.descRocketVersusShield}>
            {isRocketRocketVersusShield
              ? 'Control the rocket by bouncing off the walls of the screen. Your goal is to find an angle and hit the side of the shield.'
              : 'Move the shield along the edge of the screen. Your goal is to prevent the rocket from touching your side.'}
          </Text>

          <View style={styles.dotsRocketVersusShield}>
            <Image
              source={
                isRocketRocketVersusShield
                  ? require('../../assets/RocketVersusShieldImages/RocketVersusShieldAct.png')
                  : require('../../assets/RocketVersusShieldImages/RocketVersusShieldInact.png')
              }
            />
            <Image
              source={
                !isRocketRocketVersusShield
                  ? require('../../assets/RocketVersusShieldImages/RocketVersusShieldAct.png')
                  : require('../../assets/RocketVersusShieldImages/RocketVersusShieldInact.png')
              }
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate('RocketVersusShieldGame', {
              playerSide: isRocketRocketVersusShield ? 'ROCKET' : 'SHIELD',
            });
            setIndexRocketVersusShield(0);
          }}
        >
          <LinearGradient
            colors={['#FAA506', '#F6FA7E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.rocketGradientBtnRocketVersusShield}
          >
            <Text style={styles.rocketBtnTextRocketVersusShield}>Choose</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </RocketVersusShieldBackground>
  );
};

export default RocketVersusShieldChooseSide;

const styles = StyleSheet.create({
  containerRocketVersusShield: {
    flex: 1,
    padding: 10,
    paddingTop: 70,
    alignItems: 'center',
  },
  rocketGradientBtnRocketVersusShield: {
    borderRadius: 22,
    width: 210,
    height: 67,
    justifyContent: 'center',
    alignItems: 'center',
    top: -35,
  },
  rocketBtnTextRocketVersusShield: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
  },
  rocketBgBlurRocketVersusShield: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  rowRocketVersusShield: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowBtnRocketVersusShield: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1e2433',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowDisabledRocketVersusShield: {
    opacity: 0.3,
  },
  arrowTextRocketVersusShield: {
    color: '#fff',
    fontSize: 28,
    top: -1,
    right: -1,
  },
  imageRocketVersusShield: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginHorizontal: 20,
  },
  titleRocketVersusShield: {
    color: '#fff',
    fontSize: 24,
  },
  descRocketVersusShield: {
    color: '#cfd3ff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dotsRocketVersusShield: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 6,
    position: 'absolute',
    right: 13,
    top: 0,
  },
  rocketAboutContainerRocketVersusShield: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#252A34',
    padding: 13,
    paddingBottom: 50,
    borderRadius: 22,
    width: '95%',
  },
});

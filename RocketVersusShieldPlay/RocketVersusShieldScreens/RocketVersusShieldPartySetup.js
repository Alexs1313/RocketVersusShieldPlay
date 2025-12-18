import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import RocketVersusShieldHeader from '../RocketVersusShieldComponents/RocketVersusShieldHeader';
import RocketVersusShieldBackground from '../RocketVersusShieldComponents/RocketVersusShieldBackground';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ROCKET_SKINS,
  SHIELD_SKINS,
} from '../RocketVersusShieldData/rocketVersusShieldSkins';

const RocketVersusShieldPartySetup = ({ navigation }) => {
  const [rocketNameRocketVersusShield, setRocketNameRocketVersusShield] =
    useState('');
  const [shieldNameRocketVersusShield, setShieldNameRocketVersusShield] =
    useState('');
  const [rocketSkinRocketVersusShield, setRocketSkinRocketVersusShield] =
    useState(null);
  const [shieldSkinRocketVersusShield, setShieldSkinRocketVersusShield] =
    useState(null);

  useEffect(() => {
    const loadSkinsRocketVersusShield = async () => {
      const savedRocket = await AsyncStorage.getItem('rvs_equipped_rocket');
      const savedShield = await AsyncStorage.getItem('rvs_equipped_shield');

      setRocketSkinRocketVersusShield(
        savedRocket
          ? ROCKET_SKINS.find(currRocket => currRocket.id === savedRocket)
              ?.image
          : require('../../assets/RocketVersusShieldImages/RocketVersusShieldRock.png'),
      );

      setShieldSkinRocketVersusShield(
        savedShield
          ? SHIELD_SKINS.find(currShield => currShield.id === savedShield)
              ?.image
          : require('../../assets/RocketVersusShieldImages/RocketVersusShieldSh.png'),
      );
    };

    loadSkinsRocketVersusShield();
  }, []);

  const canStartRocketVersusShield =
    rocketNameRocketVersusShield.trim() && shieldNameRocketVersusShield.trim();

  return (
    <RocketVersusShieldBackground>
      <View style={styles.containerRocketVersusShield}>
        <RocketVersusShieldHeader
          onPress={() => navigation.goBack()}
          headTitle="Game"
        />

        <View style={[styles.blockRocketVersusShield, { marginTop: 60 }]}>
          <View style={styles.blockTitleRocketVersusShield}>
            <Image
              source={
                rocketSkinRocketVersusShield ||
                require('../../assets/RocketVersusShieldImages/RocketVersusShieldRock.png')
              }
              style={styles.iconRocketVersusShield}
            />
            <Text style={styles.blockTitleTextRocketVersusShield}>Rocket</Text>
          </View>

          <View style={styles.inputBoxRocketVersusShield}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#9aa0ad"
              value={rocketNameRocketVersusShield}
              onChangeText={setRocketNameRocketVersusShield}
              style={styles.inputRocketVersusShield}
              maxLength={12}
            />
          </View>
        </View>

        <View style={styles.blockRocketVersusShield}>
          <View style={styles.blockTitleRocketVersusShield}>
            <Image
              source={
                shieldSkinRocketVersusShield ||
                require('../../assets/RocketVersusShieldImages/RocketVersusShieldSh.png')
              }
              style={styles.iconRocketVersusShield}
            />
            <Text style={styles.blockTitleTextRocketVersusShield}>Shield</Text>
          </View>

          <View style={styles.inputBoxRocketVersusShield}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#9aa0ad"
              value={shieldNameRocketVersusShield}
              onChangeText={setShieldNameRocketVersusShield}
              style={styles.inputRocketVersusShield}
              maxLength={12}
            />
          </View>
        </View>

        {canStartRocketVersusShield && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate('RocketVersusShieldMultiplayer', {
                mode: 'PARTY',
                rocketPlayer: rocketNameRocketVersusShield,
                shieldPlayer: shieldNameRocketVersusShield,
              });
              setRocketNameRocketVersusShield('');
              setShieldNameRocketVersusShield('');
            }}
          >
            <LinearGradient
              colors={['#FAA506', '#F6FA7E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.rocketGradientBtnRocketVersusShield}
            >
              <Text style={styles.rocketBtnTextRocketVersusShield}>Start</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </RocketVersusShieldBackground>
  );
};

const styles = StyleSheet.create({
  containerRocketVersusShield: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    padding: 10,
  },
  rocketGradientBtnRocketVersusShield: {
    borderRadius: 22,
    width: 260,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rocketBtnTextRocketVersusShield: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
  },
  blockRocketVersusShield: {
    width: '90%',
    marginBottom: 50,
  },
  blockTitleRocketVersusShield: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3f4a',
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 10,
    zIndex: 2,
  },
  blockTitleTextRocketVersusShield: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 4,
    fontFamily: 'Ubuntu-Medium',
  },
  iconRocketVersusShield: {
    width: 31,
    height: 31,
    resizeMode: 'contain',
  },
  inputBoxRocketVersusShield: {
    backgroundColor: '#252A34',
    borderRadius: 22,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  inputRocketVersusShield: {
    backgroundColor: '#424751',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 16,
  },
});

export default RocketVersusShieldPartySetup;

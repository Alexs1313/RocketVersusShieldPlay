import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RocketVersusShieldHeader from '../RocketVersusShieldComponents/RocketVersusShieldHeader';
import RocketVersusShieldBackground from '../RocketVersusShieldComponents/RocketVersusShieldBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ROCKET_SKINS,
  SHIELD_SKINS,
} from '../RocketVersusShieldData/rocketVersusShieldSkins';

const RocketVersusShieldMarket = ({ navigation }) => {
  const [tabRocketVersusShield, setTabRocketVersusShield] = useState('ROCKET');
  const [indexRocketVersusShield, setIndexRocketVersusShield] = useState(0);
  const [starsRocketVersusShield, setStarsRocketVersusShield] = useState(15);
  const [ownedRocketVersusShield, setOwnedRocketVersusShield] = useState([]);
  const [equippedRocketVersusShield, setEquippedRocketVersusShield] =
    useState(null);

  const dataRocketVersusShield =
    tabRocketVersusShield === 'ROCKET' ? ROCKET_SKINS : SHIELD_SKINS;

  const currentRocketVersusShield =
    dataRocketVersusShield[indexRocketVersusShield];

  const isOwnedRocketVersusShield = ownedRocketVersusShield.includes(
    currentRocketVersusShield.id,
  );

  const isEquippedRocketVersusShield =
    equippedRocketVersusShield === currentRocketVersusShield.id;

  useEffect(() => {
    const initDefaultsRocketVersusShield = async () => {
      const hasRocketRocketVersusShield = await AsyncStorage.getItem(
        'rvs_owned_rockets',
      );
      const hasShieldRocketVersusShield = await AsyncStorage.getItem(
        'rvs_owned_shields',
      );

      if (!hasRocketRocketVersusShield) {
        await AsyncStorage.setItem('rvs_owned_rockets', JSON.stringify(['r1']));
        await AsyncStorage.setItem('rvs_equipped_rocket', 'r1');
      }

      if (!hasShieldRocketVersusShield) {
        await AsyncStorage.setItem('rvs_owned_shields', JSON.stringify(['s1']));
        await AsyncStorage.setItem('rvs_equipped_shield', 's1');
      }
    };

    const loadRocketVersusShield = async () => {
      await initDefaultsRocketVersusShield();

      const starsStoredRocketVersusShield = await AsyncStorage.getItem(
        'rvs_stars',
      );
      const rocketsStoredRocketVersusShield = await AsyncStorage.getItem(
        'rvs_owned_rockets',
      );
      const shieldsStoredRocketVersusShield = await AsyncStorage.getItem(
        'rvs_owned_shields',
      );
      const equippedRocketStoredRocketVersusShield = await AsyncStorage.getItem(
        'rvs_equipped_rocket',
      );
      const equippedShieldStoredRocketVersusShield = await AsyncStorage.getItem(
        'rvs_equipped_shield',
      );

      setStarsRocketVersusShield(
        starsStoredRocketVersusShield
          ? Number(starsStoredRocketVersusShield)
          : 0,
      );

      setOwnedRocketVersusShield(
        tabRocketVersusShield === 'ROCKET'
          ? JSON.parse(rocketsStoredRocketVersusShield || '[]')
          : JSON.parse(shieldsStoredRocketVersusShield || '[]'),
      );

      setEquippedRocketVersusShield(
        tabRocketVersusShield === 'ROCKET'
          ? equippedRocketStoredRocketVersusShield
          : equippedShieldStoredRocketVersusShield,
      );
    };

    loadRocketVersusShield();
  }, [tabRocketVersusShield]);

  const prevSkinRocketVersusShield = () => {
    setIndexRocketVersusShield(i =>
      i === 0 ? dataRocketVersusShield.length - 1 : i - 1,
    );
  };

  const nextSkinRocketVersusShield = () => {
    setIndexRocketVersusShield(i =>
      i === dataRocketVersusShield.length - 1 ? 0 : i + 1,
    );
  };

  const buySkinRocketVersusShield = async () => {
    if (starsRocketVersusShield < currentRocketVersusShield.price) return;

    const newStarsRocketVersusShield =
      starsRocketVersusShield - currentRocketVersusShield.price;

    setStarsRocketVersusShield(newStarsRocketVersusShield);
    await AsyncStorage.setItem('rvs_stars', String(newStarsRocketVersusShield));

    const updatedOwnedRocketVersusShield = [
      ...ownedRocketVersusShield,
      currentRocketVersusShield.id,
    ];

    setOwnedRocketVersusShield(updatedOwnedRocketVersusShield);

    if (tabRocketVersusShield === 'ROCKET') {
      await AsyncStorage.setItem(
        'rvs_owned_rockets',
        JSON.stringify(updatedOwnedRocketVersusShield),
      );
      await AsyncStorage.setItem(
        'rvs_equipped_rocket',
        currentRocketVersusShield.id,
      );
    } else {
      await AsyncStorage.setItem(
        'rvs_owned_shields',
        JSON.stringify(updatedOwnedRocketVersusShield),
      );
      await AsyncStorage.setItem(
        'rvs_equipped_shield',
        currentRocketVersusShield.id,
      );
    }

    setEquippedRocketVersusShield(currentRocketVersusShield.id);
  };

  const equipSkinRocketVersusShield = async () => {
    setEquippedRocketVersusShield(currentRocketVersusShield.id);

    if (tabRocketVersusShield === 'ROCKET') {
      await AsyncStorage.setItem(
        'rvs_equipped_rocket',
        currentRocketVersusShield.id,
      );
    } else {
      await AsyncStorage.setItem(
        'rvs_equipped_shield',
        currentRocketVersusShield.id,
      );
    }
  };

  return (
    <RocketVersusShieldBackground>
      <View style={styles.containerRocketVersusShield}>
        <RocketVersusShieldHeader
          onPress={() => navigation.goBack()}
          headTitle="Market"
        />

        <View style={styles.tabsRocketVersusShield}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ flex: 1 }}
            onPress={() => {
              setTabRocketVersusShield('ROCKET');
              setIndexRocketVersusShield(0);
            }}
          >
            <LinearGradient
              style={[
                styles.tabRocketVersusShield,
                tabRocketVersusShield !== 'ROCKET' && {
                  borderWidth: 1,
                  borderColor: '#795100',
                },
              ]}
              colors={
                tabRocketVersusShield === 'ROCKET'
                  ? ['#FAA506', '#F6FA7E']
                  : ['#000000', '#000000']
              }
            >
              <Image
                source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldRock.png')}
                style={{ width: 24, height: 38 }}
              />
              <Text
                style={[
                  styles.tabTextRocketVersusShield,
                  tabRocketVersusShield === 'ROCKET' &&
                    styles.tabTextActiveRocketVersusShield,
                ]}
              >
                Rocket
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={{ flex: 1 }}
            onPress={() => {
              setTabRocketVersusShield('SHIELD');
              setIndexRocketVersusShield(0);
            }}
          >
            <LinearGradient
              style={[
                styles.tabRocketVersusShield,
                tabRocketVersusShield !== 'SHIELD' && {
                  borderWidth: 1,
                  borderColor: '#795100',
                },
              ]}
              colors={
                tabRocketVersusShield === 'SHIELD'
                  ? ['#FAA506', '#F6FA7E']
                  : ['#000000', '#000000']
              }
            >
              <Image
                source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldSh.png')}
                style={{ width: 24, height: 28 }}
              />
              <Text
                style={[
                  styles.tabTextRocketVersusShield,
                  tabRocketVersusShield === 'SHIELD' &&
                    styles.tabTextActiveRocketVersusShield,
                ]}
              >
                Shield
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.previewRowRocketVersusShield}>
          <TouchableOpacity
            style={styles.arrowBtnRocketVersusShield}
            onPress={prevSkinRocketVersusShield}
          >
            <Text style={styles.arrowTextRocketVersusShield}>‹</Text>
          </TouchableOpacity>

          <View style={styles.previewRocketVersusShield}>
            {currentRocketVersusShield.image && (
              <ImageBackground
                source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldHomeLogoBg.png')}
                style={styles.rocketBgBlurRocketVersusShield}
              >
                <Image
                  source={currentRocketVersusShield.image}
                  style={styles.imageRocketVersusShield}
                />
              </ImageBackground>
            )}
          </View>

          <TouchableOpacity
            style={styles.arrowBtnRocketVersusShield}
            onPress={nextSkinRocketVersusShield}
          >
            <Text style={styles.arrowTextRocketVersusShield}>›</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#FAA506', '#F6FA7E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.rocketGradientRocketVersusShield}
        >
          <View style={styles.rocketWelcContainerRocketVersusShield}>
            <View style={styles.starRowRocketVersusShield}>
              <Image
                source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldStar.png')}
              />
              <Text style={styles.starCountRocketVersusShield}>
                {starsRocketVersusShield}
              </Text>
            </View>

            <Text style={styles.titleRocketVersusShield}>
              {currentRocketVersusShield.title}
            </Text>
          </View>
        </LinearGradient>

        {!isOwnedRocketVersusShield && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={buySkinRocketVersusShield}
          >
            <LinearGradient
              colors={['#FAA506', '#F6FA7E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.rocketGradientBtnRocketVersusShield}
            >
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 10,
                }}
              >
                <Text style={styles.rocketBtnTextRocketVersusShield}>
                  Exchange for
                </Text>

                <View style={styles.starButtonRowRocketVersusShield}>
                  <Image
                    source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldStar.png')}
                    style={{ width: 12, height: 12 }}
                  />
                  <Text style={styles.actionPriceTextRocketVersusShield}>
                    {currentRocketVersusShield.price}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {isOwnedRocketVersusShield && !isEquippedRocketVersusShield && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={equipSkinRocketVersusShield}
          >
            <LinearGradient
              colors={['#FAA506', '#F6FA7E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.rocketGradientBtnRocketVersusShield}
            >
              <Text style={styles.rocketBtnTextRocketVersusShield}>
                ✓ Received
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {isEquippedRocketVersusShield && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={equipSkinRocketVersusShield}
          >
            <LinearGradient
              colors={['#FAA506', '#F6FA7E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.rocketGradientBtnRocketVersusShield}
            >
              <Text style={styles.rocketBtnTextRocketVersusShield}>
                ✓✓ Dressed
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <View style={styles.dotsRocketVersusShield}>
          {dataRocketVersusShield.map((_, currIdx) => (
            <Image
              key={currIdx}
              source={
                indexRocketVersusShield === currIdx
                  ? require('../../assets/RocketVersusShieldImages/RocketVersusShieldAct.png')
                  : require('../../assets/RocketVersusShieldImages/RocketVersusShieldInact.png')
              }
            />
          ))}
        </View>
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
    paddingBottom: 20,
  },
  rocketBgBlurRocketVersusShield: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rocketGradientRocketVersusShield: {
    borderRadius: 22,
    width: '90%',
  },
  rocketWelcContainerRocketVersusShield: {
    padding: 20,
    borderRadius: 22,
    alignItems: 'center',
    backgroundColor: '#252A34',
    margin: 1,
    paddingBottom: 50,
  },
  rocketGradientBtnRocketVersusShield: {
    borderRadius: 18,
    width: 179,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    top: -35,
    alignSelf: 'center',
  },
  rocketBtnTextRocketVersusShield: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
  },
  actionPriceTextRocketVersusShield: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Ubuntu-Medium',
  },
  tabsRocketVersusShield: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 24,
  },
  tabRocketVersusShield: {
    borderRadius: 20,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 13,
  },
  tabTextRocketVersusShield: {
    color: '#795100',
    fontSize: 19,
    fontFamily: 'Ubuntu-Medium',
  },
  tabTextActiveRocketVersusShield: {
    color: '#000',
    fontSize: 19,
    fontFamily: 'Ubuntu-Medium',
  },
  previewRowRocketVersusShield: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  previewRocketVersusShield: {
    alignItems: 'center',
  },
  imageRocketVersusShield: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },
  arrowBtnRocketVersusShield: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1c2132',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowTextRocketVersusShield: {
    color: '#fff',
    fontSize: 28,
    top: -1,
    right: -1,
  },
  starRowRocketVersusShield: {
    flexDirection: 'row',
    backgroundColor: '#111626',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    marginBottom: 14,
    alignItems: 'center',
    minWidth: 100,
    justifyContent: 'center',
    gap: 5,
  },
  starButtonRowRocketVersusShield: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#111626',
    paddingHorizontal: 7,
    paddingVertical: 7,
    borderRadius: 12,
  },
  starCountRocketVersusShield: {
    color: '#fff',
    marginLeft: 6,
    fontFamily: 'Ubuntu-Medium',
    fontSize: 17,
  },
  titleRocketVersusShield: {
    color: '#fff',
    fontSize: 30,
    marginBottom: 20,
    marginTop: 10,
    fontFamily: 'Ubuntu-Medium',
  },
  dotsRocketVersusShield: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
    gap: 5,
  },
});

export default RocketVersusShieldMarket;

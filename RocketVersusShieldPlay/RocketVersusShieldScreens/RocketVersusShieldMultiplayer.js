import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  ImageBackground,
  Share,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import RocketVersusShieldBackground from '../RocketVersusShieldComponents/RocketVersusShieldBackground';
import RocketVersusShieldHeader from '../RocketVersusShieldComponents/RocketVersusShieldHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ROCKET_SKINS,
  SHIELD_SKINS,
} from '../RocketVersusShieldData/rocketVersusShieldSkins';

const { width, height } = Dimensions.get('window');

const ROCKET_SIZE = 60;
const SHIELD_SIZE = 70;
const GAME_TOP = 90;
const GAME_BOTTOM = height - 150;
const TOTAL_ROUNDS = 3;

const RocketVersusShieldMultiplayer = () => {
  const routeRocketVersusShield = useRoute();
  const navigationRocketVersusShield = useNavigation();
  const { rocketPlayer, shieldPlayer } = routeRocketVersusShield.params;

  const rocketXRocketVersusShield = useRef(
    new Animated.Value(width / 2 - ROCKET_SIZE / 2),
  ).current;

  const rocketYRocketVersusShield = useRef(
    new Animated.Value(GAME_BOTTOM),
  ).current;

  const shieldXRocketVersusShield = useRef(
    new Animated.Value(width / 2 - SHIELD_SIZE / 2),
  ).current;

  const [
    rocketLaunchedRocketVersusShield,
    setRocketLaunchedRocketVersusShield,
  ] = useState(false);
  const [roundRocketVersusShield, setRoundRocketVersusShield] = useState(1);
  const [winnerRocketVersusShield, setWinnerRocketVersusShield] =
    useState(null);
  const [resultsRocketVersusShield, setResultsRocketVersusShield] = useState(
    [],
  );
  const [
    showFinalResultRocketVersusShield,
    setShowFinalResultRocketVersusShield,
  ] = useState(false);

  const isLastRoundRocketVersusShield =
    roundRocketVersusShield === TOTAL_ROUNDS;

  const [rocketSkinRocketVersusShield, setRocketSkinRocketVersusShield] =
    useState(null);
  const [shieldSkinRocketVersusShield, setShieldSkinRocketVersusShield] =
    useState(null);

  useEffect(() => {
    const loadSkinsRocketVersusShield = async () => {
      const r = await AsyncStorage.getItem('rvs_equipped_rocket');
      const s = await AsyncStorage.getItem('rvs_equipped_shield');

      setRocketSkinRocketVersusShield(
        r
          ? ROCKET_SKINS.find(rocket => rocket.id === r)?.image
          : require('../../assets/RocketVersusShieldImages/RocketVersusShieldRock.png'),
      );

      setShieldSkinRocketVersusShield(
        s
          ? SHIELD_SKINS.find(shield => shield.id === s)?.image
          : require('../../assets/RocketVersusShieldImages/RocketVersusShieldSh.png'),
      );
    };

    loadSkinsRocketVersusShield();
  }, []);

  const addStarsAfterGameRocketVersusShield = async () => {
    const storedRocketVersusShield = await AsyncStorage.getItem('rvs_stars');
    const currentStarsRocketVersusShield = storedRocketVersusShield
      ? Number(storedRocketVersusShield)
      : 0;

    await AsyncStorage.setItem(
      'rvs_stars',
      String(currentStarsRocketVersusShield + 5),
    );
  };

  const saveStatisticsRocketVersusShield = async res => {
    const updateSideRocketVersusShield = async (savedKey, savedName) => {
      const savedResults = await AsyncStorage.getItem(savedKey);
      const parsedResults = savedResults
        ? JSON.parse(savedResults)
        : { total: 0, players: {} };

      parsedResults.total += 1;
      parsedResults.players[savedName] =
        (parsedResults.players[savedName] || 0) + 1;

      await AsyncStorage.setItem(savedKey, JSON.stringify(parsedResults));
    };

    for (const result of res) {
      if (result === 'ROCKET') {
        await updateSideRocketVersusShield('rocket_stats', rocketPlayer);
      } else {
        await updateSideRocketVersusShield('shield_stats', shieldPlayer);
      }
    }
  };

  const launchRocketRocketVersusShield = () => {
    if (
      rocketLaunchedRocketVersusShield ||
      winnerRocketVersusShield ||
      showFinalResultRocketVersusShield
    )
      return;

    setRocketLaunchedRocketVersusShield(true);

    Animated.timing(rocketYRocketVersusShield, {
      toValue: GAME_TOP,
      duration: 900,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && !winnerRocketVersusShield) {
        finishRoundRocketVersusShield('ROCKET');
      }
    });
  };

  useEffect(() => {
    if (!rocketLaunchedRocketVersusShield || winnerRocketVersusShield) return;

    const timerRocketVersusShield = setInterval(() => {
      const rxAnim = rocketXRocketVersusShield.__getValue();
      const ryAnim = rocketYRocketVersusShield.__getValue();
      const sxAnim = shieldXRocketVersusShield.__getValue();

      const hit =
        rxAnim < sxAnim + SHIELD_SIZE &&
        rxAnim + ROCKET_SIZE > sxAnim &&
        ryAnim < GAME_TOP + SHIELD_SIZE;

      if (hit) {
        rocketYRocketVersusShield.stopAnimation();
        finishRoundRocketVersusShield('SHIELD');
        clearInterval(timerRocketVersusShield);
      }
    }, 16);

    return () => clearInterval(timerRocketVersusShield);
  }, [rocketLaunchedRocketVersusShield, winnerRocketVersusShield]);

  const finishRoundRocketVersusShield = who => {
    setWinnerRocketVersusShield(who);

    setResultsRocketVersusShield(prevState => {
      const updatedRes = [...prevState, who];

      if (updatedRes.length === TOTAL_ROUNDS) {
        saveStatisticsRocketVersusShield(updatedRes);
        addStarsAfterGameRocketVersusShield();
        setShowFinalResultRocketVersusShield(true);
      }

      return updatedRes;
    });
  };

  const nextRoundRocketVersusShield = () => {
    setRoundRocketVersusShield(result => result + 1);
    setWinnerRocketVersusShield(null);
    setRocketLaunchedRocketVersusShield(false);

    rocketXRocketVersusShield.setValue(width / 2 - ROCKET_SIZE / 2);
    rocketYRocketVersusShield.setValue(GAME_BOTTOM);
  };

  const rocketResponderRocketVersusShield = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () =>
        !rocketLaunchedRocketVersusShield &&
        !winnerRocketVersusShield &&
        !showFinalResultRocketVersusShield,
      onMoveShouldSetPanResponder: () =>
        !rocketLaunchedRocketVersusShield &&
        !winnerRocketVersusShield &&
        !showFinalResultRocketVersusShield,
      onPanResponderMove: (_, currG) => {
        let rocketX = currG.moveX - ROCKET_SIZE / 2;
        rocketX = Math.max(0, Math.min(width - ROCKET_SIZE, rocketX));
        rocketXRocketVersusShield.setValue(rocketX);
      },
      onPanResponderRelease: launchRocketRocketVersusShield,
    }),
  ).current;

  const shieldResponderRocketVersusShield = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () =>
        !winnerRocketVersusShield && !showFinalResultRocketVersusShield,
      onMoveShouldSetPanResponder: () =>
        !winnerRocketVersusShield && !showFinalResultRocketVersusShield,
      onPanResponderMove: (_, currG) => {
        let shieldX = currG.moveX - SHIELD_SIZE / 2;
        shieldX = Math.max(0, Math.min(width - SHIELD_SIZE, shieldX));
        shieldXRocketVersusShield.setValue(shieldX);
      },
    }),
  ).current;

  const handleShareResultsRocketVersusShield = () => {
    Share.share({
      message: `Game Results:\n${resultsRocketVersusShield
        .map(
          (r, i) =>
            `Round ${i + 1}: ${r === 'ROCKET' ? rocketPlayer : shieldPlayer}`,
        )
        .join('\n')}`,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldGameBg.png')}
      style={{ flex: 1 }}
    >
      <View style={styles.containerRocketVersusShield}>
        {!showFinalResultRocketVersusShield && (
          <View style={{ paddingTop: 60, paddingHorizontal: 10 }}>
            <RocketVersusShieldHeader
              onPress={() => navigationRocketVersusShield.goBack()}
              headTitle={`Round ${roundRocketVersusShield}/3`}
            />
          </View>
        )}

        {!winnerRocketVersusShield && !showFinalResultRocketVersusShield && (
          <>
            <Animated.Image
              {...shieldResponderRocketVersusShield.panHandlers}
              source={shieldSkinRocketVersusShield}
              style={[
                styles.shieldRocketVersusShield,
                {
                  left: shieldXRocketVersusShield,
                  top: 150,
                  resizeMode: 'contain',
                  width: 82,
                  height: 102,
                },
              ]}
            />

            <Animated.View
              {...rocketResponderRocketVersusShield.panHandlers}
              style={[
                styles.rocketRocketVersusShield,
                {
                  left: rocketXRocketVersusShield,
                  top: rocketYRocketVersusShield,
                },
              ]}
            >
              <Image
                source={rocketSkinRocketVersusShield}
                style={[
                  styles.rocketImgRocketVersusShield,
                  {
                    width: 59,
                    height: 160,
                    resizeMode: 'contain',
                  },
                ]}
              />
            </Animated.View>
          </>
        )}

        {winnerRocketVersusShield &&
          !isLastRoundRocketVersusShield &&
          !showFinalResultRocketVersusShield && (
            <View style={styles.overlayRocketVersusShield}>
              <Image
                source={
                  winnerRocketVersusShield === 'ROCKET'
                    ? rocketSkinRocketVersusShield
                    : shieldSkinRocketVersusShield
                }
                style={styles.winnerImgRocketVersusShield}
              />

              <LinearGradient
                colors={['#FAA506', '#F6FA7E']}
                style={styles.resultGradientRocketVersusShield}
              >
                <View style={styles.resultCardRocketVersusShield}>
                  <Text style={styles.roundTextRocketVersusShield}>
                    Round {roundRocketVersusShield}
                  </Text>
                  <Text style={styles.winTextRocketVersusShield}>
                    {winnerRocketVersusShield === 'ROCKET'
                      ? rocketPlayer
                      : shieldPlayer}{' '}
                    Win!!!
                  </Text>
                </View>
              </LinearGradient>

              <TouchableOpacity onPress={nextRoundRocketVersusShield}>
                <LinearGradient
                  colors={['#FAA506', '#F6FA7E']}
                  style={styles.nextBtnRocketVersusShield}
                >
                  <Text style={styles.nextBtnTextRocketVersusShield}>
                    Next round
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

        {showFinalResultRocketVersusShield && (
          <RocketVersusShieldBackground>
            <View style={styles.welcRocketContainerRocketVersusShield}>
              <View style={{ position: 'relative' }}>
                <Image
                  source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldOnboard1.png')}
                  style={{ width: '100%' }}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 60,
                    width: '100%',
                    paddingHorizontal: 10,
                  }}
                >
                  <RocketVersusShieldHeader
                    onPress={() => {
                      navigationRocketVersusShield.goBack();
                      setResultsRocketVersusShield([]);
                      setRoundRocketVersusShield(1);
                    }}
                    headTitle="Game"
                  />
                </View>
              </View>

              <LinearGradient
                colors={['#FAA506', '#F6FA7E']}
                style={styles.rocketBottomGradientRocketVersusShield}
              >
                <View
                  style={styles.rocketBottomWelcContainerRocketVersusShield}
                >
                  <Text style={styles.rocketTitleRocketVersusShield}>
                    Result
                  </Text>

                  <View style={styles.starsRowRocketVersusShield}>
                    <Image
                      source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldStar.png')}
                    />
                    <Text style={styles.starsTextRocketVersusShield}>5</Text>
                  </View>

                  {resultsRocketVersusShield.map((rocket, index) => (
                    <View
                      key={index}
                      style={styles.resultRowRocketVersusShield}
                    >
                      <Text style={styles.resultTextRocketVersusShield}>
                        Round: {index + 1}
                      </Text>
                      <View style={styles.rockContRocketVersusShield}>
                        <Text style={styles.finalNameRocketVersusShield}>
                          {rocket === 'ROCKET' ? rocketPlayer : shieldPlayer}
                        </Text>
                      </View>
                    </View>
                  ))}

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={handleShareResultsRocketVersusShield}
                  >
                    <LinearGradient
                      colors={['#FAA506', '#F6FA7E']}
                      style={{
                        borderRadius: 22,
                        width: 260,
                        height: 74,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                      }}
                    >
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 20,
                          fontFamily: 'Ubuntu-Medium',
                        }}
                      >
                        Share
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </RocketVersusShieldBackground>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  containerRocketVersusShield: {
    flex: 1,
  },
  starsRowRocketVersusShield: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#252A34',
    width: 69,
    height: 34,
    borderRadius: 14,
    position: 'absolute',
    top: 10,
    right: 20,
  },
  starsTextRocketVersusShield: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Ubuntu-Medium',
  },
  resultRowRocketVersusShield: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 60,
    alignItems: 'center',
    gap: 60,
  },
  resultTextRocketVersusShield: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Ubuntu-Medium',
  },
  rockContRocketVersusShield: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#252A34',
    paddingHorizontal: 14,
    minWidth: 88,
    height: 38,
    borderRadius: 16,
  },
  welcRocketContainerRocketVersusShield: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rocketBottomGradientRocketVersusShield: {
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    width: '100%',
  },
  rocketBottomWelcContainerRocketVersusShield: {
    padding: 20,
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    alignItems: 'center',
    backgroundColor: '#000000',
    margin: 1,
    paddingVertical: 40,
    minHeight: 340,
  },
  rocketTitleRocketVersusShield: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Ubuntu-Medium',
  },
  rocketRocketVersusShield: {
    position: 'absolute',
    width: ROCKET_SIZE,
    height: ROCKET_SIZE,
  },
  shieldRocketVersusShield: {
    position: 'absolute',
  },
  overlayRocketVersusShield: {
    position: 'absolute',
    top: '25%',
    width: '100%',
    alignItems: 'center',
  },
  winnerImgRocketVersusShield: {
    width: 160,
    height: 270,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  resultGradientRocketVersusShield: {
    width: '80%',
    borderRadius: 22,
    marginTop: 20,
  },
  resultCardRocketVersusShield: {
    backgroundColor: '#252A34',
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 20,
    margin: 1,
    alignItems: 'center',
    paddingBottom: 70,
  },
  roundTextRocketVersusShield: {
    color: '#ffffffcc',
    fontSize: 15,
    marginBottom: 18,
    fontFamily: 'Ubuntu-Regular',
  },
  winTextRocketVersusShield: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Ubuntu-Medium',
  },
  nextBtnRocketVersusShield: {
    marginTop: -26,
    borderRadius: 18,
    width: 190,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtnTextRocketVersusShield: {
    color: '#000',
    fontSize: 17,
    fontFamily: 'Ubuntu-Medium',
  },
  finalNameRocketVersusShield: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Ubuntu-Medium',
  },
});

export default RocketVersusShieldMultiplayer;

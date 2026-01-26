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
  Share,
  ImageBackground,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RocketVersusShieldHeader from '../RocketVersusShieldComponents/RocketVersusShieldHeader';
import LinearGradient from 'react-native-linear-gradient';
import RocketVersusShieldBackground from '../RocketVersusShieldComponents/RocketVersusShieldBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ROCKET_SKINS,
  SHIELD_SKINS,
} from '../RocketVersusShieldData/rocketVersusShieldSkins';

const { width, height } = Dimensions.get('window');

const ROCKET_SIZE = 60;
const SHIELD_SIZE = 70;
const GAME_HEIGHT = height - 160;
const TOTAL_ROUNDS = 3;
const STARS_REWARD = 5;

const RocketVersusShieldGame = () => {
  const routeRocketVersusShield = useRoute();
  const navigationRocketVersusShield = useNavigation();

  const playerSideRocketVersusShield =
    routeRocketVersusShield.params?.playerSide ?? 'ROCKET';

  const isRocketPlayerRocketVersusShield =
    playerSideRocketVersusShield === 'ROCKET';
  const isShieldPlayerRocketVersusShield =
    playerSideRocketVersusShield === 'SHIELD';

  const rocketXRocketVersusShield = useRef(
    new Animated.Value(width / 2 - ROCKET_SIZE / 2),
  ).current;

  const rocketYRocketVersusShield = useRef(
    new Animated.Value(isRocketPlayerRocketVersusShield ? GAME_HEIGHT : 40),
  ).current;

  const shieldXRocketVersusShield = useRef(
    new Animated.Value(width / 2 - SHIELD_SIZE / 2),
  ).current;

  const [
    rocketLaunchedRocketVersusShield,
    setRocketLaunchedRocketVersusShield,
  ] = useState(false);
  const [roundRocketVersusShield, setRoundRocketVersusShield] = useState(1);
  const [roundWinnerRocketVersusShield, setRoundWinnerRocketVersusShield] =
    useState(null);
  const [resultsRocketVersusShield, setResultsRocketVersusShield] = useState(
    [],
  );
  const [
    showResultScreenRocketVersusShield,
    setShowResultScreenRocketVersusShield,
  ] = useState(false);
  const [starsRocketVersusShield, setStarsRocketVersusShield] = useState(0);
  const [rocketSkinRocketVersusShield, setRocketSkinRocketVersusShield] =
    useState(null);
  const [shieldSkinRocketVersusShield, setShieldSkinRocketVersusShield] =
    useState(null);

  useEffect(() => {
    if (!isRocketPlayerRocketVersusShield || roundWinnerRocketVersusShield)
      return;

    const animRocketVersusShield = Animated.loop(
      Animated.sequence([
        Animated.timing(shieldXRocketVersusShield, {
          toValue: width - SHIELD_SIZE - 20,
          duration: 1300,
          useNativeDriver: false,
        }),
        Animated.timing(shieldXRocketVersusShield, {
          toValue: 20,
          duration: 1300,
          useNativeDriver: false,
        }),
      ]),
    );

    animRocketVersusShield.start();
    return () => animRocketVersusShield.stop();
  }, [roundWinnerRocketVersusShield, isRocketPlayerRocketVersusShield]);

  useEffect(() => {
    const loadSkinsRocketVersusShield = async () => {
      const savedRocket = await AsyncStorage.getItem('rvs_equipped_rocket');
      const savedShield = await AsyncStorage.getItem('rvs_equipped_shield');

      setRocketSkinRocketVersusShield(
        savedRocket
          ? ROCKET_SKINS.find(x => x.id === savedRocket)?.image
          : require('../../assets/RocketVersusShieldImages/RocketVersusShieldRock.png'),
      );

      setShieldSkinRocketVersusShield(
        savedShield
          ? SHIELD_SKINS.find(x => x.id === savedShield)?.image
          : require('../../assets/RocketVersusShieldImages/RocketVersusShieldSh.png'),
      );
    };

    loadSkinsRocketVersusShield();
  }, []);

  useEffect(() => {
    if (
      !isShieldPlayerRocketVersusShield ||
      rocketLaunchedRocketVersusShield ||
      roundWinnerRocketVersusShield
    )
      return;

    rocketXRocketVersusShield.setValue(Math.random() * (width - ROCKET_SIZE));

    const timerRocketVersusShield = setTimeout(() => {
      launchRocketRocketVersusShield();
    }, 700);

    return () => clearTimeout(timerRocketVersusShield);
  }, [roundRocketVersusShield, isShieldPlayerRocketVersusShield]);

  const launchRocketRocketVersusShield = () => {
    if (rocketLaunchedRocketVersusShield || roundWinnerRocketVersusShield)
      return;

    setRocketLaunchedRocketVersusShield(true);

    Animated.timing(rocketYRocketVersusShield, {
      toValue: isRocketPlayerRocketVersusShield ? -ROCKET_SIZE : GAME_HEIGHT,
      duration: 900,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && !roundWinnerRocketVersusShield) {
        finishRoundRocketVersusShield('ROCKET');
      }
    });
  };

  const addStarsRocketVersusShield = async selAmount => {
    const storedRocketVersusShield = await AsyncStorage.getItem('rvs_stars');
    const currentRocketVersusShield = storedRocketVersusShield
      ? Number(storedRocketVersusShield)
      : 0;

    await AsyncStorage.setItem(
      'rvs_stars',
      String(currentRocketVersusShield + selAmount),
    );
  };

  useEffect(() => {
    if (!rocketLaunchedRocketVersusShield) return;

    const timerRocketVersusShield = setInterval(() => {
      const rxRocketAnim = rocketXRocketVersusShield.__getValue();
      const ryRocketAnim = rocketYRocketVersusShield.__getValue();
      const sxRocketAnim = shieldXRocketVersusShield.__getValue();
      const syRocketAnim = isRocketPlayerRocketVersusShield
        ? 40
        : GAME_HEIGHT - SHIELD_SIZE;

      const hitShield =
        rxRocketAnim < sxRocketAnim + SHIELD_SIZE &&
        rxRocketAnim + ROCKET_SIZE > sxRocketAnim &&
        ryRocketAnim < syRocketAnim + SHIELD_SIZE &&
        ryRocketAnim + ROCKET_SIZE > syRocketAnim;

      if (hitShield) {
        rocketYRocketVersusShield.stopAnimation();
        finishRoundRocketVersusShield('SHIELD');
        clearInterval(timerRocketVersusShield);
      }
    }, 16);

    return () => clearInterval(timerRocketVersusShield);
  }, [rocketLaunchedRocketVersusShield, isRocketPlayerRocketVersusShield]);

  const finishRoundRocketVersusShield = isWinner => {
    setRoundWinnerRocketVersusShield(isWinner);
    setResultsRocketVersusShield(prevState => [...prevState, isWinner]);
  };

  const nextRoundRocketVersusShield = async () => {
    if (roundRocketVersusShield >= TOTAL_ROUNDS) {
      await addStarsRocketVersusShield(STARS_REWARD);
      setStarsRocketVersusShield(STARS_REWARD);
      setShowResultScreenRocketVersusShield(true);
      return;
    }

    setRoundRocketVersusShield(currRound => currRound + 1);
    setRoundWinnerRocketVersusShield(null);
    setRocketLaunchedRocketVersusShield(false);

    rocketYRocketVersusShield.setValue(
      isRocketPlayerRocketVersusShield ? GAME_HEIGHT : 40,
    );
    rocketXRocketVersusShield.setValue(width / 2 - ROCKET_SIZE / 2);
  };

  const rocketResponderRocketVersusShield = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () =>
        isRocketPlayerRocketVersusShield &&
        !rocketLaunchedRocketVersusShield &&
        !roundWinnerRocketVersusShield,
      onMoveShouldSetPanResponder: () =>
        isRocketPlayerRocketVersusShield &&
        !rocketLaunchedRocketVersusShield &&
        !roundWinnerRocketVersusShield,
      onPanResponderMove: (_, gRock) => {
        let xRocket = gRock.moveX - ROCKET_SIZE / 2;
        if (xRocket < 0) xRocket = 0;
        if (xRocket > width - ROCKET_SIZE) xRocket = width - ROCKET_SIZE;
        rocketXRocketVersusShield.setValue(xRocket);
      },
      onPanResponderRelease: launchRocketRocketVersusShield,
    }),
  ).current;

  const shieldResponderRocketVersusShield = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () =>
        isShieldPlayerRocketVersusShield && !roundWinnerRocketVersusShield,
      onMoveShouldSetPanResponder: () =>
        isShieldPlayerRocketVersusShield && !roundWinnerRocketVersusShield,
      onPanResponderMove: (_, gShield) => {
        let xShield = gShield.moveX - SHIELD_SIZE / 2;
        if (xShield < 0) xShield = 0;
        if (xShield > width - SHIELD_SIZE) xShield = width - SHIELD_SIZE;
        shieldXRocketVersusShield.setValue(xShield);
      },
    }),
  ).current;

  const shareResultsRocketVersusShield = async () => {
    await Share.share({
      message: `I played Rocket vs Shield and earned ${starsRocketVersusShield} stars! Can you beat my score?`,
    });
  };

  if (showResultScreenRocketVersusShield) {
    return (
      <RocketVersusShieldBackground>
        <View style={styles.welcRocketContainerRocketVersusShield}>
          <View style={{ position: 'relative' }}>
            <Image
              source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldOnboard1.png')}
              style={{ width: '100%', height: height * 0.6 }}
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
            <View style={styles.rocketBottomWelcContainerRocketVersusShield}>
              <Text style={styles.rocketTitleRocketVersusShield}>Result</Text>

              <View style={styles.starsRowRocketVersusShield}>
                <Image
                  source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldStar.png')}
                />
                <Text style={styles.starsTextRocketVersusShield}>
                  {starsRocketVersusShield}
                </Text>
              </View>

              {resultsRocketVersusShield.map((r, i) => (
                <View key={i} style={styles.resultRowRocketVersusShield}>
                  <Text style={styles.resultTextRocketVersusShield}>
                    Round: {i + 1}
                  </Text>
                  <View style={styles.rockContRocketVersusShield}>
                    <Image
                      source={
                        r === 'ROCKET'
                          ? rocketSkinRocketVersusShield
                          : shieldSkinRocketVersusShield
                      }
                      style={{
                        width: 18,
                        height: 31,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                </View>
              ))}

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={shareResultsRocketVersusShield}
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
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldGameBg.png')}
      style={{ flex: 1 }}
    >
      <View style={styles.containerRocketVersusShield}>
        <RocketVersusShieldHeader
          onPress={() => navigationRocketVersusShield.goBack()}
          headTitle={`Round ${roundRocketVersusShield}/3`}
        />

        {!roundWinnerRocketVersusShield && (
          <Animated.Image
            {...(isShieldPlayerRocketVersusShield
              ? shieldResponderRocketVersusShield.panHandlers
              : {})}
            source={shieldSkinRocketVersusShield}
            style={[
              styles.shieldRocketVersusShield,
              {
                left: shieldXRocketVersusShield,
                top: isRocketPlayerRocketVersusShield
                  ? 150
                  : GAME_HEIGHT - SHIELD_SIZE,
                width: 82,
                height: 100,
              },
            ]}
          />
        )}

        {!roundWinnerRocketVersusShield && (
          <Animated.View
            {...(isRocketPlayerRocketVersusShield
              ? rocketResponderRocketVersusShield.panHandlers
              : {})}
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
              style={{
                width: 60,
                height: 100,
                resizeMode: 'contain',
                top: roundWinnerRocketVersusShield === 'SHIELD' ? 60 : 30,

                transform:
                  roundWinnerRocketVersusShield === 'SHIELD'
                    ? [{ rotate: '180deg' }]
                    : [],
              }}
            />
          </Animated.View>
        )}

        {roundWinnerRocketVersusShield && (
          <View style={styles.overlayRocketVersusShield}>
            <Image
              source={
                roundWinnerRocketVersusShield === 'ROCKET'
                  ? rocketSkinRocketVersusShield
                  : shieldSkinRocketVersusShield
              }
              style={{
                width: 160,
                height: 260,
                resizeMode: 'contain',
                marginBottom: 40,
              }}
            />

            <LinearGradient
              colors={['#FAA506', '#F6FA7E']}
              style={styles.rocketGradientRocketVersusShield}
            >
              <View style={styles.rocketWelcContainerRocketVersusShield}>
                <Text style={styles.roundTextRocketVersusShield}>
                  Round {roundRocketVersusShield}
                </Text>
                <Text style={styles.winTextRocketVersusShield}>
                  {roundWinnerRocketVersusShield === 'ROCKET'
                    ? 'Rocket Win!!!'
                    : 'Shield Win!!!'}
                </Text>
              </View>
            </LinearGradient>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={nextRoundRocketVersusShield}
            >
              <LinearGradient
                colors={['#FAA506', '#F6FA7E']}
                style={styles.rocketGradientBtnRocketVersusShield}
              >
                <Text style={styles.rocketBtnTextRocketVersusShield}>
                  {roundRocketVersusShield < TOTAL_ROUNDS
                    ? 'Next Round'
                    : 'Next'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default RocketVersusShieldGame;

const styles = StyleSheet.create({
  containerRocketVersusShield: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
  },
  shieldRocketVersusShield: {
    position: 'absolute',
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
  rocketGradientBtnRocketVersusShield: {
    borderRadius: 18,
    width: 179,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
    top: -35,
  },
  rocketBtnTextRocketVersusShield: {
    color: '#000000',
    fontSize: 17,
    fontFamily: 'Ubuntu-Medium',
  },
  rocketRocketVersusShield: {
    position: 'absolute',
    width: ROCKET_SIZE,
    height: ROCKET_SIZE,
  },
  rocketGradientRocketVersusShield: {
    borderRadius: 22,
    width: '80%',
  },
  rocketWelcContainerRocketVersusShield: {
    padding: 20,
    borderRadius: 22,
    alignItems: 'center',
    backgroundColor: '#252A34',
    margin: 1,
    paddingBottom: 50,
  },
  overlayRocketVersusShield: {
    position: 'absolute',
    top: '25%',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  winTextRocketVersusShield: {
    color: '#fff',
    fontSize: 28,
    marginBottom: 20,
    fontFamily: 'Ubuntu-Medium',
  },
  roundTextRocketVersusShield: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 30,
    fontFamily: 'Ubuntu-Regular',
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
    gap: 80,
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
    width: 77,
    height: 38,
    borderRadius: 16,
  },
});

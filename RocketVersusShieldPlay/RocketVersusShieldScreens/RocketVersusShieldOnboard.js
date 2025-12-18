import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RocketVersusShieldBackground from '../RocketVersusShieldComponents/RocketVersusShieldBackground';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const RocketVersusShieldOnboard = () => {
  const [currentOnboardIndex, setCurrentOnboardIndex] = useState(0);
  const navigation = useNavigation();

  return (
    <RocketVersusShieldBackground>
      <View style={styles.welcRocketContainer}>
        {currentOnboardIndex === 0 && (
          <Image
            source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldOnboard1.png')}
            style={{ width: '100%' }}
          />
        )}
        {currentOnboardIndex === 1 && (
          <Image
            source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldOnboard2.png')}
            style={{ width: '100%' }}
          />
        )}
        {currentOnboardIndex === 2 && (
          <Image
            source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldOnboard3.png')}
            style={{ width: '100%' }}
          />
        )}
        <LinearGradient
          colors={['#FAA506', '#F6FA7E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.rocketGradient}
        >
          <View style={styles.rocketWelcContainer}>
            <Text style={styles.rocketTitle}>
              {currentOnboardIndex === 0
                ? 'Rocket vs Shield'
                : currentOnboardIndex === 1
                ? 'Solo or Party'
                : 'Play. Earn. Improve'}
            </Text>
            <Text style={styles.rocketSubtitle}>
              {currentOnboardIndex === 0
                ? 'Control a rocket or a space shield. The rocket tries to hit the shield, and the shield tries to stop it at all costs.'
                : currentOnboardIndex === 1
                ? 'Play solo against the bot, choosing your side, or compete with a friend in Party mode. 3 rounds will decide who is the best.'
                : 'For each game you get stars. Use them to unlock skins for the rocket and shield and climb the leaderboard.'}
            </Text>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                currentOnboardIndex === 2
                  ? navigation.replace('RocketVersusShieldHome')
                  : setCurrentOnboardIndex(currentOnboardIndex + 1)
              }
            >
              <LinearGradient
                colors={['#FAA506', '#F6FA7E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 22,
                  width: 260,
                  height: 74,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 40,
                }}
              >
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 20,
                    fontFamily: 'Ubuntu-Medium',
                  }}
                >
                  {currentOnboardIndex === 0
                    ? 'Next'
                    : currentOnboardIndex === 1
                    ? 'Okay'
                    : 'Start'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </RocketVersusShieldBackground>
  );
};

const styles = StyleSheet.create({
  welcRocketContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rocketGradient: {
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    width: '100%',
  },
  rocketWelcContainer: {
    padding: 20,
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    alignItems: 'center',
    backgroundColor: '#000000',
    margin: 1,
    marginBottom: 0,
    paddingVertical: 40,
    minHeight: 340,
  },
  rocketTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Ubuntu-Medium',
  },
  rocketSubtitle: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
    fontFamily: 'Ubuntu-Regular',
    marginBottom: 40,
  },
});

export default RocketVersusShieldOnboard;

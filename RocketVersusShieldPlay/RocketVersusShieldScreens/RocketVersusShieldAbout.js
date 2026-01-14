import {
  Image,
  ImageBackground,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RocketVersusShieldBackground from '../RocketVersusShieldComponents/RocketVersusShieldBackground';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import RocketVersusShieldHeader from '../RocketVersusShieldComponents/RocketVersusShieldHeader';

const RocketVersusShieldAbout = () => {
  const navigation = useNavigation();

  const handleRocketVersusShieldShare = () => {
    Share.share({
      message: `RockatP|alu Versus is a competitive space arcade game where players take control of a rocket or a defensive shield in fast reflex-based matches. Play solo against AI or challenge friends in party mode, earn stars in every game, unlock visual skins, and climb the global leaderboard.`,
    });
  };

  return (
    <RocketVersusShieldBackground>
      <View style={styles.welcRocketContainer}>
        <RocketVersusShieldHeader
          onPress={() => navigation.goBack()}
          headTitle="About"
        />

        <ImageBackground
          source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldHomeLogoBg.png')}
          style={styles.rocketBgBlur}
        >
          <Image
            source={require('../../assets/RocketVersusShieldImages/iconnew.png')}
            style={{ width: 220, height: 210, borderRadius: 20 }}
          />
        </ImageBackground>

        <View style={styles.rocketAboutContainer}>
          <Text style={styles.rocketAboutText}>
            RockatP|alu Versus is a competitive space arcade game where players
            take control of a rocket or a defensive shield in fast reflex-based
            matches. Play solo against AI or challenge friends in party mode,
            earn stars in every game, unlock visual skins, and climb the global
            leaderboard.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleRocketVersusShieldShare}
        >
          <LinearGradient
            colors={['#FAA506', '#F6FA7E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.rocketGradientBtn}
          >
            <Text style={styles.rocketBtnText}>Share</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </RocketVersusShieldBackground>
  );
};

const styles = StyleSheet.create({
  welcRocketContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop: 80,
  },
  rocketGradientBtn: {
    borderRadius: 22,
    width: 260,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
    top: -35,
  },
  rocketBtnText: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
  },
  rocketBgBlur: {
    width: 360,
    height: 360,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rocketAboutContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    backgroundColor: '#252A34',
    width: '90%',
    borderRadius: 22,
    paddingTop: 26,
    paddingBottom: 50,
  },
  rocketAboutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default RocketVersusShieldAbout;

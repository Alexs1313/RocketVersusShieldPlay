import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RocketVersusShieldBackground from '../RocketVersusShieldComponents/RocketVersusShieldBackground';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import RocketVersusShieldGradientButton from '../RocketVersusShieldComponents/RocketVersusShieldGradientButton';

const RocketVersusShieldHome = () => {
  const navigation = useNavigation();

  return (
    <RocketVersusShieldBackground>
      <View style={styles.welcRocketContainer}>
        <ImageBackground
          source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldHomeLogoBg.png')}
          style={styles.rocketBgBlur}
        >
          <Image
            source={require('../../assets/RocketVersusShieldImages/iconnew.png')}
            style={{ width: 220, height: 215, borderRadius: 19 }}
          />
        </ImageBackground>

        <View
          style={{
            width: '100%',
            gap: 20,
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('RocketVersusShieldChooseMode')}
          >
            <LinearGradient
              colors={['#FAA506', '#F6FA7E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.rocketGradientBtn}
            >
              <Text style={styles.rocketBtnText}>Game</Text>
            </LinearGradient>
          </TouchableOpacity>

          <RocketVersusShieldGradientButton
            btnText={'Market'}
            onPress={() => navigation.navigate('RocketVersusShieldMarket')}
          />
          <RocketVersusShieldGradientButton
            btnText={'Statistics'}
            onPress={() => navigation.navigate('RocketVersusShieldStatistics')}
          />

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('RocketVersusShieldAbout')}
          >
            <Image
              source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldInfo.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </RocketVersusShieldBackground>
  );
};

const styles = StyleSheet.create({
  welcRocketContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  rocketGradientBtn: {
    borderRadius: 22,
    width: 260,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default RocketVersusShieldHome;

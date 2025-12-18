import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const RocketVersusShieldHeader = ({ onPress, headTitle }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
      }}
    >
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <Image
          source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldBack.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ alignSelf: 'center', flex: 1 }}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={['#FAA506', '#F6FA7E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 24.6,
          }}
        >
          <LinearGradient
            colors={['#000000', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 24,
              padding: Platform.OS === 'ios' ? 1 : 0,
              margin: Platform.OS === 'ios' ? 0 : 1,
            }}
          >
            <View
              style={{
                height: 52,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 22,
                  fontFamily: 'Ubuntu-Medium',
                  bottom: Platform.OS === 'ios' ? 2 : 0,
                  textAlign: 'center',
                }}
              >
                {headTitle}
              </Text>
            </View>
          </LinearGradient>
        </LinearGradient>
      </TouchableOpacity>

      <Image
        source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldLogoHead.png')}
      />
    </View>
  );
};

export default RocketVersusShieldHeader;

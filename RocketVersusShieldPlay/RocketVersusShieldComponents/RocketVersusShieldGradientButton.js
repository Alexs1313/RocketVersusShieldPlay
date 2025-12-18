import { Platform, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const RocketVersusShieldGradientButton = ({
  onPress,
  btnText,
  buttonHeight = 70,
  buttonWidth = '55%',
  buttonColors = ['#000000', '#000000', '#000000'],
  buttonBorders = ['#FAA506', '#F6FA7E'],
  buttonTextColor = '#FFFFFF',
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={{ alignSelf: 'center', width: buttonWidth }}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={() => {
        onPress();
      }}
    >
      <LinearGradient
        colors={buttonBorders}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 22,
        }}
      >
        <LinearGradient
          colors={buttonColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 21,
            padding: Platform.OS === 'ios' ? 2 : 0,
            margin: Platform.OS === 'ios' ? 0 : 2,
          }}
        >
          <View
            style={{
              height: buttonHeight,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: buttonTextColor,
                fontSize: 20,
                fontFamily: 'Ubuntu-Medium',
                bottom: Platform.OS === 'ios' ? 2 : 0,
                textAlign: 'center',
              }}
            >
              {btnText}
            </Text>
          </View>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default RocketVersusShieldGradientButton;

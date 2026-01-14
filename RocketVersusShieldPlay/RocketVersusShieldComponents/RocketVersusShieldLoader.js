import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import { rocketHtmlLoader } from '../RocketVersusShieldConsts/rocketHtmlLoader';
import RocketVersusShieldBackground from './RocketVersusShieldBackground';
import { useNavigation } from '@react-navigation/native';

const RocketVersusShieldLoader = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      navigation.navigate('RocketVersusShieldOnboard');
    }, 5000);

    return () => clearTimeout(loaderTimer);
  }, [navigation]);

  return (
    <RocketVersusShieldBackground>
      <View style={styles.rocketVersusShieldLoaderWrap}>
        <ImageBackground
          source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldHomeLogoBg.png')}
          style={styles.rocketBgBlur}
        >
          <Image
            source={require('../../assets/RocketVersusShieldImages/iconnew.png')}
            style={{ width: 300, height: 290, borderRadius: 20 }}
          />
        </ImageBackground>
      </View>

      <View style={styles.rocketVersusShieldLoaderCont}>
        <WebView
          originWhitelist={['*']}
          source={{ html: rocketHtmlLoader }}
          style={styles.rocketVersusShieldWebview}
          scrollEnabled={false}
        />
      </View>
    </RocketVersusShieldBackground>
  );
};

const styles = StyleSheet.create({
  rocketVersusShieldLoaderWrap: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80,
    height: 700,
  },
  rocketVersusShieldLoaderCont: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  rocketVersusShieldWebview: {
    width: 400,
    height: 340,
    backgroundColor: 'transparent',
  },
  rocketBgBlur: {
    width: 460,
    height: 460,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default RocketVersusShieldLoader;

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RocketVersusShieldHeader from '../RocketVersusShieldComponents/RocketVersusShieldHeader';
import RocketVersusShieldBackground from '../RocketVersusShieldComponents/RocketVersusShieldBackground';
import { useFocusEffect } from '@react-navigation/native';
import { useStore } from '../RocketVersusShieldStore/rocketVersusShieldContext';
import Orientation from 'react-native-orientation-locker';

const RocketVersusShieldStatistics = ({ navigation }) => {
  const [tabRocketVersusShield, setTabRocketVersusShield] = useState('ROCKET');
  const {
    rocketStatsRocketVersusShield,
    shieldStatsRocketVersusShield,
    loadStatsRocketVersusShield,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadStatsRocketVersusShield();

      Orientation.lockToPortrait();
      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  const buildPlayersRocketVersusShield = selectedPlayers => {
    const playersList = Object.entries(selectedPlayers)
      .map(([name, score]) => ({ name, score }))
      .sort((a, b) => b.score - a.score);

    while (playersList.length < 4) {
      playersList.push({ name: '---', score: '---' });
    }

    return playersList.slice(0, 4);
  };

  const dataRocketVersusShield =
    tabRocketVersusShield === 'ROCKET'
      ? {
          total: rocketStatsRocketVersusShield.total,
          players: buildPlayersRocketVersusShield(
            rocketStatsRocketVersusShield.players,
          ),
        }
      : {
          total: shieldStatsRocketVersusShield.total,
          players: buildPlayersRocketVersusShield(
            shieldStatsRocketVersusShield.players,
          ),
        };

  const handleShare = () => {
    Share.share({
      message: `Rocket vs Shield - ${tabRocketVersusShield} Statistics\n\nTotal rounds won: ${
        dataRocketVersusShield.total
      }\n\nTop Players:\n${dataRocketVersusShield.players
        .map(
          (player, index) => `${index + 1}. ${player.name} - ${player.score}`,
        )
        .join('\n')}`,
    });
  };

  return (
    <RocketVersusShieldBackground>
      <View style={styles.containerRocketVersusShield}>
        <RocketVersusShieldHeader
          onPress={() => navigation.goBack()}
          headTitle="Statistics"
        />

        <View style={styles.tabsRocketVersusShield}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setTabRocketVersusShield('ROCKET')}
          >
            <LinearGradient
              colors={
                tabRocketVersusShield === 'ROCKET'
                  ? ['#FAA506', '#F6FA7E']
                  : ['#000000', '#000000']
              }
              style={[
                styles.tabRocketVersusShield,
                tabRocketVersusShield !== 'ROCKET' &&
                  styles.tabInactiveRocketVersusShield,
              ]}
            >
              <Image
                source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldRock.png')}
                style={{ width: 22, height: 34 }}
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
            style={{ flex: 1 }}
            onPress={() => setTabRocketVersusShield('SHIELD')}
          >
            <LinearGradient
              colors={
                tabRocketVersusShield === 'SHIELD'
                  ? ['#FAA506', '#F6FA7E']
                  : ['#000000', '#000000']
              }
              style={[
                styles.tabRocketVersusShield,
                tabRocketVersusShield !== 'SHIELD' &&
                  styles.tabInactiveRocketVersusShield,
              ]}
            >
              <Image
                source={require('../../assets/RocketVersusShieldImages/RocketVersusShieldSh.png')}
                style={{ width: 24, height: 26 }}
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

        <View style={styles.totalCardRocketVersusShield}>
          <Text style={styles.totalLabelRocketVersusShield}>
            Total rounds won
          </Text>
          <Text style={styles.totalValueRocketVersusShield}>
            {dataRocketVersusShield.total}
          </Text>
        </View>

        <View style={styles.listRocketVersusShield}>
          {dataRocketVersusShield.players.map((item, index) => (
            <View key={index} style={styles.rowRocketVersusShield}>
              <View style={styles.rankBoxRocketVersusShield}>
                <Text style={styles.rankTextRocketVersusShield}>
                  {index + 1}
                </Text>
              </View>

              <Text style={styles.nameRocketVersusShield}>{item.name}</Text>

              <View style={styles.scoreBoxRocketVersusShield}>
                <Text style={styles.scoreRocketVersusShield}>{item.score}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleShare();
          }}
        >
          <LinearGradient
            colors={['#FAA506', '#F6FA7E']}
            style={styles.shareBtnRocketVersusShield}
          >
            <Text style={styles.shareTextRocketVersusShield}>Share</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </RocketVersusShieldBackground>
  );
};

const styles = StyleSheet.create({
  containerRocketVersusShield: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  tabsRocketVersusShield: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },
  tabRocketVersusShield: {
    height: 57,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  tabInactiveRocketVersusShield: {
    borderWidth: 1,
    borderColor: '#795100',
    borderRadius: 20,
  },
  tabTextRocketVersusShield: {
    fontSize: 19,
    fontFamily: 'Ubuntu-Medium',
    color: '#795100',
    borderRadius: 20,
  },

  tabTextActiveRocketVersusShield: {
    color: '#000',
  },
  totalCardRocketVersusShield: {
    marginTop: 30,
    borderRadius: 22,
    backgroundColor: '#252A34',
    borderWidth: 1,
    borderColor: '#f6c800',
    paddingVertical: 24,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    minHeight: 150,
  },
  totalLabelRocketVersusShield: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Ubuntu-Regular',
  },
  totalValueRocketVersusShield: {
    color: '#fff',
    fontSize: 44,
    marginTop: 14,
    fontFamily: 'Ubuntu-Medium',
  },
  listRocketVersusShield: {
    marginTop: 24,
  },
  rowRocketVersusShield: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2333',
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  rankBoxRocketVersusShield: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#000911',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  rankTextRocketVersusShield: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
  },
  nameRocketVersusShield: {
    flex: 1,
    color: '#fff',
    fontSize: 19,
    fontFamily: 'Ubuntu-Medium',
  },
  scoreBoxRocketVersusShield: {
    backgroundColor: '#000911',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 6,
    height: 50,
    minWidth: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreRocketVersusShield: {
    color: '#fff',
    fontSize: 19,
    fontFamily: 'Ubuntu-Medium',
  },
  shareBtnRocketVersusShield: {
    marginTop: 22,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    width: 260,
    height: 67,
    alignSelf: 'center',
  },
  shareTextRocketVersusShield: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
  },
});

export default RocketVersusShieldStatistics;

import { ScrollView, View } from 'react-native';

const RocketVersusShieldBackground = ({ children }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000911' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default RocketVersusShieldBackground;

import * as React from 'react';
import { Image, Animated, StyleSheet, Alert, Text, View, Button, ActivityIndicator, Easing } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const rotateAnim = React.useRef(new Animated.Value(0)).current

  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState('');

  const fetchData = () => {
    startFlip()

    setLoading(true);
    fetch('https://coin-flip1.p.rapidapi.com/headstails', {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "coin-flip1.p.rapidapi.com",
        "x-rapidapi-key": 'apikey'
      }
    })
      .then((response) => response.json())
      .then((json) => setData(json.outcome))
      .catch(() => Alert.alert('Something went wrong..', 'There was an error fetching coin flip.'))
      .finally(() => {
        setLoading(false)
        resetFlip()
      });
  };

  const startFlip = () => {
    Animated.timing(
      rotateAnim,
      {
        toValue: 100,
        easing: Easing.inOut(Easing.exp)
      }
    ).start();

  }

  const resetFlip = () => {
    Animated.timing(
      rotateAnim,
      {
        toValue: 0,
      }
    ).reset();
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Animated.View style={{
          ...styles.coinImageContainer,
          transform: [
            { scale: 1.1 },
            { rotateX: rotateAnim },
            { perspective: 1000 }
          ]
        }}>
          <Image
            source={{ uri: 'https://cdn.pixabay.com/photo/2018/05/17/00/24/quarter-3407493_960_720.png' }}
            style={styles.welcomeImage}
          />
        </Animated.View>
        <View style={{ padding: 24 }}>
          {isLoading ? <ActivityIndicator /> :
            <Text style={styles.flipResultText}>{data.toUpperCase()}</Text>
          }
        </View>
        <View style={styles.flipContainer}>

          <Text style={styles.flipTitle}>Flip On It!</Text>
          <Text style={styles.basicText}>An app to help you achieve even odds in the digital age!</Text>

          <View style={styles.buttonContainer}>
            <Button
              title="Flip Coin"
              onPress={() => fetchData()}
              color="#FFFFFF"
              accessibilityLabel="Fetch heads or tails"
            />
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  coinImageContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 150,
    height: 124,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  flipContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  flipTitle: {
    fontSize: 25,
    color: '#000',
    marginVertical: 8,
    paddingTop: 10,
    paddingHorizontal: 10,
    lineHeight: 24,
    textAlign: 'center',
  },
  basicText: {
    fontSize: 15,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 18,
    textAlign: 'center',
  },
  flipResultText: {
    fontSize: 35,
    color: '#FF0000',
    textAlign: 'center',
    fontWeight: "700"
  },
  buttonContainer: {
    backgroundColor: "#1a1aff",
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 5,
  }
});

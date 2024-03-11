import { StyleSheet, Dimensions, View, Text, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const SponsorCarousel = () => {

  const sponsorImages = [<Image style={styles.carouselImage} source={require('../assets/SponsorLogos/TakedaLogo.jpg')}></Image>, 
                        <Image style={styles.carouselImage} source={require('../assets/SponsorLogos/MerckLogo.jpg')}></Image>,
                        <Image style={styles.carouselImage} source={require('../assets/SponsorLogos/ScottiesLogo.jpg')}></Image>,
                        <Image style={styles.carouselImage} source={require('../assets/SponsorLogos/GutsywalkLogo.jpg')}></Image>]

  const width = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1, }}>
    <Carousel
        loop={false}
        width={width}
        height={width / 2}
        autoPlay={false}
        data={[...new Array(4).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => (
            <View
                style={styles.carouselContainer}
            >
              {sponsorImages[index]}
            </View>
        )}
    />
</View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: 95*vw,
    height: 50*vw,
    margin: 'auto',
    borderWidth: 3,
    borderColor: '#efefef',
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 2.5*vw,
  },
  carouselImage: {
    width: 'auto',
    objectFit: 'scale-down',
  },
});

export default SponsorCarousel;
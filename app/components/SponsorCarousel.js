import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StyleSheet, Dimensions, View, Text } from 'react-native';

const vh = Dimensions.get('window').height / 100;
const vw = Dimensions.get('window').width / 100;

const SponsorCarousel = () => {
  return (
      <Carousel slide={true}
                controls={true}
                indicators={true}
                touch={true}
                interval={null}
                wrap={false}>
        <Carousel.Item>
          <View style={styles.carouselContainer}>
            <img src={'../assets/SponsorLogos/TakedaLogo.jpg'} style={styles.carouselImage}/>
          </View>
        </Carousel.Item>
        <Carousel.Item>
          <View style={styles.carouselContainer}>
          <img src={'../assets/SponsorLogos/MerckLogo.jpg'} style={styles.carouselImage}/>
          </View>
        </Carousel.Item>
        <Carousel.Item>
          <View style={styles.carouselContainer}>
            <img src={'../assets/SponsorLogos/ScottiesLogo.jpg'} style={styles.carouselImage}/>
          </View>
        </Carousel.Item>
        <Carousel.Item>
          <View style={styles.carouselContainer}>
            <img src={'../assets/SponsorLogos/GutsywalkLogo.jpg'} style={styles.carouselImage}/>
          </View>
        </Carousel.Item>
      </Carousel>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: 80*vw,
    height: 42*vw,
    margin: 'auto',
    borderWidth: 3,
    borderColor: '#efefef',
    borderRadius: 20,
    overflow: 'hidden'
  },
  carouselImage: {
    objectFit: 'scale-down',
  },
});

export default SponsorCarousel;
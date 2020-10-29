/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Color from 'color';

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import TouchableItem from '../../components/TouchableItem';

// import colors
import Colors from '../../theme/colors';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cardImg: {borderRadius: 4},
  card: {
    marginVertical: 6,
    height: 100,
    resizeMode: 'cover',
  },
  cardOverlay: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: Color(Colors.overlayColor).alpha(0.2),
    overflow: 'hidden',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 4,
  },
  cardTitle: {
    padding: 16,
    fontWeight: '700',
    fontSize: 18,
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.88)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});

export default class CategoriesA extends Component {
  // constructor(props) {
  //   super(props);



  //   this.state = {
  //     data: [
  //       {
  //         id: 1,
  //         image: 'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png',
  //         name: 'Pizas',
  //       },
  //       {
  //         id: 2,
  //         image: require('../../assets/img/meat_1.jpg'),
  //         name: 'Grill',
  //       },
  //       {
  //         id: 3,
  //         image: require('../../assets/img/spaghetti_2.jpg'),
  //         name: 'Pasta',
  //       },
  //       {
  //         id: 4,
  //         image: require('../../assets/img/soup_1.jpg'),
  //         name: 'Soups',
  //       },
  //       {
  //         id: 5,
  //         image: require('../../assets/img/salad_1.jpg'),
  //         name: 'Salads',
  //       },
  //       {
  //         id: 6,
  //         image: require('../../assets/img/cake_2.jpg'),
  //         name: 'Dessert',
  //       },
  //     ],
  //   };
  // }

    //Define your state for your component. 
    state = {
      //Assing a array to your pokeList state
      data: [],
      //Have a loading state where when data retrieve returns data. 
      loading: true
  }
  //Define your componentDidMount lifecycle hook that will retrieve data.
  //Also have the async keyword to indicate that it is asynchronous. 
  async componentDidMount() {
      //Have a try and catch block for catching errors.
      try {
          //Assign the promise unresolved first then get the data using the json method. 
          const categoriesApiCall = await fetch('http://xnativesfoods.com/api/categories/');
          const categories = await categoriesApiCall.json();
          this.setState({data: categories.data, loading: false});
          console.log(categories);

      } catch(err) {
          console.log("Error fetching data-----------", err);
      }
  }
  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  keyExtractor = (item, index) => index.toString();

  renderCategoryItem = ({item, index}) => (
    <ImageBackground
      key={index}
      source={getImgSource(item.image)}
      imageStyle={styles.cardImg}
      style={styles.card}>
      <View style={styles.cardOverlay}>
        <TouchableItem
          onPress={this.navigateTo('Category')}
          style={styles.cardContainer}
          // borderless
        >
          <Text style={styles.cardTitle}>{item.name}</Text>
        </TouchableItem>
      </View>
    </ImageBackground>
  );

  render() {
    const {data} = this.state;

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCategoryItem}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
      </SafeAreaView>
    );
  }
}

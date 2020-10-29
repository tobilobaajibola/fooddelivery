/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component, Fragment} from 'react';
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

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// CategoriesB Config
// CARD_WIDTH = (SCREEN_WIDTH - 2 * categoriesContainer.padding - 4 * card.margin) / 2
const CARD_WIDTH = (Layout.SCREEN_WIDTH - 2 * 8 - 4 * 8) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.08;
const CARD_BORDER_RADIUS = 6;

// CategoriesB Styles
const styles = StyleSheet.create({
  topArea: {flex: 0, backgroundColor: Colors.primaryColor},
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  categoriesContainer: {
    padding: 8,
  },
  cardImg: {
    borderRadius: CARD_BORDER_RADIUS,
  },
  card: {
    margin: 8,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  cardOverlay: {
    flex: 1,
    borderRadius: CARD_BORDER_RADIUS,
    backgroundColor: Color(Colors.overlayColor).alpha(0.24),
    overflow: 'hidden',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardTitle: {
    paddingBottom: 2,
    fontWeight: '700',
    fontSize: 20,
    color: Colors.white,
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  items: {
    paddingBottom: 28,
    fontWeight: '700',
    fontSize: 13,
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});

export default class CategoriesA extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     categories: [
  //       {
  //         key: 1,
  //         imageUri: require('../../assets/img/pizza_3.jpg'),
  //         name: 'Pizz',
  //         items: 17,
  //       },
  //       {
  //         key: 2,
  //         imageUri: require('../../assets/img/meat_1.jpg'),
  //         name: 'Grill',
  //         items: 48,
  //       },
  //       {
  //         key: 3,
  //         imageUri: require('../../assets/img/spaghetti_2.jpg'),
  //         name: 'Pasta',
  //         items: 23,
  //       },
  //       {
  //         key: 4,
  //         imageUri: require('../../assets/img/soup_1.jpg'),
  //         name: 'Soups',
  //         items: 9,
  //       },
  //       {
  //         key: 5,
  //         imageUri: require('../../assets/img/salad_1.jpg'),
  //         name: 'Salads',
  //         items: 15,
  //       },
  //       {
  //         key: 6,
  //         imageUri: require('../../assets/img/cake_2.jpg'),
  //         name: 'Dessert',
  //         items: 26,
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

  keyExtractor = item => item.key;

  renderCategoryItem = ({item, index}) => (
    <ImageBackground
      key={index}
      source={getImgSource('http://xnativesfoods.com/uploads/'+item.image)}
      imageStyle={styles.cardImg}
      style={styles.card}>
      <View style={styles.cardOverlay}>
        <TouchableItem
          onPress={this.navigateTo('Category', {categoryId:item.id})}
          style={styles.cardContainer}
          // borderless
        >
          <Fragment>
            <Text style={styles.cardTitle}>{item.name}</Text>
            {/* <Text style={styles.items}>{`${item.items} items`}</Text> */}
          </Fragment>
        </TouchableItem>
      </View>
    </ImageBackground>
  );

  render() {
    const {data} = this.state;

    return (
      <Fragment>
        <SafeAreaView style={styles.topArea} />
        <SafeAreaView style={styles.screenContainer}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCategoryItem}
            numColumns={2}
            contentContainerStyle={styles.categoriesContainer}
          />
        </SafeAreaView>
      </Fragment>
    );
  }
}

/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, {Component} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import Divider from '../../components/divider/Divider';
import LinkButton from '../../components/buttons/LinkButton';
import ProductCard from '../../components/cards/ProductCard';
import {Heading6} from '../../components/text/CustomText';

// import colors
import Colors from '../../theme/colors';

// HomeB Config
const imgHolder = require('../../assets/img/imgholder.png');

// HomeB Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  categoriesContainer: {
    paddingBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  titleText: {
    fontWeight: '700',
  },
  viewAllText: {
    color: Colors.primaryColor,
  },
  categoriesList: {
    paddingTop: 4,
    paddingRight: 16,
    paddingLeft: 8,
  },
  categoryContainer: {
    marginLeft: 8,
    width: 112,
    height: 112,
  },
  categoryThumbnail: {
    borderRadius: 8,
    width: '100%',
    height: '100%',
  },
  categoryImg: {
    borderRadius: 8,
  },
  categoryName: {
    position: 'absolute',
    top: 6,
    left: 6,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(128, 128, 128, 0.84)',
  },
  categoryNameText: {
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.6,
  },
});

// HomeB
export default class HomeB extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
          
  //     products: [
  //       {
  //         image: require('../../assets/img/pizza_1.jpg'),
  //         name: 'Pizza Margarita 35cm',
  //         price: 10.99,
  //         description:
  //           'Made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt and extra-virgin olive oil',
  //         qty: 0,
  //       },
  //       {
  //         image: require('../../assets/img/sandwich_2.jpg'),
  //         name: 'Subway Sandwich',
  //         price: 8.49,
  //         description:
  //           'Ham sandwich with two servings of crisp veggies on freshly baked bread for under 400 calories',
  //         qty: 0,
  //       },
  //       {
  //         image: require('../../assets/img/cake_1.jpg'),
  //         name: 'Chocolate Cake',
  //         price: 4.99,
  //         description: 'Cake flavored with melted chocolate, cocoa powder',
  //         qty: 0,
  //       },
  //       {
  //         image: require('../../assets/img/soup_1.jpg'),
  //         name: 'Roasted Carrot Soup',
  //         price: 11.99,
  //         description:
  //           'Plain greek yogurt, olive oil, garlic, fresh basil, whole peeled tomatoes',
  //         qty: 0,
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

async componentDidMount() {
    try {
      // get products
      const productsApiCall = await fetch('http://xnativesfoods.com/api/products/');
      const products = await productsApiCall.json();
      this.setState({ products: products.data.data, loading: false });
      // get categories
      
        const categoriesApiCall = await fetch('http://xnativesfoods.com/api/categories/');
        const categories = await categoriesApiCall.json();
        this.setState({data: categories.data, loading: false});
       
    } catch(err) {
        console.log("Error fetching data-----------", err);
    }
}

  navigateTo = screen => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  onPressRemove = item => () => {
    let {qty} = item;
    qty -= 1;

    const {products} = this.state;
    const index = products.indexOf(item);

    if (qty < 0) {
      return;
    }
    products[index].qty = qty;

    this.setState({
      products: [...products],
    });
  };

  onPressAdd = item => () => {
    const {qty} = item;
    const {products} = this.state;

    const index = products.indexOf(item);
    products[index].qty = qty + 1;

    this.setState({
      products: [...products],
    });
  };

  keyExtractor = (item, index) => index.toString();

  renderProductItem = ({item, index}) => (
    <ProductCard
      // onPress={this.navigateTo('Product', { 'productId': item.image })}
      onPress={this.navigateTo('Product', {productId: 1 })}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      key={index}
      activeOpacity={0.7}
      imageUri={'http://xnativesfoods.com/uploads/' + item.image}
      title={item.name}
      price={item.price}
      description={item.description}
      quantity={item.qty}
      swipeoutDisabled
    />
  );

  renderSeparator = () => <Divider />;

  render() {
    const {categories, products} = this.state;
    // alert(JSON.stringify(this.state.data));
    // alert(JSON.stringify(this.state.products));

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <ScrollView>
            <View style={styles.categoriesContainer}>
              <View style={styles.titleContainer}>
                <Heading6 style={styles.titleText}>Categories</Heading6>
                <LinkButton
                  title="View all"
                  titleStyle={styles.viewAllText}
                  onPress={this.navigateTo('Categories')}
                />
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}>
                 {(this.state.data)&&
                   this.state.data.map(category => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={category.id}
                      onPress={this.navigateTo('Category')}>
                      <View style={styles.categoryContainer}>
                        <ImageBackground
                          defaultSource={imgHolder}
                          source={getImgSource('http://xnativesfoods.com/uploads/'+category.image)}
                          style={styles.categoryThumbnail}
                          imageStyle={styles.categoryImg}>
                          <View style={styles.categoryName}>
                            <Text style={styles.categoryNameText}>
                              {category.name}
                            </Text>
                          </View>
                        </ImageBackground>
                      </View>
                    </TouchableOpacity>
                  )) 
                  }
                
              </ScrollView>
            </View>

            <View style={styles.titleContainer}>
              <Heading6 style={styles.titleText}>Popular</Heading6>
              <LinkButton
                title="View all"
                titleStyle={styles.viewAllText}
                onPress={this.navigateTo('SearchResults')}
              />
            </View>
            {(this.state.products) &&
            <FlatList
              data={products}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderProductItem}
              ItemSeparatorComponent={this.renderSeparator}
            />
  }
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

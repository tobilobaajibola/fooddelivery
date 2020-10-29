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
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';

// import components
import Divider from '../../components/divider/Divider';
import ProductCard from '../../components/cards/ProductCard';

// import colors
import Colors from '../../theme/colors';

// CategoryB Config

// CategoryB Styles
const styles = StyleSheet.create({
  topArea: {flex: 0, backgroundColor: Colors.primaryColor},
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  productList: {
    paddingVertical: 8,
  },
});

export default class CategoryB extends Component {


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
          // const { navigation } = this.props;
          // const categoryId = navigation.getParam('categoryId', 'NO-ID');
            //Assign the promise unresolved first then get the data using the json method. 
            const productsApiCall = await fetch('http://xnativesfoods.com/api/products');
            const products = await productsApiCall.json();
            this.setState({data: products.data.data, loading: false});
            console.log("Error fetching data-----------", err);

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

  onPressRemove = item => () => {
    let {qty} = item;
    qty -= 1;

    const {data} = this.state;
    const index = data.indexOf(item);

    if (qty < 0) {
      return;
    }
    data[index].qty = qty;

    this.setState({
      data: [...data],
    });
  };

  onPressAdd = item => () => {
    const {qty} = item;
    const {data} = this.state;

    const index = data.indexOf(item);
    data[index].qty = qty + 1;

    this.setState({
      data: [...data],
    });
  };

  keyExtractor = (item, index) => index.toString();

  renderProductItem = ({item, index}) => (
    <ProductCard
      onPress={this.navigateTo('Product')}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      key={index}
      activeOpacity={0.7}
      imageUri={'http://xnativesfoods.com/uploads/'+item.image}
      title={item.name}
      price={item.price}
      quantity={item.qty}
      swipeoutDisabled
    />
  );

  renderSeparator = () => <Divider type="inset" marginLeft={0} />;

  render() {
    const {data} = this.state;


    return (
      <Fragment>
        <SafeAreaView style={styles.topArea} />
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <FlatList
            data={data}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderProductItem}
            ItemSeparatorComponent={this.renderSeparator}
            contentContainerStyle={styles.productList}
          />
        </SafeAreaView>
      </Fragment>
    );
  }
}

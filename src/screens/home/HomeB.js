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
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions';

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import Divider from '../../components/divider/Divider';
import LinkButton from '../../components/buttons/LinkButton';
import ProductCard from '../../components/cards/ProductCard';
import {Heading6} from '../../components/text/CustomText';

// import colors
import Colors from '../../theme/colors';
import {connect} from 'react-redux';

// HomeB Config
const imgHolder = require('../../assets/img/imgholder.png');

const {width, height} = Dimensions.get('window');

const heightPercentage = (perc) => (height / 100) * perc;
const widthPercentage = (perc) => (width / 100) * perc;

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
  loaderContainer: {
    position: 'absolute',
    width: widthPercentage(100),
    height: heightPercentage(100),
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  loaderInner: {
    width: 100,
    height: 100,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

// HomeB
class HomeB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      categories: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.props.getProducts();
    this.props.getCategories();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.categories !== this.props.categories ||
      prevProps.products !== this.props.products
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        categories: this.props.categories,
        products: this.props.products,
      });
    }
  }

  navigateTo = (screen) => () => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  onRefresh = async () => {
    this.setState((prevState) => ({refreshing: !prevState}));
    try {
      await this.props.getProducts();
      await this.props.getCategories();
    } catch (e) {
      console.log(e);
    } finally {
      this.setState((prevState) => ({refreshing: !prevState}));
    }
  };

  onPressRemove = (item) => () => {
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

  onPressAdd = (item) => () => {
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
      onPress={this.navigateTo('Product', {productId: 1})}
      onPressRemove={this.onPressRemove(item)}
      onPressAdd={this.onPressAdd(item)}
      key={index}
      activeOpacity={0.7}
      imageUri={'https://xnativesfoods.com/uploads/' + item.image}
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

    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar
          backgroundColor={Colors.statusBarColor}
          barStyle="dark-content"
        />

        {this.props.loading && (
          <View style={styles.loaderContainer}>
            <View style={styles.loaderInner}>
              <ActivityIndicator size="large" color={Colors.white} />
            </View>
          </View>
        )}

        <View style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }>
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
                {categories &&
                  categories.map((category) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={category.id}
                      onPress={this.navigateTo('Category')}>
                      <View style={styles.categoryContainer}>
                        <ImageBackground
                          defaultSource={imgHolder}
                          source={getImgSource(
                            'https://xnativesfoods.com/uploads/' +
                              category.image,
                          )}
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
                  ))}
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
            {this.state.products && (
              <FlatList
                data={products}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderProductItem}
                ItemSeparatorComponent={this.renderSeparator}
              />
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  loading: state.products.loadingProducts || state.products.loadingCategories,
  products: state.products.products,
  categories: state.products.categories,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(actions.getProducts()),
  getCategories: () => dispatch(actions.getCategories()),
});

HomeB.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  navigation: PropTypes.object,
  getProducts: PropTypes.func,
  getCategories: PropTypes.func,
  products: PropTypes.array,
  categories: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeB);

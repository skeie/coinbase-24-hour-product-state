import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { arrowDown } from '../common/images';
import { Item } from './allProductsContainer';
import ProductDetailsContainer from '../productDetails/productDetailsContainer';

type Props = {
  item: Item;
};

export default function AllProductsComponents({ item }: Props) {
  const [showDetails, onToggleDetails] = React.useState(false);

  function toggleDetails() {
    LayoutAnimation.easeInEaseOut();
    onToggleDetails(!showDetails);
  }

  return (
    <TouchableOpacity onPress={toggleDetails} testID={item.id}>
      <View style={styles.container}>
        <Text>{item.display_name}</Text>
        <Image
          source={arrowDown}
          style={{
            width: 24,
            height: 24,
            transform: [{ rotate: showDetails ? '180deg' : '0deg' }],
          }}
        />
      </View>
      {showDetails && <ProductDetailsContainer productId={item.id} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
  },
});

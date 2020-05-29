import {Image, StyleSheet, TouchableOpacity, View, Linking} from 'react-native';
import React from 'react';

import GridList from 'react-native-grid-list';
import Theme from '../Theme';
import CardView from 'react-native-cardview';
import Toast from 'react-native-simple-toast';
import Strings from '../Strings';
import {Toolbar} from 'react-native-material-ui';

export class List extends React.Component {
  getTitle() {
    return null;
  }

  renderToolbar() {
    return (
      <Toolbar
        style={{container: {backgroundColor: Theme.colors.primary}}}
        onLeftElementPress={() => this.props.navigation.openDrawer()}
        leftElement="menu"
        centerElement={this.getTitle()}
      />
    );
  }

  render() {
    return (
      <View style={{height: '100%'}}>
        {this.renderToolbar()}
        <View style={styles.container}>
          <GridList
            style={{width: '100%'}}
            data={this.getItems()}
            numColumns={2}
            renderItem={({item}) => <Item item={item} />}
          />
        </View>
      </View>
    );
  }

  getItems() {}
}

function Item({item}) {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        if (item.url) {
          Linking.canOpenURL(item.url).then(supported => {
            if (supported) {
              Linking.openURL(item.url);
            } else {
              console.log("Don't know how to open URI: " + item.url);
            }
          });
        } else {
          Toast.show(Strings.comingSoon);
        }
      }}>
      <CardView style={styles.card} cardElevation={2} cornerRadius={5}>
        <Image style={styles.image} source={item.thumbnail} />
      </CardView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
  },
  listItem: {
    padding: Theme.size.commonHalfMargin,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  card: {
    padding: 20,
    width: '100%',
    height: '100%',
  },
});
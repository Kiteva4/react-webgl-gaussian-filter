import * as React from "react";
import { View, Text } from "react-native";
import { styles } from "../Styles";
import WebGL from "../webgl";

export default class ImageHolderView extends React.Component {

  render() {
    return (
      <View style={{flex:1}} >
        <Text style={styles.text}>Результат</Text>
        <WebGL
          image_url={this.props.image_url}
          filterValue={this.props.filterValue} />
      </View>
    );
  }
}

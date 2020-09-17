import * as React from "react";
import { View } from "react-native";
import { styles } from "../Styles";
import WebGL from "../webgl";

export default class ImageHolderView extends React.Component {
  render() {
    return (
      <View style={styles.image_holder_view}>
        <WebGL filterValue={this.props.filterValue}/>
      </View>
    );
  }
}

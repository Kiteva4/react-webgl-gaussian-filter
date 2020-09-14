import * as React from "react";
import { View } from "react-native";
import { styles } from "./Styles";

import ImageHolderView from "./ImageHolderView";
import UserInputView from "./UserInputView";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: 0,
    };
  }
  onUpdateHandler = (_filterValue) => {
    this.setState({ filterValue: _filterValue });
  };

  render() {
    return (
      <View style={styles.main_screen_container}>
        <UserInputView onUpdate={this.onUpdateHandler} />
        <ImageHolderView filterValue={this.state.filterValue} />
      </View>
    );
  }
}

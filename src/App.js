import * as React from "react";
import { View, Text } from "react-native";
import { styles } from "./Styles";

import ImageHolderView from "./Components/ImageHolderView";
import UserInputView from "./Components/UserInputView";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: 0,
    };

    window.addEventListener('resize', () => {this.setState({filterValue: this.state.filterValue}) });
  }

  onUpdateHandler = (_filterValue) => {
    this.setState({ filterValue: _filterValue });
  };
 
  render() {
    return (
      <View style={styles.main_screen_container}>
        <View style={styles.user_input_view}>
          <UserInputView onUpdate={this.onUpdateHandler} />
        </View>
        <View style={styles.image_holder_view} >
          <ImageHolderView filterValue={this.state.filterValue} />
        </View>
      </View>
    );
  }
}

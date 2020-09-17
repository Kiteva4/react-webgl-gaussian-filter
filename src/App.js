import * as React from "react";
import { View } from "react-native";
import { styles } from "./Styles";

import ImageHolderView from "./Components/ImageHolderView";
import UserInputView from "./Components/UserInputView";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: 0,
      image_url: 'logo512.png',
    };
  }

  componentDidMount() { window.addEventListener('resize', () => { this.setState({}) }); }

  onChangedImageUrl = (_image_url) => { this.setState({ image_url: _image_url }) }

  onUpdateHandlerFilter = (_filterValue) => { this.setState({ filterValue: _filterValue }); };

  render() {
    return (
      <View style={styles.main_screen_container}>
        <View style={styles.user_input_view}>
          <UserInputView
            onChangedImageUrl={this.onChangedImageUrl}
            onUpdateSlider={this.onUpdateHandlerFilter} />
        </View>
        <View style={styles.image_holder_view} >
          <ImageHolderView
            image_url={this.state.image_url}
            filterValue={this.state.filterValue} />
        </View>
      </View>
    );
  }
}

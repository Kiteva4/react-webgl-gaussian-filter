import * as React from 'react';
import { Text, View } from 'react-native'
import { styles } from '../Styles';
import Slider from '@react-native-community/slider';

import LoadImageButton from './Buttons/LoadImageButton'
import SaveImageButton from './Buttons/SaveImageButton'

export default class UserInputView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: 0,
    };
  }

  onFileChangeHandler = (event) => {
    let newUrl = window.URL.createObjectURL(event.target.files[0]);
    this.props.onChangedImageUrl(newUrl);
  };

  onSliderValueChangeHandler = (value) => {
    this.setState({ filterValue: value });
    this.props.onUpdateSlider(this.state.filterValue);
  };

  render() {
    return (
      <View>
        <Text style={styles.text}> Интерфейс управления</Text>
        <View style={{ marginTop: 100, marginBottom: 50 }}>
          <Text style={styles.text}> Сила размытия </Text>
          <Slider
            onValueChange={this.onSliderValueChangeHandler}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="black"
            maximumTrackTintColor="grey"
          />
          <Text style={styles.text}>{this.state.filterValue.toFixed(5)}</Text>
        </View>
        <SaveImageButton />
        <LoadImageButton onFileChange={this.onFileChangeHandler} />
      </View>
    );
  }
}
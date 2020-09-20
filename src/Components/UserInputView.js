import * as React from 'react';
import { Text, View } from 'react-native'
import { styles } from '../Styles';
import Slider from '@react-native-community/slider';
import axios from 'axios';

import LoadImageButton from './Buttons/LoadImageButton'
import SaveImageButton from './Buttons/SaveImageButton'

export default class UserInputView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: 0,
      selectedFile: null,
    };
  }

  onFileChangeHandler = (event) => { this.setState({ selectedFile: event.target.files[0] }); };

  // On file upload (click the upload button) 
  onFileUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post("http://localhost:8000/upload", data, {
      // receive two    parameter endpoint url ,form data
    })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
  }

  onSliderValueChangeHandler = (value) => {
    this.setState({ filterValue: value });
    this.props.onUpdateSlider(this.state.filterValue);
  };

  render() {
    return (
      <View>
        <Text style={styles.text}> Интерфейс управления</Text>
        <Text style={styles.text}> Сила размытия </Text>
        <Slider
          onValueChange={this.onSliderValueChangeHandler}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="black"
          maximumTrackTintColor="grey"
        />
        <Text style={styles.text}>{this.state.filterValue.toFixed(5)}</Text>
        <SaveImageButton />
        <LoadImageButton onFileChange={this.onFileChangeHandler} />
      </View>
    );
  }
}
import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import { styles } from '../Styles';
import Slider from '@react-native-community/slider';
import axios from 'axios';

export default class UserInputView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: 0,
      selectedFile: null,
    };
  }

  onFileChange = (event) => { this.setState({ selectedFile: event.target.files[0] }); };

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            document.getElementById("fileSelector").click()
          }}
        >
          <input type="file" id="fileSelector" onChange={this.onFileChange} hidden={true} />
          <Text>Загрузить изображение</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            var download = document.createElement('a');
            download.href = document.getElementById("webgl").toDataURL('image/png', 1);
            download.download = 'reddot.png';
            download.click();
          }}
        >
          <Text>Сохранить изображение</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
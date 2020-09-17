import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import { styles } from '../Styles';
import Slider from '@react-native-community/slider';

export default class UserInputView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: 0,
    };
  }

  onValueChangeHandler = (value) => {
    this.setState({ filterValue: value });
    this.props.onUpdate(this.state.filterValue);
  };

  render() {
    return (
      <View>
        <Text style={styles.text}> Интерфейс управления</Text>
        <Text style={styles.text}> Сила размытия </Text>
        <Slider
          onValueChange={this.onValueChangeHandler}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="black"
          maximumTrackTintColor="grey"
        />
        <Text style={styles.text}>{this.state.filterValue.toFixed(5)}</Text>
        <TouchableOpacity style={styles.button}>
          <Text>Загрузить изображение</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            var download = document.createElement('a');
            download.href = document.getElementById("webgl").toDataURL('image/png',1);
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

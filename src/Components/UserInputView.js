import * as React from 'react';
import { Text, View } from 'react-native'
import { styles } from '../Styles';
import Slider from '@react-native-community/slider';

export default class UserInputView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: 1
    }
  }

  onValueChangeHandler = (value) => {
    this.setState({ filterValue: value })
    this.props.onUpdate(this.state.filterValue);
  }

  render() {
    return (
      <View style={styles.user_input_view}>
        <Text style={{ textAlign: 'center' }}>{this.state.filterValue} </Text>
        <Slider
          onValueChange={this.onValueChangeHandler}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor='steelblue'
          maximumTrackTintColor='grey'
        />
      </View>
    );
  }
}

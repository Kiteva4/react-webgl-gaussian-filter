import * as React from 'react';
import {View} from 'react-native'
import {styles} from './Styles'

import ImageHolderView from './ImageHolderView'
import UserInputView from './UserInputView'

export default class App extends React.Component{  
  render(){
    return (
      <View style = {styles.main_screen_container}>
        <UserInputView/>
        <ImageHolderView/>
      </View>
    );
  }
}
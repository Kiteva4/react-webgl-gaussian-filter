import * as React from 'react';
import { View } from 'react-native'
import { styles } from './Styles'

import ImageHolderView from './ImageHolderView'
import UserInputView from './UserInputView'

export default class App extends React.Component {

  onUpdateHandler = (filterValue) => {
    console.log('update!' + filterValue);
    this.onRenderHandler(filterValue);
  }

  onRenderHandler = (filterValue) => { console.log('render_1!' + filterValue); }

  render() {
    return (
      <View style={styles.main_screen_container}>
        <UserInputView onUpdate={this.onUpdateHandler} />
        <ImageHolderView /*onRender = {this.onRenderHandler} *//>
      </View>
    );
  }
}
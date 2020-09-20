import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { styles } from "../../Styles";


export default class LoadImageButton extends React.Component {

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    document.getElementById("fileSelector").click()
                }}
            >
                <input type="file" id="fileSelector" onChange={this.props.onFileChange} hidden={true} />
                <Text>Загрузить изображение</Text>
            </TouchableOpacity>
        )
    }
}
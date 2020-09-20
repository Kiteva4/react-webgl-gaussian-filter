import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { styles } from "../../Styles";

export default class SaveImageButton extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    var download = document.createElement('saver');
                    download.href = document.getElementById("webgl").toDataURL('image/png');
                    download.download = 'result.png';
                    download.click();
                }}
            >
                <Text>Сохранить изображение</Text>
            </TouchableOpacity>
        )
    }
}
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { styles } from "../../Styles";

export default class SaveImageButton extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    var download = document.createElement('a');
                    download.href = document.getElementById("webgl").toDataURL('image/png', 1);
                    download.download = 'gaussian_image.png';
                    download.click();
                }}
            >
                <Text>Сохранить изображение</Text>
            </TouchableOpacity>
        )
    }
}
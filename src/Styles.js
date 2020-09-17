import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    main_screen_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "stretch",
        flex: 1,
        alignContent: 'center',
        position: "absolute", 
        top: 50, 
        bottom: 50, 
        left: 10, 
        right: 10,
        backgroundColor: 'white',
    },
    user_input_view: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'grey',
    },
    image_holder_view: {
        flex: 5,
        borderWidth: 1,
        borderColor: 'grey',
    }
})
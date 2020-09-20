import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    main_screen_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "stretch",
        flex: 1,
        alignContent: 'center',
        position: "absolute", 
        top: 10, 
        bottom: 10, 
        left: 20, 
        right: 20,
        minHeight: 550,
        minWidth: 800,

    },
    user_input_view: {
        flex: 1,
        flexDirection: 'column',
        borderWidth: 4,
        borderColor: 'grey',
        justifyContent: 'flex-start',
        padding: 15,
        margin: 20,
    },
    image_holder_view: {
        flex: 3,
        flexDirection: 'column',
        borderWidth: 4,
        borderColor: 'grey',
        justifyContent: 'center',
        padding: 5,
        margin: 20,
    },
    text: {
        textAlign: 'center',
        fontSize: 28,
        paddingBottom: 15,
    },
    button: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderWidth: 2,
        borderColor: 'black',
        margin: 10
    },
})
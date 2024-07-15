import React from 'react'
import { Pressable } from 'react-native'
import { View , StyleSheet, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native";


const SignInButton = (props) => {

    const navigation = useNavigation();
const {destination, onText, onValidation} = props;

const handleNavigation =  () => {
    if (destination === 'goBack'){
        navigation.goBack();
    }
    else {
        navigation.navigate(destination);
    }
}

    return <Pressable style = {styles.ButtonViewContainer} onPress={handleNavigation}>
        <View >
            <Text style = {styles.ButtonText}>
               {onText}
            </Text>
        </View>
    </Pressable>

}

export default SignInButton

const styles = StyleSheet.create (
    {
        ButtonViewContainer : {
            alignItems:'flex-end',
            marginTop:10,
        },
        ButtonText : {
            color : '#34495E',
            fontSize:25,
        }
    }
)
    
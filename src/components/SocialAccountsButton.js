
import React from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { FontAwesome} from "@expo/vector-icons";


const SocialAccountButton = () => {
    return (
        <View style = {styles.SocialAccountsViewContainer}>
            <Pressable>
                <View style = {styles.facebookContainer} >
                    <FontAwesome name="facebook" color='#1F618D' size = {20} />
                    <Text style = {{marginLeft:10}}>
                        facebook
                    </Text>
                </View>
            </Pressable>
            <Pressable>
                <View >
                <View style= {styles.facebookContainer}>
                    <FontAwesome name="twitter" color='#1F618D' size = {20} />
                    <Text style = {{marginLeft:10}}>
                        twitter
                    </Text>
                </View>
                </View>
            </Pressable>
        </View>
    )
}

export default SocialAccountButton

const styles = StyleSheet.create (
    {
        SocialAccountsViewContainer : {
            justifyContent:'center',
            flexDirection:'row',
        },
        facebookContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
            paddingHorizontal: 40,
            borderWidth: 1,
            borderRadius: 30,
            marginHorizontal: 10,

          },
          
    }
)
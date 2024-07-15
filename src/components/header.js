import React from "react";
import { View , Text,StyleSheet} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const HeaderView = ({header,headerIcon}) => {
    return (
        <View style = {styles.headerViewContainer}>
            <Text  style = {styles.headerTextView}>
                {header}
            </Text>
            <FontAwesome name = {headerIcon}  size={25} color={'#FA8072'}/>
               
            
        </View>
    );
}
export default HeaderView;

const styles  = StyleSheet.create ({

    headerTextView : {
        fontSize:20,
        flex:1,
    },
    headerViewContainer : {
        flexDirection:'row',
        marginHorizontal:20,
        marginTop:10,
    },
 

});
import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { FontAwesome} from "@expo/vector-icons";

const SearchBarView = (props) => {

    return (
        <View  style = {styles.SearchBarViewContainer}>
            <FontAwesome name={props.searchIcon} size={20} color="#f96163" />
            <TextInput style = {styles.TextInputContainer}>
                {props.placeholder}
            </TextInput>
        </View>
    )
}


export default SearchBarView
const styles = StyleSheet.create(
    {
        SearchBarViewContainer: {
            backgroundColor: "#fff",
            flexDirection: "row",
            paddingVertical: 24,
            borderRadius: 8,
            paddingHorizontal: 22,
            marginVertical: 16,
            marginHorizontal:10,

            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 9,
            borderRadius:40
        },
        TextInputContainer: {
            paddingLeft: 15, fontSize: 16, color: "#808080"
        }

    }
)
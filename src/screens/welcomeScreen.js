import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.viewContainer}>
      <Image source={require("../../assets/images/welcome1.png")} />
      <Text style={styles.textStyle}>Good Recipes Here.....</Text>
      <Text style={styles.textStyle2}>Cook Like a Chef</Text>
      <Pressable
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("SignInScreen")}
      >
        <Text style={styles.textStyle3}> Lets, get Started.... </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({

    viewContainer: {
        flex: 1,
        alignItems: 'center',
    },
    textStyle: {
        color: '#808080',
        fontWeight: 'bold',
        fontSize: 23,
    },
    textStyle2: {
        marginTop: 2,
        fontWeight: 'bold',
        fontSize: 45,
        color: '#808080',
    },
    buttonContainer: {
        width: '80%',
        backgroundColor: '#C83D1E',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginTop: 35,
    },
    textStyle3: {
        color: '#C0C0C0',
        fontWeight: 'bold',
        fontSize: 18,
    }

});
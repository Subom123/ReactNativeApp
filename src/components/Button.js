// WishlistButton.js

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const WishlistButton = (props) => {
  const navigation = useNavigation();
  const { buttonText, destination } = props;

  const handlePress = () => {
    if (destination === "goBack") {
      navigation.goBack();
    } else {
      navigation.navigate(destination);
      console.log(`Navigating to ${destination}`);
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.PressableViewContainer}>
      <View style={[styles.buttonContainer, { backgroundColor: props.ButtonColor }]}>
        <Text style={styles.ButtonText}>{buttonText}</Text>
      </View>
    </Pressable>
  );
};

export default WishlistButton;

const styles = StyleSheet.create({
  ButtonText: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 14,
    fontWeight: '600',
    color: 'white', 
  },
  PressableViewContainer: {
    marginHorizontal: 25,
  },
  buttonContainer: {
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, 
  },
});

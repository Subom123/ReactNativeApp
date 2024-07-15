import React from "react";
import { Button, StyleSheet, View, Modal, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TextInputHandler({ onCancel, setText }) {
  return (
    <View style={styles.screenContainer}>
      <Modal
        animationType="fade"
        transparent={true}
        style={styles.modalContainer}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text style={styles.errorText}>{setText}</Text>
            </View>
            <Button style={styles.button} title="Cancel" onPress={onCancel} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    flex: 1, // Adjust the flex value to control the height of the modal
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#D1F2EB",
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  button: {
    marginTop: 10,
  },
  errorText: {
    marginHorizontal: 10,
    fontSize: 12,
    marginVertical: 22,
  },
});

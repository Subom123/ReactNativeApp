import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { TextInput } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TextInputHandler from "./ErrorModal";

const SignInComponent = () => {
  const navigation = useNavigation();
  const [changedText, onPressedChangeText] = useState("");
  const [validate, setValidate] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function enteredText(changeText) {
    onPressedChangeText(changeText);
  }

  function enteredPassword(changePassword) {
    setPassword(changePassword);
  }

  const Login = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const isEmailValid = emailRegex.test(changedText);
    const isPasswordValid = passwordRegex.test(password);

    if (isEmailValid && isPasswordValid) {
      navigation.navigate("Main", {
        screen: "RecipeScreen",
        params: { setToast: validate },
      });
    } else {
      let errorMessage =
        "Please provide valid information for the following fields:\n";

      if (!isEmailValid) {
        errorMessage += "- Email\n";
      }
      if (!isPasswordValid) {
        errorMessage +=
          "- Password (minimum 8 characters with letters and numbers)\n";
      }

      setError(errorMessage.trim());
      setValidate(true);
    }
  };

  const closeModal = () => {
    setValidate(false);
  };

  return (
    <View>
      <View style={styles.TextFieldViewContainer}>
        <View style={styles.EmailTextField}>
          <Text style={styles.TextStyling}>Your Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email Here ....."
            onChangeText={enteredText}
            value={changedText}
          />
        </View>
        <View style={styles.PasswordTextField}>
          <Text style={styles.TextStyling}>Your Password</Text>
          <View style={styles.PasswordForgotField}>
            <TextInput
              style={styles.PasswordText}
              placeholder="Enter your Password Here ....."
              onChangeText={enteredPassword}
              value={password}
            />
            <Text style={styles.input}>Forgot?</Text>
          </View>
        </View>
      </View>
      <View style={styles.LogInButton}>
        <Pressable onPress={Login} style={styles.PressableViewContainer}>
          <View style={[styles.buttonContainer, { backgroundColor: "black" }]}>
            <Text style={styles.ButtonText}>Log In</Text>
          </View>
        </Pressable>
      </View>
      {validate ? (
        <TextInputHandler onCancel={closeModal} setText={error} />
      ) : null}
    </View>
  );
};

export default SignInComponent;

const styles = StyleSheet.create({
  TextFieldViewContainer: {
    marginTop: 60,
  },
  EmailTextField: {
    borderBottomColor: "black",
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  input: {
    marginVertical: 15,
    fontSize: 15,
  },
  PasswordTextField: {
    borderBottomColor: "black",
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  PasswordForgotField: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  TextStyling: {
    fontSize: 16,
  },
  PasswordText: {
    fontSize: 15,
    flex: 1,
  },
  LogInButton: {
    marginVertical: 30,
  },
  ButtonText: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  PressableViewContainer: {
    marginHorizontal: 25,
  },
  buttonContainer: {
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});

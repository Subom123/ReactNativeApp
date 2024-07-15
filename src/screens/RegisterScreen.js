import React from "react";
import { Pressable, SafeAreaView } from "react-native";
import { View, StyleSheet, Text } from "react-native";
import SignInButton from "../components/SignInButton";
import { LinearGradient } from "expo-linear-gradient";
import SocialAccountButton from "../components/SocialAccountsButton";
import RegisterComponent from "../components/RegisterComponents";

const RegisterScreen = () => {
  return (
    <LinearGradient colors={["#A2D9CE", "#D0D3D4"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={styles.SignInViewContainer}>
          <SignInButton onText={"Log In"} destination="goBack" />
          <Text style={styles.styledText}>SignUp</Text>
          <RegisterComponent />
          <View style={styles.LogInButton}></View>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Text>or sign up with social account</Text>
          </View>
          <SocialAccountButton />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  SignInViewContainer: {
    marginHorizontal: 25,
  },
  styledText: {
    fontSize: 20,
    marginTop: 30,
    fontFamily: "Baskerville",
  },
  LogInButton: {
    marginVertical: 30,
  },
});

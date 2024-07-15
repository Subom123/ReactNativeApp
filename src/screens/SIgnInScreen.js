

import React from "react";
import { Pressable, SafeAreaView } from "react-native";
import { View ,StyleSheet ,Text} from "react-native";
import SignInButton from "../components/SignInButton";
import {LinearGradient} from 'expo-linear-gradient';
import SignInComponent from "../components/SignInComponent";


import SocialAccountButton from "../components/SocialAccountsButton";

const SignInScreen = () => {

 
    


    return (
    <LinearGradient
    colors={["#A2D9CE", "#D0D3D4"]}
    style={{ flex: 1 }}
  >
    <SafeAreaView>
        <View style = {styles.SignInViewContainer}>
        <SignInButton onText = {'Sign Up'} destination = 'RegisterScreen'/>
        <Text style={styles.styledText} >
            Log In
        </Text>
        <SignInComponent/>
        <View style = {{alignItems:'center',marginTop:45,marginBottom:20}}>
        <Text >
            or sign up with social account
        </Text>
        </View>
        <SocialAccountButton/>
        </View>
        </SafeAreaView>
       </LinearGradient> 
    );
}

export default SignInScreen

const styles = StyleSheet.create (
    {
        SignInViewContainer : {
            marginHorizontal : 25,
            
        },
        styledText : {
            fontSize:20,
            marginTop:30,
            fontFamily : 'Baskerville'
        },
        LogInButton : {
            marginVertical:30
        }

    }
)
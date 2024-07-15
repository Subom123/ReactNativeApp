import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
} from "react-native";
import HeaderView from "../components/header";
import SearchBarView from "../components/searchBar";
import { LinearGradient } from "expo-linear-gradient";
import CategoryFilter from "../components/CategoryFilter";
import RecipeList from "../components/RecipeList";
import Toast from "react-native-toast-message";

export default function RecipeScreen({ setToast }) {
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "This is where you get the best Recipes",
    });
  };

  useEffect(() => {
    if (!setToast) {
      showToast();
    }
  }, [setToast]);

  return (
    <LinearGradient colors={["#85C1E9", "#D0D3D4"]} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <HeaderView header={"Hi Subom"} headerIcon={"bell-o"} />
          <SearchBarView
            placeholder={"What do You wanna eat"}
            searchIcon={"search"}
          />
          <Button title="Show toast" onPress={showToast} />

          <Text style={styles.TextView}>Categories</Text>
          <CategoryFilter />
          <Text style={styles.TextView}>Recipes</Text>
          <RecipeList style={styles.TextView} />
          {/* <WishlistButton
            buttonText="WishList"
            destination={"DatabaseScreen"}
            ButtonColor="#76D7C4"
            style={{ marginVertical: 20 }}
          /> */}
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  TextView: {
    fontSize: 28,
    marginHorizontal: 16,
    marginTop: 22,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});

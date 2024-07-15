import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import db from "../database/database";
import { useState, useEffect } from "react";

const RecipeDetails = ({ navigation, route }) => {
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the recipe is already a favorite when the component mounts
    checkFavoriteStatus();
  }, []);

  const checkFavoriteStatus = () => {
    // Query the database to check if the recipe is a favorite
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Food WHERE recipeId = ?",
        [item.id],
        (_, { rows }) => {
          setIsFavorite(rows.length > 0);
        }
      );
    });
  };

  const handleFavoritePress = () => {
    // Toggle the favorite status in the database when the heart button is pressed
    if (isFavorite) {
      // If it's already a favorite, remove it from the database
      db.transaction((tx) => {
        tx.executeSql("DELETE FROM Food WHERE recipeId = ?", [item.id]);
      });
    } else {
      // If it's not a favorite, add it to the database
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Food (recipeId, name, rating, time, difficulty, calories, color, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            item.id,
            item.name,
            item.rating,
            item.time,
            item.difficulty,
            item.calories,
            item.color,
            item.description,
            item.image,
          ],
          (_, { error }) => {
            if (error) {
              console.error("Error inserting into Favorites:", error);
            }
          }
        );
      });
    }

    // Toggle the isFavorite state
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      <View
        style={{
          backgroundColor: item.color,
          flex: 1,
        }}
      >
        <SafeAreaView>
          <View style={styles.backContainer}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome name={"arrow-left"} size={28} color="#ECF0F1" />
            </Pressable>
            <Pressable style={styles.heartButton} onPress={handleFavoritePress}>
              <FontAwesome
                name={isFavorite ? "heart" : "heart-o"}
                size={28}
                color="#ECF0F1"
              />
            </Pressable>
          </View>
        </SafeAreaView>

        <View style={styles.mainViewContainer}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.imageStyling} />
          </View>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.descriptionContainer}>{item.description}</Text>
          <View>
            <View style={styles.recipeIntro}>
              <View style={styles.recipeTimings}>
                <Text style={{ fontSize: 45 }}>⏰</Text>
                <Text style={{ marginTop: 10 }}>{item.time}</Text>
              </View>
              <View style={styles.recipeTimings}>
                <Text style={{ fontSize: 45 }}>😥</Text>
                <Text style={{ marginTop: 10 }}>{item.difficulty}</Text>
              </View>
              <View style={styles.recipeTimings}>
                <Text style={{ fontSize: 45 }}>🍟</Text>
                <Text style={{ marginTop: 10 }}>{item.calories}</Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              alignSelf: "flex-start",
              marginVertical: 12,
              marginHorizontal: 20,
              fontSize: 30,
            }}
          >
            Ingredients:
          </Text>
          <View style={{ alignSelf: "flex-start", marginHorizontal: 22 }}>
            {item.ingredients.map((category, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View style={{ marginRight: 10 }}>
                    <Text>{index + 1})</Text>
                  </View>
                  <Text>{category}</Text>
                </View>
              );
            })}
          </View>
          <View style={{ alignSelf: "flex-start", marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                marginBottom: 6,
                marginHorizontal: 20,
              }}
            >
              Steps:
            </Text>

            {item.steps.map((step, index) => {
              return (
                <Text
                  key={index}
                  style={{ fontSize: 14, marginLeft: 24, marginVertical: 6 }}
                >{`${index + 1} ) ${step}`}</Text>
              );
            })}
          </View>
          <View
            style={{
              height: 40,
            }}
          ></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeDetails;

const styles = StyleSheet.create({
  initialViewContainer: {
    backgroundColor: "#ECF0F1",
    flex: 1,
  },
  mainViewContainer: {
    marginTop: 180,
    backgroundColor: "#D0D3D4",
    flex: 1,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    alignItems: "center",
  },
  imageContainer: {
    height: 300,
    width: 300,
    position: "absolute",
    top: -150,
  },
  imageStyling: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  backContainer: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginTop: 14,
  },
  backButton: {
    flex: 1,
  },
  foodName: {
    fontSize: 30,
    marginTop: 150,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  descriptionContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    fontSize: 20,
    color: "#2C3E50",
  },
  recipeIntro: {
    marginTop: 40,
    flexDirection: "row",
  },
  recipeTimings: {
    padding: 10,
    alignItems: "center",
    marginHorizontal: 30,
    borderRadius: 20,
  },
});

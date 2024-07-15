import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import WishlistButton from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import db from "../database/database";

const DatabaseScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Food",
        [],
        (_, { rows }) => {
          setData(rows._array);
        },
        (error) => {
          console.error("Error executing SQL:", error);
        }
      );
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleDelete = (recipeId) => {
    // Delete the item from the Food table in the database
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM Food WHERE recipeId = ?",
          [recipeId],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              // If the deletion was successful, fetch the updated data
              fetchData();
            } else {
              console.warn(
                "No rows affected. Recipe not found or already deleted."
              );
            }
          },
          (_, error) => {
            console.error("Error deleting from Food:", error);
          }
        );
      },
      (error) => {
        console.error("Transaction error:", error);
      },
      () => {
        console.log("Transaction completed successfully.");
      }
    );
  };

  return (
    <LinearGradient colors={["#85C1E9", "#D0D3D4"]} style={{ flex: 1 }}>
      <SafeAreaView />
      <View style={styles.container}>
        <Text style={styles.header}>Database Contents</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) =>
            item && item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.aboutContainer}>
                <View style={styles.TextContainer}>
                  <Text>{`Name: ${item.name}`}</Text>
                  <Text>{`Rating: ${item.rating}`}</Text>
                  <Text>{`Calories: ${item.calories}`}</Text>
                  <Text>{`Time: ${item.time}`}</Text>
                  <View style={styles.trashContainer}>
                    <Pressable onPress={() => handleDelete(item.recipeId)}>
                      <FontAwesome
                        name="trash"
                        size={30}
                        color="#F7DC6F"
                        style={styles.iconStyling}
                      />
                    </Pressable>
                  </View>
                </View>
                <View style={styles.ImageViewContainer}>
                  <Image source={item.image} style={styles.ImageDisplay} />
                </View>
              </View>
            </View>
          )}
        />
        <WishlistButton
          buttonText="Go Back"
          destination="goBack"
          ButtonColor="#76D7C4"
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 12,
  },
  ImageDisplay: {
    width: 150,
    height: 150,
    resizeMode: "center",
  },
  ImageViewContainer: {
    alignItems: "center",
    marginLeft: 35,
  },
  TextContainer: {
    flexDirection: "column",
    marginHorizontal: 20,
    marginTop: 20,
  },
  trashContainer: {
    flex: 1,
    marginTop: 10,
  },
  aboutContainer: {
    flexDirection: "row",
  },
  iconStyling: {
    marginLeft: 9,
  },
});

export default DatabaseScreen;

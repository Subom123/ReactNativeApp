

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native";
import { categories } from "../../Constant";


const CategoryFilter = () => {
    return (
        <View>
            <ScrollView style={styles.ScrollViewContainer} horizontal showsHorizontalScrollIndicator={false} >
                {categories.map((category, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                ...styles.CategoryViewContainer,
                                backgroundColor: index === 0 ? '#1ABC9C' : '#AED6F1',
                            }}>
                            <Text>
                                {category.category}
                            </Text>
                        </View>
                    )
                }
                )}
            </ScrollView>
        </View>
    );

}

export default CategoryFilter

const styles = StyleSheet.create(
    {
        ScrollViewContainer: {
            margin: 15,
        },
        CategoryViewContainer: {
            marginRight: 36,
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 7,
            marginVertical: 4,
        },
    }
)
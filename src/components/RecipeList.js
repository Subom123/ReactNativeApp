
import React from "react";
import { View ,StyleSheet,Text,Image, Pressable} from "react-native";
import { FlatList } from "react-native";
import { recipeList } from "../../Constant";
import { FontAwesome} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const RecipeList = () => {
    const navigation = useNavigation();
    return (
        <FlatList
        data={recipeList}
        style = {styles.FlatListContainer}
        renderItem={({item}) => (
            <Pressable style = {styles.ViewContainer} onPress={() => navigation.navigate("RecipeDetails",{item:item})}>
                <Image source = {item.image} 
                style ={styles.ImageDisplay}
              />
                <Text>
                    {item.name}
                </Text>
                <View style = {styles.timeViewContainer}>
                    <Text>{item.time}</Text>
                    <Text>  |  </Text>
                    <View  style = {styles.ratingViewContainer}>
                        <Text>
                            {item.rating}
                        </Text>
                        <FontAwesome
									name="star"
									size={16}
									color='#F7DC6F'
                                    style = {styles.iconStyling}
								/>
                    </View>
                </View>
            </Pressable>
        )
        }
        numColumns={2}
        showsVerticalScrollIndicator = {false}
        columnWrapperStyle={{
            justifyContent: "space-between",
        }}
        />

    )
}

export default RecipeList

const styles = StyleSheet.create (
    {
        FlatListContainer: {
            margin:16
        },

        ViewContainer : {
            backgroundColor: '#AED6F1',
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 7,
            borderRadius: 16,
            marginVertical: 16,
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: 26,
        },
        ImageDisplay :{
            width:150,
            height:150,
            resizeMode:'center'
        },
        timeViewContainer : {
            marginTop : 4,
            flexDirection:'row',
            alignItems:'center'

        },
        ratingViewContainer : {
            flexDirection : 'row',
        },
        iconStyling : {
            marginLeft : 9,
        }

    }
)
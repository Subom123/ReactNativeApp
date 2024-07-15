import React, { useEffect, useRef, useState } from "react";

import { Animated, Button, Text, View } from "react-native";

const Message = (props) => {
  // Create a ref to store the animated opacity value
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log("Message component mounted");
    const sequence = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    sequence.start(() => {
      props.onHide();
    });

    return () => {
      // Clean up the animation when the component unmounts
      sequence.stop();
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        margin: 10,
        marginBottom: 5,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 4,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
      }}
    >
      <Text>{props.message}</Text>
    </Animated.View>
  );
};

export default Message;

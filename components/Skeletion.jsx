import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const Skeleton = ({ width = 100, height = 100, borderRadius = 4 }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnim]);

  const shimmerInterpolation = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#eeeeee", "#dddddd"],
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }]}>
      <Animated.View
        style={[
          styles.skeleton,
          {
            width: "100%",
            height: "100%",
            backgroundColor: shimmerInterpolation,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginVertical: 10,
  },
  skeleton: {
    flex: 1,
  },
});

export default Skeleton;

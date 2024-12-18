import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import COLORS from "../../components/consts/colors";
import url from "../../components/route/api";

import building from "../../assets/loading/giphy.gif";

// IMPORTING CUSTOM COMPONENTS
import ProjectCard from "../../components/ProjectCard";
import Skeleton from "../../components/Skeleton";
import Contact from "../../components/contact";

const { width } = Dimensions.get("screen");

const CompletedProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `${url}/api/projects?populate=*&filters[$and][0][ProjectType][$eq]=upComing`
      );
      const data = await res.json();
      setProjects(data.data);
      setLoading(false);
    };
    getData();
  }, [loading]);

  return (
    <SafeAreaView style={{ backgroundColor: "#203057", flex: 1 }}>
      <StatusBar
        translucent={false}
        backgroundColor={"#fff"}
        barStyle="dark-content"
      />

      {loading ? (
        <View style={{ marginHorizontal: 20 }}>
          <Skeleton width={380} height={180} />
        </View>
      ) : projects.length !== 0 ? (
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingVertical: 10 }}
          data={projects}
          renderItem={({ item }) => <ProjectCard project={item} />}
        />
      ) : (
        <View style={styles.noProjectsContainer}>
          {/* GIF */}
          <Image source={building} style={styles.gif} />
          {/* Text */}
          <Text style={styles.noProjectsText}>No UpComing Projects Found</Text>
        </View>
      )}
      <View style={{ marginBottom: -180 }}>
        <Contact message={`Hello I want to buy a flat`} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noProjectsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  gif: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  noProjectsText: {
    fontSize: 18,
    color: COLORS.golden,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CompletedProject;

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
import Component from "../../components/imagination/Component";

const { width } = Dimensions.get("screen");

const CompletedProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `${url}/api/projects?populate=*&filters[$and][0][ProjectType][$eq]=onGoing`
      );
      const data = await res.json();
      setProjects(data.data);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={"#fff"}
        barStyle="dark-content"
      />

      {loading ? (
        <View style={{ marginHorizontal: 20 }}>
          <Skeleton width={380} height={180} />
        </View>
      ) : projects.length !== 0 ? (
        <FlatList
          data={projects}
          renderItem={({ item }) => <ProjectCard project={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          // Add Component as a header
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Component />
            </View>
          }
        />
      ) : (
        <View style={styles.noProjectsContainer}>
          <Image source={building} style={styles.gif} />
          <Text style={styles.noProjectsText}>No Completed Projects Found</Text>
        </View>
      )}
      <View style={styles.contactContainer}>
        <Contact message={`Hello I want to buy a flat`} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#203057",
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerContainer: {
    marginTop: 10,
  },
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
  contactContainer: {
    padding: 20,
  },
});

export default CompletedProject;

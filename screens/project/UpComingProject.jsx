import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, FlatList, Dimensions, Text } from "react-native";
import COLORS from "../../components/consts/colors";
import url from "../../components/route/api";

// IMPORTING CUSTOM COMPONENTS
import ProjectCard from "../../components/ProjectCard";

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
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <StatusBar
        translucent={false}
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />

      {projects.length !== 0 ? (
        <FlatList
          snapToInterval={width - 20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingVertical: 10 }}
          data={projects}
          renderItem={({ item }) => <ProjectCard project={item} />}
        />
      ) : (
        <Text> There is No upComing Project </Text>
      )}
    </SafeAreaView>
  );
};

export default CompletedProject;
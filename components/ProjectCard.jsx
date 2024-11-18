import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

// IMPORTING STYLES
import { style } from "../styles/project";

const ProjectCard = ({ project }) => {
  const navigation = useNavigation();

  const img =
    project.attributes.projectImage.data[0].attributes.formats.medium.url;

  const imgData = project.attributes.projectImage.data;
  const name = project.attributes.projectName;

  const data = {
    name: project.attributes.projectName,
    address: project.attributes.address,
    imgs: imgData,
  };

  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
      onPress={() => navigation.navigate("Flats", data)}
    >
      <View style={[style.card, { marginBottom: 20 }]}>
        <Image
          source={{
            uri: `${img}`,
          }}
          style={style.cardImage}
        />
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={[
                { fontSize: 18, fontWeight: "bold", color: "#f0c35f" },
                { textTransform: "capitalize" },
              ]}
            >
              {project.attributes.projectName}
            </Text>
          </View>
          <Text style={{ color: "#A9A9A9", fontSize: 15, marginTop: 5 }}>
            {project.attributes.address}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProjectCard;

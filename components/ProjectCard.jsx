import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../components/consts/colors";

// IMPORTING STYLES
import { style } from "../styles/project";

const ProjectCard = ({ project }) => {
  const navigation = useNavigation();

  const img =
    project.attributes.projectImage.data[0].attributes.formats.medium.url;

  const name = project.attributes.projectName;

  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
      onPress={() => navigation.navigate("Flats", name)}
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
                { fontSize: 16, fontWeight: "bold" },
                { textTransform: "capitalize" },
              ]}
            >
              {project.attributes.projectName}
            </Text>
          </View>
          <Text style={{ color: COLORS.grey, fontSize: 14, marginTop: 5 }}>
            {project.attributes.address}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProjectCard;
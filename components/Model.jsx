import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";

const Model = ({ userName, userId, flatId, flatName, addLead }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const res = await addLead(
        userId,
        flatId,
        name,
        flatName,
        number,
        userName
      );

      if (res.ok) {
        Alert.alert("Your send successfully");
      } else {
        Alert.alert("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    }

    setName("");
    setName(null);

    handleCloseModal();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.btnContainer} onPress={handleOpenModal}>
        <Text style={styles.btnText}>Add Client Details</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your number"
              value={number}
              onChangeText={setNumber}
              keyboardType="numeric"
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.btnContainer, { width: 120 }]}
                onPress={handleSubmit}
              >
                <Text style={[styles.buttonText]}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnContainer, { width: 120 }]}
                onPress={handleCloseModal}
              >
                <Text style={[styles.buttonText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Model;

// STYLING
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    margin: 5,
    flex: 1,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
  },

  btnContainer: {
    backgroundColor: "#111111",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 12,
    marginBottom: 10,
  },

  btnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
});

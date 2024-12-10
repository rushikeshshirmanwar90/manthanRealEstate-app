import { StyleSheet } from "react-native";
import COLORS from "../components/consts/colors";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export const style = StyleSheet.create({
  filterBtnBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  filterBtn: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.grey,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  activeFilterBtn: {
    borderColor: COLORS.dark,
    backgroundColor: COLORS.light,
  },
  filterBtnText: {
    color: COLORS.grey,
  },
  activeFilterBtnText: {
    color: COLORS.dark,
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS.dark,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  optionsCard: {
    height: 210,
    width: width / 2 - 30,
    elevation: 15,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionsCardImage: {
    height: 140,
    borderRadius: 10,
    width: "100%",
  },
  optionListsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryListText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
    color: COLORS.grey,
  },
  activeCategoryListText: {
    color: COLORS.dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 40,
  },

  card: {
    backgroundColor: "#0a2159",
    elevation: 10,
    width: width - 40,
    marginRight: 20,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f0c35f",
  },

  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 15,
  },

  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: COLORS.grey },

  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a2159",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f0c35f",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.golden,
  },
});

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },

  headerImg: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 5,
  },

  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },

  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },

  formLink: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
  },

  formFooter: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },

  /** Input */
  input: {
    marginBottom: 16,
  },

  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },

  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },

  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },

  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },

  btn2: {
    height: 60,
    marginHorizontal: 20,
    backgroundColor: "#02174a",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C9D3DB",
  },

  passwordInput: {
    flex: 1,
    borderWidth: 0,
  },

  eyeIcon: {
    padding: 10,
  },
});

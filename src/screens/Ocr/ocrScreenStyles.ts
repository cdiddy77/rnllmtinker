import { StyleSheet } from "react-native";
import theme from "../../shared/theme";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    position: "relative",
  },
  welcome: {
    color: "black",
    fontSize: 38,
    fontWeight: "bold",
    maxWidth: "80%",
  },
  banner: {
    position: "absolute",
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    flexDirection: "column",
  },
  camera: {
    flex: 1,
  },
  recognizedBlock: {
    position: "absolute",
    backgroundColor: theme.color.black10,
    borderRadius: theme.radius.xl,
  },
  recognizedText: {
    ...theme.typog.header1,
    color: theme.color.lightText,
    justifyContent: "center",
    textAlign: "center",
  },
  categoriesText: { color: "black", fontSize: 36 },
  permissionsContainer: {
    marginTop: 30,
  },
  permissionText: {
    color: "black",
    fontSize: 17,
  },
  hyperlink: {
    color: "#007aff",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  translateButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    ...theme.element.button_contained,
  },
  summaryButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    ...theme.element.button_contained,
  },
  buttonText: {
    ...theme.typog.button2_contained,
  },
});

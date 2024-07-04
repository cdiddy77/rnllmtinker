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
  container: { flex: 1, padding: theme.space.md },
  header: {
    ...theme.layout.row_center,
    justifyContent: "flex-start",
    marginVertical: theme.space.md,
    height: 30,
  },
  headerText: {
    textAlign: "center",
    ...theme.typog.header2,
    flex: 1,
    color: theme.color.darkText,
  },
  subtitleText: {
    ...theme.typog.header3,
    color: theme.color.darkText,
    // textAlign: "center",
  },
  scroller: {},
  noModelsContainer: {
    marginTop: theme.space.lg,
    flex: 1,
  },
  noModelsText: {
    textAlign: "center",
    ...theme.typog.body1,
    flex: 1,
    color: theme.color.darkText,
    fontStyle: "italic",
  },
});

export const modelDescStyles = StyleSheet.create({
  root: {
    ...theme.layout.column_center,
    justifyContent: "flex-start",
    padding: theme.space.md,
  },
  rootPressed: {
    backgroundColor: theme.color.black25,
  },
  rootSelected: {
    backgroundColor: theme.color.black25,
  },
  titleContainer: {
    alignSelf: "stretch",
    ...theme.layout.row_center,
    justifyContent: "space-between",
  },
  titleText: {
    ...theme.typog.body2,
    color: theme.color.darkText,
    flexShrink: 1,
  },
  timeText: { ...theme.typog.body2, color: theme.color.darkText },
  subtitleContainer: {
    alignSelf: "stretch",
    ...theme.layout.row_center,
    justifyContent: "space-between",
  },
  durationText: { ...theme.typog.body3, color: theme.color.darkText },
  sizeText: { ...theme.typog.body3, color: theme.color.darkText },
});

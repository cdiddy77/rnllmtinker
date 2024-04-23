import { StyleSheet } from "react-native";
import theme from "../../shared/theme";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.color.white100,
  },
  header: {
    ...theme.layout.row_center,
    justifyContent: "flex-start",
    marginVertical: theme.space.md,
  },
  leftArrow: { alignSelf: "flex-start" },
  headerText: {
    textAlign: "center",
    ...theme.typog.header2,
    flex: 1,
    color: theme.color.darkText,
  },
  sections: {
    flex: 1,
  },
});

export const editorStyles = StyleSheet.create({
  root: {
    flexDirection: "row",
    height: theme.size.sm,
    alignItems: "center",
  },
  descriptionRoot: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.color.grey25,
    padding: theme.space.sm,
    flexWrap: "wrap",
  },
  description: {
    ...theme.typog.body2,
    color: theme.color.darkText,
    marginHorizontal: theme.space.md,
  },
  label: {
    ...theme.typog.body2,
    color: theme.color.darkText,
    width: theme.size.lg,
    marginLeft: theme.space.md,
  },
  switchLabel: {
    ...theme.typog.body2,
    flex: 1,
    marginLeft: theme.space.md,
  },
  switch: { marginHorizontal: theme.space.md },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginHorizontal: theme.space.md,
  },
  slider: {
    flex: 1,
  },
  sliderValue: {
    ...theme.typog.body2,
    marginLeft: theme.space.md,
    color: theme.color.darkText,
  },
  input: {
    ...theme.typog.body2,
    color: theme.color.darkText,
    backgroundColor: theme.color.grey50,
    flex: 1,
    marginHorizontal: theme.space.md,
    height: 32,
    paddingHorizontal: theme.space.sm,
    paddingBottom: 4,
  },
  selectLabel: {
    flex: 1,
    ...theme.typog.body2,
    color: theme.color.darkText,
    marginLeft: theme.space.md,
  },
  selectButton: {
    flex: 1,
    height: 32,
    backgroundColor: theme.color.cardGrey,
    marginHorizontal: theme.space.md,
  },
  selectButtonText: { ...theme.typog.body2, color: theme.color.darkText },
  selectRow: {
    flex: 1,
    height: 32,
    backgroundColor: theme.color.cardGrey,
    marginHorizontal: theme.space.md,
  },
  selectRowText: { ...theme.typog.body2 },
  message: { color: theme.color.errorRed, ...theme.typog.body2 },
  settingButton: {
    ...theme.element.button_contained_sm,
    marginHorizontal: theme.space.md,
    marginVertical: theme.space.md,
  },
  settingButtonText: {
    ...theme.typog.button1,
    color: theme.color.lightTextStrong,
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export const streamingStyles = StyleSheet.create({
  root: {},
  section: {
    backgroundColor: theme.color.cardGrey,
    padding: theme.space.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionText: {
    ...theme.typog.header3,
    color: theme.color.darkText,
  },
  comingSoonContainer: {
    backgroundColor: theme.color.primary,
    paddingVertical: theme.space.sm,
    paddingHorizontal: theme.space.md,
    borderRadius: theme.radius.md,
  },
  comingSoonText: {
    ...theme.typog.body3,
    color: theme.color.lightText,
  },

  sectionSeparator: { height: theme.space.md },
});

export const accountStyles = StyleSheet.create({
  root: {
    ...theme.layout.column_center,
    justifyContent: "space-between",
    marginTop: theme.space.lg,
    flex: 1,
  },
  section: {
    padding: theme.space.lg,
    alignSelf: "stretch",
  },
  statusText: {
    ...theme.typog.header2,
    marginBottom: theme.space.xl,
    textAlign: "center",
    color: theme.color.darkText,
  },
  versionText: {
    marginTop: theme.space.xl,
    ...theme.typog.body2,
    textAlign: "center",
    color: theme.color.darkText,
  },
  loginButton: {
    marginVertical: theme.space.xl,
    ...theme.element.button_contained,
  },
  loginButtonText: {
    ...theme.typog.button1,
    color: theme.color.lightTextStrong,
  },
  deleteAccountButton: {
    ...theme.element.button_bare,
  },
  deleteAccountButtonText: {
    ...theme.typog.button2,
    color: theme.color.darkTextWeak,
  },
});

export const cameraStyles = StyleSheet.create({
  selectAvailRoot: {
    ...theme.layout.row_center,
    justifyContent: "flex-start",
    paddingVertical: theme.space.md,
  },
  selectedContainer: {
    ...theme.layout.row_center,
    flex: 1,
    marginLeft: theme.space.md,
    justifyContent: "flex-start",
  },
  cameraNameText: {
    ...theme.typog.body2,
    color: theme.color.darkText,
    marginHorizontal: theme.space.md,
  },
});

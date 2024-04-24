import { TextStyle, ViewStyle } from "react-native";

// handy reference
// { fontWeight: '100' }, // Thin
// { fontWeight: '200' }, // Ultra Light
// { fontWeight: '300' }, // Light
// { fontWeight: '400' }, // Regular
// { fontWeight: '500' }, // Medium
// { fontWeight: '600' }, // Semibold
// { fontWeight: '700' }, // Bold
// { fontWeight: '800' }, // Heavy
// { fontWeight: '900' }, // Black

const LINEHEIGHT_CONST = 1.2;

const standardSpacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 32,
};

const lightColors = {
  primary: "#024006",
  secondary: "#7e68c0",
  tertiary: "#066d99",
  lightTextStrong: "#ffffff",
  lightText: "#eeeeee",
  lightTextWeak: "#cccccc",
  darkTextStrong: "#000000",
  darkText: "#333333",
  darkTextWeak: "#444444",
  cardGreen: "#f1f8e3",
  cardGrey: "#ebebf0",
  white100: "#ffffff",
  white75: "#ffffffbf",
  white50: "#ffffff80",
  white25: "#ffffff40",
  black100: "#000000",
  black75: "rgba(0, 0, 0, 0.75)",
  black50: "rgba(0, 0, 0, 0.50)",
  black25: "rgba(0, 0, 0, 0.25)",
  black10: "rgba(0, 0, 0, 0.1)",
  grey100: "#cccccc",
  grey75: "#ccccccbf",
  grey50: "#cccccc80",
  grey25: "#cccccc40",
  red100: "#ff0000",
  errorRed: "#B81D13",
  warningYellow: "#EFB700",
  successGreen: "#008450",
  statusCritical: "#ff4040",
  statusWarning: "#ffaa15",
  statusOk: "#00c781",
  statusUnknown: "#cccccc",
  statusDisabled: "#cccccc",
  transparent: "transparent",
  sidelineGreen: "#03450a",
};
const lightTheme = {
  layout: {
    row: {
      flexDirection: "row",
    },
    column: {
      flexDirection: "column",
    },
    column_center: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    row_center: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  element: {
    debug_border: { borderColor: "red", borderWidth: 2 },
    green_debug_border: { borderColor: "green", borderWidth: 2 },
    button_contained: {
      backgroundColor: lightColors.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      paddingVertical: standardSpacing.xl,
      paddingHorizontal: standardSpacing.xxl,
    },
    button_outline: {
      backgroundColor: lightColors.transparent,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      borderWidth: 3,
      borderColor: lightColors.primary,
      paddingVertical: standardSpacing.xl,
      paddingHorizontal: standardSpacing.xxl,
    },
    button_bare: {
      backgroundColor: lightColors.transparent,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: standardSpacing.xl,
      paddingHorizontal: standardSpacing.xxl,
    },
    button_contained_sm: {
      backgroundColor: lightColors.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      borderWidth: 3,
      borderColor: lightColors.primary,
      paddingVertical: standardSpacing.md,
      paddingHorizontal: standardSpacing.lg,
    },
    button_outline_sm: {
      backgroundColor: lightColors.transparent,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      borderWidth: 3,
      borderColor: lightColors.primary,
      paddingVertical: standardSpacing.md,
      paddingHorizontal: standardSpacing.lg,
    },
    button_bare_sm: {
      backgroundColor: lightColors.transparent,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: standardSpacing.md,
      paddingHorizontal: standardSpacing.lg,
    },
    divider: {
      backgroundColor: lightColors.darkTextWeak,
      height: 1,
      marginVertical: standardSpacing.md,
    },
  },
  color: lightColors,
  typog: {
    header1: {
      fontSize: 32,
      lineHeight: 32 * LINEHEIGHT_CONST,
    },
    header2: {
      fontSize: 20,
      lineHeight: 20 * LINEHEIGHT_CONST,
    },
    header3: {
      fontSize: 17,
      lineHeight: 17 * LINEHEIGHT_CONST,
    },
    button1: {
      fontSize: 17,
      lineHeight: 17 * LINEHEIGHT_CONST,
    },
    button2: {
      fontSize: 16,
      lineHeight: 16 * LINEHEIGHT_CONST,
    },
    button1_contained: {
      fontSize: 17,
      lineHeight: 17 * LINEHEIGHT_CONST,
      color: lightColors.lightText,
    },
    button1_bare: {
      fontSize: 17,
      lineHeight: 17 * LINEHEIGHT_CONST,
      color: lightColors.darkText,
    },
    button2_contained: {
      fontSize: 16,
      lineHeight: 16 * LINEHEIGHT_CONST,
      color: lightColors.lightText,
    },
    button2_bare: {
      fontSize: 16,
      lineHeight: 16 * LINEHEIGHT_CONST,
      color: lightColors.darkText,
    },
    body1: {
      fontSize: 17,
      lineHeight: 17 * LINEHEIGHT_CONST,
    },
    body2: {
      fontSize: 16,
      lineHeight: 16 * LINEHEIGHT_CONST,
    },
    body3: {
      fontSize: 12,
      lineHeight: 12 * LINEHEIGHT_CONST,
    },
    menu1: {
      fontSize: 18,
      lineHeight: 18 * LINEHEIGHT_CONST,
    },
  },
  zIndex: { modal: 200 },
  fontSize: {
    xxs: 10,
    xs: 12,
    sm: 16,
    md: 17,
    lg: 20,
    xl: 32,
    xxl: 48,
  },
  lineHeight: {
    xxs: 10 * LINEHEIGHT_CONST,
    xs: 12 * LINEHEIGHT_CONST,
    sm: 16 * LINEHEIGHT_CONST,
    md: 17 * LINEHEIGHT_CONST,
    lg: 20 * LINEHEIGHT_CONST,
    xl: 32 * LINEHEIGHT_CONST,
    xxl: 48 * LINEHEIGHT_CONST,
  },

  fontWeight: {
    normal: "400",
    bold: "600",
  },

  size: { sm: 40, md: 80, lg: 120 },
  radius: {
    xxs: 1,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32,
    xxl: 64,
    full: 9999,
  },
  space: standardSpacing,
  animTime: {
    sm: 200,
    md: 400,
    lg: 800,
    xl: 2000,
  },
  thickness: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
  },
};

export default lightTheme as {
  layout: { [K in keyof typeof lightTheme.layout]: ViewStyle };
  element: { [K in keyof typeof lightTheme.element]: ViewStyle };
  color: { [K in keyof typeof lightTheme.color]: string };
  typog: { [K in keyof typeof lightTheme.typog]: TextStyle };
  zIndex: { [K in keyof typeof lightTheme.zIndex]: ViewStyle["zIndex"] };
  fontSize: { [K in keyof typeof lightTheme.fontSize]: number };
  lineHeight: { [K in keyof typeof lightTheme.lineHeight]: number };
  fontWeight: {
    [K in keyof typeof lightTheme.fontWeight]: TextStyle["fontWeight"];
  };
  radius: { [K in keyof typeof lightTheme.radius]: ViewStyle["borderRadius"] };
  space: {
    [K in keyof typeof lightTheme.space]:
      | ViewStyle["paddingHorizontal"]
      | ViewStyle["paddingVertical"];
  };
  thickness: {
    [K in keyof typeof lightTheme.thickness]: ViewStyle["borderWidth"];
  };
  animTime: { [K in keyof typeof lightTheme.animTime]: number };
  size: {
    [K in keyof typeof lightTheme.size]:
      | ViewStyle["height"]
      | ViewStyle["width"];
  };
};

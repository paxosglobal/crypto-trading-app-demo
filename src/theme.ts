import { defaultTheme } from "@coinbase/cds-web/themes/defaultTheme";

const primary = "#C900FF";

const lightPrimaryOverrides = {
  fgPrimary: primary,
  bgPrimary: primary,
  bgPrimaryWash: "rgb(255, 230, 255)",
  bgLinePrimary: primary,
  bgLinePrimarySubtle: "rgb(220, 100, 255)",
  accentSubtleBlue: "rgb(255, 230, 255)",
  accentBoldBlue: primary,
};

const darkPrimaryOverrides = {
  fgPrimary: primary,
  bgPrimary: primary,
  bgPrimaryWash: "rgb(50, 10, 55)",
  bgLinePrimary: primary,
  bgLinePrimarySubtle: "rgb(100, 25, 110)",
  accentSubtleBlue: "rgb(50, 10, 55)",
  accentBoldBlue: primary,
};

export const appTheme = {
  ...defaultTheme,
  lightColor: {
    ...defaultTheme.lightColor,
    ...lightPrimaryOverrides,
  },
  darkColor: {
    ...defaultTheme.darkColor,
    ...darkPrimaryOverrides,
  },
};

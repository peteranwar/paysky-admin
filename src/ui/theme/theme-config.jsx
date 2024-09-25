import { useMemo } from "react";
import PropTypes from 'prop-types';


import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, createTheme } from "@mui/material";
import { typography } from "./typography";
import { paletteGenerator } from "./palette";
import { breakpoints } from "./breakpoints";
import componentsOverride from "./overrides";

function ThemeConfig({ children }) {

  const themeOptions = useMemo(
    () => ({
      palette: paletteGenerator("light"),
      typography,
      breakpoints,
      direction: "ltr",
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}



ThemeConfig.propTypes = {
  children: PropTypes.node,
};

export default ThemeConfig;

"use client"

import { createTheme } from "@mui/material/styles"
import { colors } from "./Colors"
import { shadows } from "./Shadows"
import typography from "./Typography"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primary,
      light: colors.light,
      dark: colors.primary,
    },
    secondary: {
      main: colors.secondary,
      light: colors.light,
      dark: colors.secondary,
    },
  },
  shadows: shadows,
  typography: typography,
})

export default theme

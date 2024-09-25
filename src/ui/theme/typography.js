export const pxToRem = value => {
  return `${value / 16}rem`;
};

function responsiveFontSizes({ xs, md, lg, xl }) {
  return {
    '@media (max-width:600px)': {
      fontSize: pxToRem(xs),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
    '@media (min-width:1400px)': {
      fontSize: pxToRem(xl),
    },
  };
}

const FONT_PRIMARY = 'IBM Plex Sans Arabic';
const FONT_SECONDARY = 'IBM Plex Sans Arabic';

export const typography = {
  fontFamily: document.querySelector('html').lang ==='ar' ? FONT_SECONDARY : FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 100 / 74,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ xs: 32, md: 44, lg: 52, xl: 60 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ xs: 30, md: 38, lg: 44, xl: 54 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ xs: 32, md: 34, lg: 38, xl: 42 }),
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ xs: 24, md: 26, lg: 30, xl: 36 }),
  },
  h5: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ xs: 22, md: 24, lg: 28, xl: 30 }),
  },
  h6: {
    fontWeight: 500,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ xs: 19, md: 22, lg: 24, xl: 26}),
  },
  subtitle1: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ xs: 16, md: 18, lg: 20, xl: 22}),
  },
  subtitle2: {
    fontWeight: 400,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ xs: 15, md: 17, lg: 19, xl: 21}),
  },
  body1: {
    lineHeight: '27px',
    fontSize: pxToRem(14),
    fontWeight: 400,
    ...responsiveFontSizes({ xs: 15, md: 17, lg: 18, xl: 19 }),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ xs: 13, md: 14, lg: 15, xl: 16 }),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    ...responsiveFontSizes({ xs: 12, md: 13, lg: 14, xl: 15 }),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 500,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    // ...responsiveFontSizes({ xs: 19, md: 21, lg: 22, xl: 24 }),
    textTransform: 'capitalize',
  },
};

import colors from './colors';

export const theme = {
  breakpoints: ['48em', '64em', '70em', '90em'],
  space: [0, 4, 8, 10, 15, 20, 25, 30, 40, 56],
  fontSizes: [10, 13, 15, 19, 21, 30, 45],
  fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  fontFamily: ["'Lato', sans-serif", "'Poppins', sans-serif"],
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5,
  },
  letterSpacings: {
    normal: 'normal',
    tracked: '0.1em',
    tight: '-0.05em',
    mega: '0.25em',
  },
  borders: [
    0,
    '1px solid',
    '2px solid',
    '3px solid',
    '4px solid',
    '5px solid',
    '6px solid',
  ],
  radius: [3, 4, 5, 6, '50%'],
  widths: [36, 40, 44, 48, 54, 70, 81, 128, 256],
  heights: [36, 40, 44, 48, 50, 54, 70, 81, 128],
  maxWidths: [16, 32, 64, 128, 256, 512, 768, 1024, 1536],
  colors,
  colorStyles: {
    primary: {
      color: colors.primary,
      background: colors.primary,
      borderColor: colors.primary,
      '&:hover': {
        background: colors.primaryHover,
        borderColor: colors.primaryHover,
      },
    },
    secondary: {
      color: colors.secondary,
      background: colors.secondary,
      borderColor: colors.secondary,
      '&:hover': {
        background: colors.secondaryHover,
        borderColor: colors.secondaryHover,
      },
    },
  },
  buttonStyles: {
    textButton: {
      border: 0,
      background: colors.transparent,
      textDecoration: 'none',
      height: 'auto',
      padding: 0,

      '&:hover': {
        background: colors.transparent,
      },
    },
    outlined: {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: colors.borderColor,
      borderRadius: '4px',
      background: colors.transparent,
      transition: 'all 0.35s ease',

      '&:hover': {
        background: colors.transparent,
        borderColor: colors.primary,
      },
    },
    outlinedDash: {
      borderWidth: '1px',
      borderStyle: 'dashed',
      borderColor: colors.borderColor,
      borderRadius: '4px',
      background: colors.transparent,
      transition: 'all 0.35s ease',

      '&:hover': {
        background: colors.transparent,
        borderColor: colors.primary,
      },
    },
    outlinedFab: {
      borderWidth: '1px',
      borderStyle: 'solid',
      width: '50px',
      height: '50px',
      padding: 0,
      borderRadius: '50%',
      justifyContent: 'center',
      background: colors.transparent,
      'span.btn-icon': {
        paddingLeft: 0,
      },

      '&:hover': {
        background: colors.transparent,
      },
    },
    extendedOutlinedFab: {
      borderWidth: '1px',
      borderStyle: 'solid',
      minWidth: '50px',
      height: '50px',
      borderRadius: '50px',
      justifyContent: 'center',
      background: colors.transparent,
      'span.btn-icon': {
        paddingLeft: 0,
      },

      '&:hover': {
        background: colors.transparent,
      },
    },
    fab: {
      border: '0',
      width: '50px',
      height: '50px',
      padding: 0,
      borderRadius: '50%',
      justifyContent: 'center',
      'span.btn-icon': {
        paddingLeft: 0,
      },
    },
    extendedFab: {
      border: '0',
      minWidth: '50px',
      height: '50px',
      borderRadius: '50px',
      justifyContent: 'center',
    },
  },
  buttonSize: {
    small: {
      height: '38px',
      paddingLeft: '15px',
      paddingRight: '15px',
      fontSize: '14px',
      borderRadius: '6px',
    },
    medium: {
      height: '44px',
      paddingLeft: '20px',
      paddingRight: '20px',
      fontSize: '14px',
    },
  },
};

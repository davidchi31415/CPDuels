import { extendTheme, theme as defaultTheme } from '@chakra-ui/react';
// import breakpoints from './breakpoints';
import components from './components';
import foundations from './foundations';
import typography from './typography';

const theme = extendTheme(
  {
    components,
    ...typography,
    ...foundations,
  },
  {
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
      disableTransitionOnChange: false
    },
    direction: defaultTheme.direction,
    transition: defaultTheme.transition,
    // breakpoints,
    zIndices: defaultTheme.zIndices,
    components: {},
    styles: {
      global: props => ({
        'html, body': {
          color: props.colorMode === 'light' ? 'gray.900' : 'offWhite',
          bg: props.colorMode === 'light' ? 'offWhite' : 'gray.900',
          transition: "background-color 1s"
        }
      })
    },
    borders: {},
    colors: {},
    // radii: {},
    // shadows: {},
    sizes: {},
    space: {},
    fonts: {},
    fontSizes: {},
    fontWeights: {},
    letterSpacings: {},
    lineHeights: {},
  }
);

export default theme;
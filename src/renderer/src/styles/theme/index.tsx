import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em'
}

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        scrollbarWidth: '4px'
      }
    }
  },
  colors: {
    brand: {
      50: '#eaedfb',
      100: '#a3b0ec',
      200: '#8596e6',
      300: '#7589e3',
      400: '#667ce0',
      500: '#5c70ca',
      600: '#5263b3',
      700: '#47579d',
      800: '#333e70',
      900: '#29325a'
    },
    bulb: {
      50: '#90EE90',
      100: '#90EE90',
      200: '#90EE90',
      300: '#90EE90',
      400: '#90EE90',
      500: '#90EE90',
      600: '#90EE90',
      700: '#90EE90',
      800: '#90EE90',
      900: '#90EE90'
    }
  },
  breakpoints
})

export default theme

import { useColorMode } from '@chakra-ui/react'

export default function useThemeMode() {
  const { colorMode } = useColorMode()

  const mode10 = { light: '#ffffff', dark: 'gray.800' }
  const mode20 = { light: 'gray.50', dark: 'gray.700' }
  const mode30 = { light: 'gray.100', dark: 'gray.600' }
  const mode40 = { light: 'gray.200', dark: 'gray.600' }
  const mode50 = { light: 'gray.300', dark: 'gray.500' }
  const mode60 = { light: 'gray.500', dark: 'gray.400' }
  const mode70 = { light: 'gray.600', dark: 'gray.300' }
  const mode80 = { light: 'gray.700', dark: 'gray.200' }
  const mode90 = { light: 'gray.800', dark: 'gray.100' }
  const modeBrand = { light: 'brand.600', dark: 'brand.100' }
  const modeBrandAlt = { light: 'brand.50', dark: 'brand.600' }

  const value = {
    colorMode,
    mode10: mode10[colorMode], // Background
    mode20: mode20[colorMode], // Card
    mode30: mode30[colorMode], // Divider
    mode40: mode40[colorMode],
    mode50: mode50[colorMode],
    mode60: mode60[colorMode], // Font Color Alternate
    mode70: mode70[colorMode],
    mode80: mode80[colorMode], // Font Color
    mode90: mode90[colorMode],
    modeBrand: modeBrand[colorMode], // Brand Color
    modeBrandAlt: modeBrandAlt[colorMode] // Alt Brand Color
  }

  return value
}

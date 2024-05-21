import { Button } from '@chakra-ui/react'
import useThemeMode from '@renderer/hooks/useThemeMode'

export default function Action(props: any) {
  const { modeBrand } = useThemeMode()
  return (
    <Button
      px={2}
      h={5}
      size={'xs'}
      rounded={0}
      color={modeBrand}
      leftIcon={props.actionIcon}
      onClick={() => props.actionOnClick}
    >
      {props.actionTitle}
    </Button>
  )
}

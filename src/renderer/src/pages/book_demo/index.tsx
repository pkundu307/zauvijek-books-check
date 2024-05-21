import React from 'react'
import { RiCalendar2Line } from 'react-icons/ri'
import { Button, Flex } from '@chakra-ui/react'

import Loading from '@renderer/components/loading'
import ModalBox from '@renderer/components/modal_box'
import useThemeMode from '@renderer/hooks/useThemeMode'

export default function BookDemo() {
  const { modeBrand } = useThemeMode()
  const [isLoading, setLoading] = React.useState(true)
  const [isOpen, setOpen] = React.useState(false)

  function onClose() {
    setOpen(false)
  }

  function onLoad() {
    console.log('Loaded')
    setLoading(false)
  }

  return (
    <Flex>
      <Button
        px={4}
        size={'sm'}
        rounded={0}
        color={modeBrand}
        leftIcon={<RiCalendar2Line />}
        onClick={() => setOpen(true)}
      >
        Book Demo
      </Button>
      <ModalBox title="Book Demo" isOpen={isOpen} onClose={onClose}>
        {isLoading && <Loading title="Loading Booking Calender" />}
        <Flex justify="center" align="center" h="600px">
          <iframe
            width="100%"
            height="100%"
            src="https://calendly.com/zauvijek/zauvijek-books-demo"
            title="Book Demo"
            onLoad={onLoad}
          />
        </Flex>
      </ModalBox>
    </Flex>
  )
}

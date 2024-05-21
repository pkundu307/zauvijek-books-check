import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Flex,
  IconButton
} from '@chakra-ui/react'
import { RiNotification2Line } from 'react-icons/ri'

export default function Notification() {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label={'Dark'}
          size={'sm'}
          variant={'ghost'}
          icon={<RiNotification2Line size="18px" />}
        />
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />

        <PopoverHeader fontSize={'sm'}>Notifications</PopoverHeader>
        <PopoverBody>
          <Flex h={'300px'} overflowY={'scroll'}>
            <Flex w={'100%'} justify={'center'} align={'center'}>
              No notifications.
            </Flex>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

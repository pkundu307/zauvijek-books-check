import { useSelect } from 'downshift'
import { Flex, List, ListItem, Text } from '@chakra-ui/react'
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri'

import useThemeMode from '@renderer/hooks/useThemeMode'

export default function DownshiftSelectBusiness({ items, value, onChange, size }: any) {
  const { mode20, mode30, mode40 } = useThemeMode()

  const { isOpen, highlightedIndex, getToggleButtonProps, getMenuProps, getItemProps } = useSelect({
    items,
    selectedItem: value,
    itemToString,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      onChange(newSelectedItem?.id)
    }
  })
  return (
    <Flex w="100%">
      <Flex
        w="100%"
        py={1}
        h={size === 'xs' ? '24px' : '32px'}
        rounded={2}
        border="1px solid"
        borderColor={mode40}
        justify="space-between"
        align="center"
        cursor="pointer"
        {...getToggleButtonProps()}
      >
        <Text px={2} fontSize="sm">
          {value ? value : 'Select'}
        </Text>
        <Flex px={2} fontSize="sm">
          {isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </Flex>
      </Flex>

      <List
        position="absolute"
        w="100%"
        mt={8}
        bg={mode20}
        maxH="200px"
        overflowY="scroll"
        boxShadow="lg"
        zIndex={2}
        {...getMenuProps()}
      >
        {isOpen &&
          items?.map((item: any, idx: number) => (
            <ListItem
              key={`${item?.title}-${idx}`}
              p={2}
              cursor="pointer"
              bg={highlightedIndex === idx ? mode30 : undefined}
              {...getItemProps({ item, idx })}
            >
              <Text fontSize="sm">{item?.business_name}</Text>
            </ListItem>
          ))}
      </List>
    </Flex>
  )
}

function itemToString(item: any) {
  return item ? item.title : ''
}

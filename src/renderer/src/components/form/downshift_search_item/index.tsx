import * as React from 'react'
import { useCombobox } from 'downshift'
import { Input, InputGroup, List, ListItem } from '@chakra-ui/react'

import useThemeMode from '@renderer/hooks/useThemeMode'

export default function DownshiftSearchItem(props: any) {
  const { mode20, mode30 } = useThemeMode()
  const [itemList, setItemList] = React.useState<any>(props.items)

  const { isOpen, getInputProps, getMenuProps, getItemProps, highlightedIndex } = useCombobox({
    defaultInputValue: props?.value || '',
    items: itemList,
    onInputValueChange({ inputValue }: any) {
      setItemList(props.items.filter(getFilter(inputValue)).slice(0, 5))
      props.onChange(inputValue)
    },
    itemToString(item: any) {
      return item ? item.item_name : ''
    },
    onSelectedItemChange: ({ selectedItem: newSelectedItem }: any) => {
      props.onChange(newSelectedItem)
    }
  })

  return (
    <>
      <InputGroup size={'sm'}>
        <Input {...getInputProps()} placeholder={props.placeholder} size={props.size} />
      </InputGroup>

      <List
        {...getMenuProps()}
        my={1}
        pos="absolute"
        w="100%"
        zIndex={2}
        boxShadow="lg"
        maxH={'200px'}
        overflowY={'scroll'}
      >
        {isOpen &&
          itemList.map((item: any, index: number) => (
            <ListItem
              key={index}
              p={2}
              cursor="pointer"
              bg={index === highlightedIndex ? mode30 : mode20}
              {...getItemProps({ item, index })}
            >
              {item.item_name}
            </ListItem>
          ))}
      </List>
    </>
  )
}

const getFilter = (inputValue: any) => {
  return function itemsFilter(item: any) {
    return !inputValue || item.item_name.toLowerCase().includes(inputValue)
  }
}

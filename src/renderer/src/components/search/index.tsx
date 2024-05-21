import * as React from 'react'
import { FormControl, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { RiSearch2Line } from 'react-icons/ri'
import useThemeMode from '@renderer/hooks/useThemeMode'

type SearchPropsType = {
  value?: string
  placeholder?: string
  searchFilter: (value: string) => void
}

export function Search({ value, searchFilter, placeholder }: SearchPropsType) {
  const { mode20 } = useThemeMode()
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const result = e?.currentTarget?.value
    searchFilter(result)
  }

  return (
    <FormControl>
      <InputGroup size={'sm'}>
        <InputLeftAddon pointerEvents="none" children={<RiSearch2Line />} bg={mode20} />
        <Input placeholder={placeholder} value={value} onChange={handleSearch} />
      </InputGroup>
    </FormControl>
  )
}
